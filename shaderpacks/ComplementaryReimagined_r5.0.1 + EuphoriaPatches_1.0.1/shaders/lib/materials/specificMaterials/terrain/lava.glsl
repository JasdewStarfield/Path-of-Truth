// Tweak to prevent the animation of lava causing brightness pulsing
vec3 avgColor = vec3(0.0);
ivec2 itexCoordC = ivec2(midCoord * atlasSize + 0.0001);
for (int x = -8; x < 8; x += 2) {
    for (int y = -8; y < 8; y += 2) {
        avgColor += texelFetch(tex, itexCoordC + ivec2(x, y), 0).rgb;
    }
}
color.rgb /= max(GetLuminance(avgColor) * 0.0390625, 0.001);
vec3 worldPos = playerPos + cameraPosition;
vec2 lavaPos = (floor(worldPos.xz * 16.0) + worldPos.y * 32.0) * 0.000666;
vec2 wind = vec2(frameTimeCounter * 0.012, 0.0);

#ifdef NETHER
    float noiseSample = texture2D(noisetex, lavaPos + wind).g;
    noiseSample = noiseSample - 0.5;
    noiseSample *= 0.1;
    color.rgb = pow(color.rgb, vec3(1.0 + noiseSample));
#endif

noDirectionalShading = true;
lmCoordM = vec2(0.0);
emission = GetLuminance(color.rgb) * 6.5;

#if LAVA_VARIATION > 0
    float lavaNoiseIntensity = 0.98 * LAVA_NOISE_INTENSITY;
    if (mat == 10068 || mat == 10069){
        #ifdef LAVA_COLUMN_NOISE
            float columnNoise = 1.0;
        #else
            float columnNoise = 0.0;
        #endif
        #if LAVA_VARIATION == 1 // Adaptive Noise
            color.rgb += min(pow2(pow2(emission * 0.50)), 0.2) * LAVA_TEMPERATURE * 0.65 + 0.1;
            if (mat == 10068 || columnNoise == 1.0) {
                float noise = 1.0;
                #ifdef NETHER
                    if (worldPos.y > 30 && worldPos.y < 32) {
                        noise = texture2D(noisetex, lavaPos * 0.2 + wind * 0.1).r;
                        noise += texture2D(noisetex, lavaPos * 0.8 + wind * 0.04).r * 0.5;
                        noise *= texture2D(noisetex, lavaPos * 0.1 + wind * 0.02).r * 0.5;
                        emission *= mix(1.0, 1.6, lavaNoiseIntensity);
                        color.rgb *= mix(1.0, smoothstep(0.00, 0.50, noise), lavaNoiseIntensity);
                        color.r *= mix(1.0, 1.2, lavaNoiseIntensity);
                    }
                    else {
                        noise = texture2D(noisetex, lavaPos * 0.05 + wind * 0.01).r;
                        noise -= texture2D(noisetex, lavaPos * 1.5 + wind * 0.05).r * 0.3;
                        noise += texture2D(noisetex, lavaPos * 0.1).r * 0.7;
                        color.rgb *= mix(1.0, smoothstep(0.00, 0.70, noise), lavaNoiseIntensity);
                        color.r *= mix(1.0, 1.5, lavaNoiseIntensity);
                    }
                #else
                    noise = texture2D(noisetex, lavaPos * 0.2 + wind * 0.01).g;
                    noise -= texture2D(noisetex, lavaPos * 2.0 + wind * 0.05).g * 0.3;
                    noise += texture2D(noisetex, lavaPos * 0.1).g * 0.3;
                    color.rgb *= mix(1.0, smoothstep(0.00, 0.70, noise), lavaNoiseIntensity);
                    color.r *= mix(1.0, 1.25, lavaNoiseIntensity);
                    emission *= mix(1.0, 1.1, lavaNoiseIntensity);
                #endif
            }
        #elif LAVA_VARIATION == 2 // Blushing Hotness
            float noise = texture2D(noisetex, lavaPos * 0.05 + wind * 0.1).r;
            color.rgb -= mix(vec3(0.0), vec3(0.03) * noise * 8.0, lavaNoiseIntensity);
            color.rgb += min(pow2(pow2(emission * 0.50)), 0.2) * LAVA_TEMPERATURE * 0.65 - 0.05;

        #elif LAVA_VARIATION == 3 // Molten Cheese
            color.rgb += vec3(min(pow2(pow2(pow2(smoothstep1(emission * 0.5)))), 0.25)) * LAVA_TEMPERATURE * 0.65 + 0.1;
            if (mat == 10068 || columnNoise == 1.0) {
                float noise = texture2D(noisetex, lavaPos * 0.01 + wind * 0.01).g;
                noise -= texture2D(noisetex, lavaPos * 2.0 + wind * 0.05).g * 0.3;
                noise += texture2D(noisetex, lavaPos * 0.1).g * 0.3;
                color.rgb *= mix(1.0, smoothstep(0.00, 0.70, noise), lavaNoiseIntensity);
            }
        #elif LAVA_VARIATION == 4 // Dark Islands
            color.rgb += vec3(min(pow2(pow2(pow2(smoothstep1(emission * 0.5)))), 0.25)) * LAVA_TEMPERATURE * 0.65 + 0.1;
            if (mat == 10068 || columnNoise == 1.0) {
                float noise = texture2D(noisetex, lavaPos * 0.01 + wind * 0.01).r;
                noise -= texture2D(noisetex, lavaPos * 1.1 + wind * 0.05).r * 0.3;
                noise += texture2D(noisetex, lavaPos * 0.1).r * 0.7;
                color.rgb *= mix(1.0, smoothstep(0.00, 0.70, noise), lavaNoiseIntensity);
            }
        #endif
    }
#else
    maRecolor = vec3(clamp(pow2(pow2(pow2(smoothstep1(emission * 0.28)))), 0.12, 0.4) * 1.3) * vec3(1.0, vec2(0.7));
    if (LAVA_TEMPERATURE != 0.0) maRecolor += LAVA_TEMPERATURE * 0.5 - 0.2;
#endif

#if RAIN_PUDDLES >= 1
    noPuddles = 1.0;
#endif

emission *= LAVA_EMISSION;

#if defined SOUL_SAND_VALLEY_OVERHAUL && defined NETHER
    color.rgb = soulColor(color.rgb, 2.0);
#endif