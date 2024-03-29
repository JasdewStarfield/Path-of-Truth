if (mat < 31008) {
    if (mat < 30016) {
        if (mat < 30008) {
            if (mat == 30000) { // Stained Glass
                #include "/lib/materials/specificMaterials/translucents/stainedGlass.glsl"
                #if SEASONS == 1 || SEASONS == 4 || defined MOSS_NOISE || defined SAND_NOISE 
                    floorNoiseAlpha = 1.05;
                    #if defined MOSS_NOISE || defined SAND_NOISE
                        floorNoiseIntensity = 0.5;
                    #endif
                #endif
            } else if (mat == 30004) { // Stained Glass Pane
                #include "/lib/materials/specificMaterials/translucents/stainedGlass.glsl"
                noSmoothLighting = true;
                #if SEASONS == 1 || SEASONS == 4 || defined MOSS_NOISE || defined SAND_NOISE 
                    floorNoiseAlpha = 1.05;
                    #if defined MOSS_NOISE || defined SAND_NOISE
                        floorNoiseIntensity = 0.5;
                    #endif
                #endif
            }
        } else {
            if (mat == 30008) { // Tinted Glass
                color.a = pow(color.a, 1.0 - fresnel * 0.65);
                reflectMult = 0.75;
                #if SEASONS == 1 || SEASONS == 4 || defined MOSS_NOISE || defined SAND_NOISE 
                    floorNoiseAlpha = 0.95;
                    #if defined MOSS_NOISE || defined SAND_NOISE
                        floorNoiseIntensity = 0.5;
                    #endif
                #endif
            } else /*if (mat == 30012)*/ { // Slime Block
                translucentMultCalculated = true;
                reflectMult = 0.7;
                translucentMult.rgb = pow2(color.rgb) * 0.2;

                smoothnessG = color.g * 0.7;
                highlightMult = 2.5;
                #if SEASONS == 1 || SEASONS == 4 || defined MOSS_NOISE || defined SAND_NOISE 
                    floorNoiseAlpha = 0.6;
                    #if defined MOSS_NOISE || defined SAND_NOISE
                        floorNoiseIntensity = 0.5;
                    #endif
                #endif
            }
        }
    } else {
        if (mat < 31000) {
            if (mat == 30016) { // Honey Block
                translucentMultCalculated = true;
                reflectMult = 1.0;
                translucentMult.rgb = pow2(color.rgb) * 0.2;

                smoothnessG = color.r * 0.7;
                highlightMult = 2.5;
                #if SEASONS == 1 || SEASONS == 4 || defined MOSS_NOISE || defined SAND_NOISE 
                    floorNoiseAlpha = 0.4;
                    #if defined MOSS_NOISE || defined SAND_NOISE
                        floorNoiseIntensity = 0.5;
                    #endif
                #endif
            } else /*if (mat == 30020)*/ { // Nether Portal
                #if NETHER_PORTAL_VARIATION > 0
                    #include "/lib/materials/specificMaterials/translucents/netherPortal.glsl"
                #endif
                #if SEASONS == 1 || SEASONS == 4 || defined MOSS_NOISE || defined SAND_NOISE
                    floorNoiseIntensity = 0.0;
                #endif
            }
        } else {
            if (mat == 31000) { // Water
                #ifdef SHADER_WATER
                    #include "/lib/materials/specificMaterials/translucents/water.glsl"
                #endif
                #if SEASONS == 1 || SEASONS == 4 || defined MOSS_NOISE || defined SAND_NOISE 
                    floorNoiseIntensity = 0.0;
                    floorNoiseFresnelMult = 0.0;
                    IPBRMult = 0.0;
                    floorNoiseAlpha = 0.0;
                #endif
            } else /*if (mat == 31004)*/ { // Ice
                smoothnessG = pow2(color.g) * color.g;
                highlightMult = pow2(min1(pow2(color.g) * 1.5)) * 3.5;

                reflectMult = 0.7;
                #if SEASONS == 1 || SEASONS == 4 || defined MOSS_NOISE || defined SAND_NOISE 
                    floorNoiseAlpha = 0.6;
                    #if defined MOSS_NOISE || defined SAND_NOISE
                        floorNoiseIntensity = 0.5;
                    #endif
                #endif
            }
        }
    }
} else {
    if (mat < 31024) {
        if (mat < 31016) {
            if (mat == 31008) { // Glass
                #include "/lib/materials/specificMaterials/translucents/glass.glsl"
                #if SEASONS == 1 || SEASONS == 4 || defined MOSS_NOISE || defined SAND_NOISE 
                    floorNoiseAlpha = 0.8;
                    #if defined MOSS_NOISE || defined SAND_NOISE
                        floorNoiseIntensity = 0.5;
                    #endif
                #endif
            } else /*if (mat == 31012)*/ { // Glass Pane
                if (color.a < 0.001 && abs(NdotU) > 0.95) discard; // Fixing artifacts on connected glass panes
                #include "/lib/materials/specificMaterials/translucents/glass.glsl"
                noSmoothLighting = true;
                #if SEASONS == 1 || SEASONS == 4 || defined MOSS_NOISE || defined SAND_NOISE 
                    floorNoiseAlpha = 0.8;
                    #if defined MOSS_NOISE || defined SAND_NOISE
                        floorNoiseIntensity = 0.5;
                    #endif
                #endif
            }
        } else {
            if (mat == 31016) { // Beacon
                lmCoordM.x = 0.88;
                
                translucentMultCalculated = true;
                translucentMult = vec4(0.0, 0.0, 0.0, 1.0);
                
                if (color.b > 0.5) {
                    if (color.g - color.b < 0.01 && color.g < 0.99) {
                        #include "/lib/materials/specificMaterials/translucents/glass.glsl"
                    } else { // Beacon:Center
                        lmCoordM = vec2(0.0);
                        noDirectionalShading = true;

                        float lColor = length(color.rgb);
                        vec3 baseColor = vec3(0.1, 1.0, 0.92);
                        if (lColor > 1.5)       color.rgb = baseColor + 0.22;
                        else if (lColor > 1.3)  color.rgb = baseColor + 0.15;
                        else if (lColor > 1.15) color.rgb = baseColor + 0.09;
                        else                    color.rgb = baseColor + 0.05;
                        emission = 4.0;
                    }
                } else { // Beacon:Obsidian
                    float factor = color.r * 1.5;

                    smoothnessG = factor;
                    highlightMult = 2.0 + min1(smoothnessG * 2.0) * 1.5;
                    smoothnessG = min1(smoothnessG);
                }
                #if SEASONS == 1 || SEASONS == 4 || defined MOSS_NOISE || defined SAND_NOISE 
                    floorNoiseAlpha = 0.8;
                    #if defined MOSS_NOISE || defined SAND_NOISE
                        floorNoiseIntensity = 0.5;
                    #endif
                #endif
            
            } else /*if (mat == 31020)*/ { //
            
            }
        }
    } else {
        if (mat < 31032) {
            if (mat == 31024) { //
            
            } else /*if (mat == 31028)*/ { //
            
            }
        } else {
            if (mat == 31032) { //
            
            } else /*if (mat == 31036)*/ { //
            
            }
        }
    }
}