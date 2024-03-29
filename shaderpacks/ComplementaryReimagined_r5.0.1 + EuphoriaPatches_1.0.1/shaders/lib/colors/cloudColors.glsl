#if defined RAIN_ATMOSPHERE && defined IS_IRIS
    vec3 cloudRainColor = mix(nightMiddleSkyColor, dayMiddleSkyColor, sunFactor) * mix(1.0, mix(14.0, 7.0, sunVisibility) * float(skyColor), lightning);
#else
    vec3 cloudRainColor = mix(nightMiddleSkyColor, dayMiddleSkyColor, sunFactor);
#endif
vec3 cloudAmbientColor = mix(ambientColor * (sunVisibility2 * (0.55 + 0.1 * noonFactor) + 0.35), cloudRainColor * 0.5, rainFactor);
vec3 cloudLightColor   = mix(lightColor * (0.9 + 0.2 * noonFactor), cloudRainColor * 0.25, noonFactor * rainFactor);