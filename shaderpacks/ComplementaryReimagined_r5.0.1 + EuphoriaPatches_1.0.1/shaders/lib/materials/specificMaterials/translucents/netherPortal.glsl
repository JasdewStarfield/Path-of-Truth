#if NETHER_PORTAL_VARIATION == 1
    lmCoordM = vec2(0.0);
    color = vec4(0.0);

    int sampleCount = 8;

    float multiplier = 0.4 / (-viewVector.z * sampleCount);
    vec2 interval = viewVector.xy * multiplier;
    vec2 coord = signMidCoordPos * 0.5 + 0.5;
    vec2 absMidCoordPos2 = absMidCoordPos * 2.0;
    vec2 midCoord = texCoord - absMidCoordPos * signMidCoordPos;
    vec2 minimumMidCoordPos = midCoord - absMidCoordPos;

    for (int i = 0; i < sampleCount; i++) {
        float portalStep = (i + dither) / sampleCount;
        coord += interval * portalStep;
        vec2 sampleCoord = fract(coord) * absMidCoordPos2 + minimumMidCoordPos;
        vec4 psample = texture2DLod(tex, sampleCoord, 0);

        float factor = 1.0 - portalStep;
        psample *= pow(factor, 0.1);

        emission = max(emission, psample.r);

        color += psample;
    }
    color /= sampleCount;

    color.rgb *= color.rgb * vec3(1.25, 1.0, 0.65);
    color.a = sqrt1(color.a) * 0.8;

    emission *= emission;
    emission *= emission;
    emission *= emission;    
    emission = clamp(emission * 120.0, 0.03, 1.2) * 8.0;

#else
    #ifdef GENERATED_NORMALS
        noGeneratedNormals = true;
    #endif
    vec3 wpos = normalize((gbufferModelViewInverse * vec4(viewPos * 1000.0, 1.0)).xyz);
    wpos.xz /= wpos.y;

	vec2 wind = vec2(0.0, frameTimeCounter * 0.03);

	float noise = texture2D(noisetex, wpos.xz * 0.20 + wind * 0.2).r * 0.01;
			noise+= texture2D(noisetex, wpos.xz * 0.15 + wind * 0.15).r * 0.02;
			noise+= texture2D(noisetex, wpos.xz * 0.10 + wind * 0.10).r * 0.06;
			noise+= texture2D(noisetex, wpos.xz * 0.05 + wind * 0.05).r * 0.12;

    color.rgb = vec3(0.4431, 0.102, 0.6118) * noise * 3.0;
	color.rgb *= color.rgb * 24.0;

    float fogFactor = smoothstep(0.0, 1.0, 0.03 / -wpos.y);
    fogFactor += smoothstep(0.0, 1.0, 0.03 / wpos.y);

    vec3 fogColor = vec3(0.3373, 0.0431, 0.1176) * 25.0;
    color.rgb = mix(color.rgb, fogColor, fogFactor);
    color.a = 0.7;
#endif