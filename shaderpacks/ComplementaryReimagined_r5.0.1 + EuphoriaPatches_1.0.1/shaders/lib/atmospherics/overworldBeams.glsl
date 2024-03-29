#include "/lib/colors/lightAndAmbientColors.glsl"

vec3 beamCol = normalize(ColorBeam) * 6.0 * (2.5 - 1.0 * vlFactor) * OVERWORLD_BEAMS_INTENSITY;

vec2 wind = vec2(syncedTime * 0.0056);

float BeamNoise(vec2 planeCoord, vec2 wind) {
    float noise = texture2D(noisetex, planeCoord * 0.275   - wind * 0.0625).b;
          noise+= texture2D(noisetex, planeCoord * 0.34375 + wind * 0.0575).b * 10.0;

    return noise;
}

vec3 DrawOverworldBeams(float VdotU, vec3 playerPos, vec3 viewPos) {
    float visibility = 1.0 - sunVisibility;
    #if OVERWORLD_BEAMS_CONDITION == 0
        visibility -= moonPhase;
    #endif
    if (visibility > 0.0){
    vec3 result = vec3(0.0);

    int sampleCount = 8;
    
    float VdotUM = 1.0 - VdotU * VdotU;
    float VdotUM2 = VdotUM + smoothstep1(pow2(pow2(1.0 - abs(VdotU)))) * 0.2;

    vec4 beams = vec4(0.0);
    float gradientMix = 1.0;

    #ifdef AURORA_INFLUENCE
        AuroraAmbientColor(beamCol, viewPos);
    #endif
    
    for(int i = 0; i < sampleCount; i++) {
        vec2 planeCoord = (playerPos.xz + cameraPosition.xz) * (1.0 + i * 6.0 / sampleCount) * 0.0014;

        float noise = BeamNoise(planeCoord, wind);
              noise = max(0.92 - 1.0 / abs(noise - (2.5 + VdotUM * 2.0)), 0.0) * 2.5;

        if (noise > 0.0) {
            noise *= 0.55;
            float fireNoise = texture2D(noisetex, abs(planeCoord * 0.2) - wind).b;
            noise *= 0.5 * fireNoise + 0.75;
            noise = noise * noise * 3.0 / sampleCount;
            noise *= VdotUM2;

            vec3 beamColor = beamCol;
            beamColor *= gradientMix / sampleCount;

            noise *= exp2(-6.0 * i / float(sampleCount));
            beams += vec4(noise * beamColor, noise);
        }
        gradientMix += 1.0;
    }

    beams.rgb *= beams.a * beams.a * beams.a * 1000.0;
    beams.rgb *= sqrt(beams.rgb);
    result = sqrt(beams.rgb);
    return result * visibility / sampleCount;
    }
        return vec3(0.0);
}
