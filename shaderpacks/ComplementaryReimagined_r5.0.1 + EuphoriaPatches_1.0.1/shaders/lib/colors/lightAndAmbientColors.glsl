#ifndef INCLUDE_LIGHT_AND_AMBIENT_COLORS
#define INCLUDE_LIGHT_AND_AMBIENT_COLORS

#if defined IS_IRIS && defined RAIN_ATMOSPHERE && defined OVERWORLD
    uniform float lightning;
#endif

#if defined OVERWORLD
    #ifndef COMPOSITE
	    vec3 noonClearLightColor = vec3(0.7, 0.55, 0.4) * 1.9; //ground and cloud color
    #else
        vec3 noonClearLightColor = vec3(0.4, 0.7, 1.4); //light shaft color
    #endif
    vec3 noonClearAmbientColor = pow(skyColor, vec3(0.65)) * 0.85;

    #ifndef COMPOSITE
	    vec3 sunsetClearLightColor = pow(vec3(0.64, 0.45, 0.3), vec3(1.5 + invNoonFactor)) * 5.0; //ground and cloud color
    #else
        vec3 sunsetClearLightColor = pow(vec3(0.62, 0.39, 0.24), vec3(1.5 + invNoonFactor)) * 6.8; //light shaft color
    #endif
    vec3 sunsetClearAmbientColor   = noonClearAmbientColor * vec3(1.21, 0.92, 0.76) * 0.95;

    #if !defined COMPOSITE && !defined DEFERRED1
        vec3 nightClearLightColor0 = vec3(0.15, 0.14, 0.20) * (0.4 + vsBrightness * 0.4); //ground color
    #elif defined DEFERRED1
        vec3 nightClearLightColor0 = vec3(0.11, 0.14, 0.20); //cloud color
    #else
        vec3 nightClearLightColor0 = vec3(0.07, 0.12, 0.27); //light shaft color
    #endif
    vec3 nightClearLightColor = nightClearLightColor0 * NIGHT_BRIGHTNESS;
    vec3 nightClearAmbientColor0   = vec3(0.09, 0.12, 0.17) * (1.55 + vsBrightness * 0.77);
    vec3 nightClearAmbientColor = nightClearAmbientColor0 * NIGHT_BRIGHTNESS;

    vec3 dayRainLightColor   = vec3(0.21, 0.16, 0.13) * 0.85;
    #if defined RAIN_ATMOSPHERE && defined IS_IRIS
        vec3 dayRainAmbientColor = vec3(0.2, 0.2, 0.25) * 2.3 * mix(1.0, 7.0 * float(skyColor), lightning);
    #else
        vec3 dayRainAmbientColor = vec3(0.2, 0.2, 0.25) * 2.3;
    #endif
    vec3 nightRainLightColor   = vec3(0.03, 0.035, 0.05) * (0.5 + 0.5 * vsBrightness);
    #if defined RAIN_ATMOSPHERE && defined IS_IRIS
        vec3 nightRainAmbientColor = vec3(0.16, 0.20, 0.3) * (0.75 + 0.6 * vsBrightness) * mix(1.0, 30.0 * float(skyColor), lightning);
    #else
        vec3 nightRainAmbientColor = vec3(0.16, 0.20, 0.3) * (0.75 + 0.6 * vsBrightness);
    #endif
    #ifndef COMPOSITE
        float noonFactorDM = noonFactor; //ground and cloud factor
    #else
        float noonFactorDM = noonFactor * noonFactor; //light shaft factor
    #endif
    vec3 dayLightColor   = mix(sunsetClearLightColor, noonClearLightColor, noonFactorDM);
    vec3 dayAmbientColor = mix(sunsetClearAmbientColor, noonClearAmbientColor, noonFactorDM);

    vec3 clearLightColor   = mix(nightClearLightColor, dayLightColor, sunVisibility2);
    vec3 clearAmbientColor = mix(nightClearAmbientColor, dayAmbientColor, sunVisibility2);

    vec3 rainLightColor   = mix(nightRainLightColor, dayRainLightColor, sunVisibility2) * 2.5;
    vec3 rainAmbientColor = mix(nightRainAmbientColor, dayRainAmbientColor, sunVisibility2);
    vec3 lightColor   = mix(clearLightColor, rainLightColor, rainFactor);
    #if SILHOUETTE == 0
        vec3 ambientColor = mix(clearAmbientColor, rainAmbientColor, rainFactor);
    #elif SILHOUETTE == 1
        vec3 ambientColor = mix(clearAmbientColor, rainAmbientColor, rainFactor) * mix(SILHOUETTE_BRIGHTNESS, 1.0, sunVisibility);
    #else
        vec3 ambientColor = mix(clearAmbientColor, rainAmbientColor, rainFactor) * SILHOUETTE_BRIGHTNESS;
    #endif
    vec3 ambientColClouds = mix(clearAmbientColor, rainAmbientColor, rainFactor); // needed so that silhouette doesn't affect the cloud ambient color.
    #ifdef OVERWORLD_BEAMS
        vec3 ambientColorBeam = mix(clearAmbientColor, rainAmbientColor, rainFactor);
        vec3 ColorBeam = mix(ambientColorBeam, vec3(OW_BEAM_R, OW_BEAM_G, OW_BEAM_B) / 255, BEAMS_AMBIENT_INFLUENCE);
    #else
        vec3 ColorBeam = vec3 (0.0);
    #endif
#elif defined NETHER
    vec3 lightColor   = vec3(0.0);
    vec3 ambientColor = (netherColor + 0.5 * lavaLightColor) * (0.9 + 0.45 * vsBrightness);
#elif defined END
    vec3 endLightColor = vec3(0.68, 0.51, 1.07);
    float endLightBalancer = 0.2 * vsBrightness;
    vec3 lightColor   = endLightColor * (0.35 - endLightBalancer);
    vec3 ambientCol   = endLightColor * (0.2 + endLightBalancer);
    vec3 ambientColor = mix(ambientCol, vec3(END_AMBIENT_R, END_AMBIENT_G, END_AMBIENT_B) / 255 * END_AMBIENT_I, END_AMBIENT_INFLUENCE);
    vec3 endColorBeam = mix(ambientCol, vec3(E_BEAM_R, E_BEAM_G, E_BEAM_B) / 255, E_BEAMS_AMBIENT_INFLUENCE);
#endif

#endif