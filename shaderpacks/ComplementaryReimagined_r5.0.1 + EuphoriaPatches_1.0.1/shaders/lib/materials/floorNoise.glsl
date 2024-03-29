float floorNoise3D(vec3 p) { //from Emin's unbound clouds
    p.z = fract(p.z) * 128.0;
    float iz = floor(p.z);
    float fz = fract(p.z);
    vec2 a_off = vec2(23.0, 29.0) * (iz) / 128.0;
    vec2 b_off = vec2(23.0, 29.0) * (iz + 1.0) / 128.0;
    float a = texture2D(noisetex, p.xy + a_off).r;
    float b = texture2D(noisetex, p.xy + b_off).r;
    return mix(a, b, fz);
}

vec2 getFloorNoise(bool upCheck, bool lightCheck, float meltingRadius, int pixelSize, vec3 worldPos, float sidesOrFoliage, float noiseTransparency, float removeIntensity) {
    float floorNoiseVariable;
    floorNoiseVariable = sidesOrFoliage;

    if (upCheck){
        float topCheck = abs(clamp01(dot(normal, upVec)));	// normal check for top surfaces
        if (topCheck > 0.99) floorNoiseVariable = 0.0;
        floorNoiseVariable += topCheck;
    }

    //noise
    #if SNOW_SIZE > 0 || MOSS_SIZE > 0 || SAND_SIZE > 0
        int noiseSize = pixelSize;
    #else
        int noiseSize = pixelTexSize.x + 1;
    #endif
    float noise = float(hash33(floor(mod(worldPos, vec3(100.0)) * noiseSize + 0.03) * noiseSize)) * 0.25; // pixel-locked procedural noise

    //make patches of terrain that don't have noise
    float removeNoise1 = 1.0 - floorNoise3D(worldPos * 0.0005) * removeIntensity * 1.2;
    float removeNoise2 = 1.0 - floorNoise3D(worldPos * 0.005) * removeIntensity;
    float removeNoise3 = floorNoise3D(worldPos * 0.02) * removeIntensity;
    floorNoiseVariable *= clamp01(2.0 * removeNoise1 + 0.70 * removeNoise2 + 0.2 * removeNoise3);

    // light check so noise is not in caves (near light sources)
    floorNoiseVariable = clamp01(floorNoiseVariable); // to prevent stuff breaking, like the fucking bamboo sapling!!!!
    if (!lightCheck){
        floorNoiseVariable *= (1.0 - pow(lmCoord.x, 1.0 / meltingRadius * 2.5) * 4.3) * pow(lmCoord.y, 14.0); // first part to turn off at light sources, second part to turn off if under blocks
    }
    floorNoiseVariable = clamp(floorNoiseVariable, 0.0, noiseTransparency * 0.1 + 0.8); // to prevent artifacts near light sources

    vec2 result = vec2(floorNoiseVariable, noise);
    return result;
}