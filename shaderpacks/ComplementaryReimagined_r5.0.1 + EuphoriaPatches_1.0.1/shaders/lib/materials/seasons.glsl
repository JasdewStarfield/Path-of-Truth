#ifndef GBUFFERS_HAND
	vec3 oldColor = color.rgb;	// Needed for entities

	#include "/lib/materials/seasonsTime.glsl"

	#if SEASONS != 2 && SEASONS != 5
		// Color Desaturation
		vec3 desaturatedColor = color.rgb;
		if (COLOR_DESATURATION > 0.0) {
			float desaturation = COLOR_DESATURATION;

			#if SEASONS == 1 || SEASONS == 4 || defined MOSS_NOISE || defined SAND_NOISE
				if (winterTime > 0) {
					// snow conditions
					#if SNOW_CONDITION != 2
						desaturation *= inSnowy; // make only appear in cold biomes
					#elif SNOW_CONDITION == 0
						desaturation *= rainFactor; // make only appear in rain
					#endif
				}
			#endif

			desaturatedColor = mix(color.rgb, color.rgb * (GetLuminance(color.rgb) / color.rgb * 0.99), clamp01(desaturation - lmCoord.x));
		}

		#ifndef GBUFFERS_ENTITIES
			// specific materials
			float specificMaterialIntensity = 0.0;
			if (mat == 10000 || mat == 10004 || mat == 10020 || mat == 10348 || mat == 10628 || mat == 10472) specificMaterialIntensity = mix(1.0, 0.0, (color.r + color.g + color.b) * 0.3); // vegetation check
			if (mat == 10005 && color.g * 1.5 > color.r + color.b) specificMaterialIntensity = mix(1.0, 0.0, 1 / (color.g * color.g) * 0.01); //wither rose
			if (mat == 10008) specificMaterialIntensity = mix(1.0, 0.0, 1 / (color.g * color.g) * 0.033); //leaves
			if (mat == 10016 || mat == 10752 || mat == 10017) specificMaterialIntensity = mix(1.0, 0.0, 1 / (color.g * color.g) * 0.09); // sugar cane, bamboo, propagule
			if (mat == 10012) specificMaterialIntensity = mix(1.0, 0.0, 1 / (color.g * color.g) * 0.04); // vine
			if ((mat == 10132 && glColor.b < 0.999) || (mat == 10129 && color.b + color.g < color.r * 2.0 && color.b > 0.3 && color.g < 0.45) || (mat == 10492 && color.r > 0.52 && color.b < 0.30 && color.g > 0.41 && color.g + color.b * 0.95 > color.r * 1.2)) {
				specificMaterialIntensity = mix(0.0, 1.0, pow(midUV.y, 3.0));
				#if defined SSS_SEASON_SNOW && (SEASONS == 1 || SEASONS == 4 || defined MOSS_NOISE || defined SAND_NOISE)
					#if SNOW_CONDITION == 0
						if (rainFactor > 0 && inSnowy > 0) subsurfaceMode = 1, noSmoothLighting = true, noDirectionalShading = true; // SSS
					#elif SNOW_CONDITION == 1
						if (inSnowy > 0) subsurfaceMode = 1, noSmoothLighting = true, noDirectionalShading = true;
					#else
						subsurfaceMode = 1, noSmoothLighting = true, noDirectionalShading = true;
					#endif
				#endif
			} // add to the side of grass, mycelium, path blocks; in that order. Use midUV to increase transparency the the further down the block it goes
			if (mat == 10132 && glColor.b < 0.999) specificMaterialIntensity += abs(color.g - color.g * 0.5); // mute the grass colors a bit
		#endif
	#endif

	#if SEASONS == 1 || SEASONS == 2
		vec3 summerColor = color.rgb;
	#endif

	#if SEASONS == 1 || SEASONS == 3
		vec3 autumnColor;

		if (autumnTime > 0) {
			autumnColor = mix(color.rgb, desaturatedColor, 0.5);

			#ifndef GBUFFERS_ENTITIES
				autumnColor = mix(autumnColor, autumnColor * vec3(1.0, 0.7, 0.5), specificMaterialIntensity);
			#endif
		}
	#endif

	#if SEASONS == 1 || SEASONS == 5
		vec3 springColor = color.rgb;
	#endif

	#if SEASONS == 1 || SEASONS == 4 || defined MOSS_NOISE || defined SAND_NOISE
		vec3 winterColor;

		if (winterTime > 0) {
			winterColor = desaturatedColor;

			#ifdef GBUFFERS_ENTITIES
				oldColor = mix(color.rgb, winterColor, winterTime);
			#else
				float winterAlpha = color.a;
				
				vec3 snowColor = vec3(0.9713, 0.9691, 0.9891);

				vec2 snowVec = getFloorNoise(true, false, MELTING_RADIUS, SNOW_SIZE, worldPos, specificMaterialIntensity, SNOW_TRANSPARENCY, SNOW_NOISE_REMOVE_INTENSITY);

				float snowNoise = snowVec.y;
				float snowVariable = snowVec.x;

				snowColor *= 1.1;
				snowColor += 0.13 * snowNoise * SNOW_NOISE_INTENSITY; // make the noise less noticeable & configurable with option

				// snow conditions
				#if SNOW_CONDITION != 2
					snowVariable *= inSnowy; // make only appear in cold biomes
				#endif
				#if SNOW_CONDITION == 0
					snowVariable *= rainFactor; // make only appear in rain
				#endif

				#if SNOW_CONDITION == 0
					highlightMult = mix(highlightMult, 2.3 - subsurfaceMode * 0.1, snowVariable * IPBRMult * winterTime * rainFactor * inSnowy * floorNoiseIntensity);
					smoothnessG = mix(smoothnessG, 0.45 + 0.1 * snowNoise, snowVariable * IPBRMult * winterTime * rainFactor * inSnowy * floorNoiseIntensity);
				#elif SNOW_CONDITION == 1
					highlightMult = mix(highlightMult, 2.3 - subsurfaceMode * 0.1, snowVariable * IPBRMult * winterTime * inSnowy * floorNoiseIntensity);
					smoothnessG = mix(smoothnessG, 0.45 + 0.1 * snowNoise, snowVariable * IPBRMult * winterTime * inSnowy * floorNoiseIntensity);
				#else
					highlightMult = mix(highlightMult, 2.3 - subsurfaceMode * 0.1, snowVariable * IPBRMult * winterTime * floorNoiseIntensity);
					smoothnessG = mix(smoothnessG, 0.45 + 0.1 * snowNoise, snowVariable * IPBRMult * winterTime * floorNoiseIntensity);
				#endif

				#ifdef SSS_SEASON_SNOW
					if (dot(normal, upVec) > 0.99) {
						#if SNOW_CONDITION == 0
							if (rainFactor > 0 && inSnowy > 0) subsurfaceMode = 1, noSmoothLighting = true, noDirectionalShading = true;
						#elif SNOW_CONDITION == 1
							if (inSnowy > 0) subsurfaceMode = 1, noSmoothLighting = true, noDirectionalShading = true;
						#else
							subsurfaceMode = 1, noSmoothLighting = true, noDirectionalShading = true;
						#endif
					}
				#endif

				#ifdef GBUFFERS_TERRAIN
					if (dot(normal, upVec) > 0.99) {
						#if SNOW_CONDITION == 0
							emission = mix(emission, emission * floorNoiseEmission, rainFactor * inSnowy * winterTime * floorNoiseIntensity); // make only appear in rain
							smoothnessD = mix(smoothnessD, 0.0, snowVariable * rainFactor * inSnowy * winterTime * floorNoiseIntensity);
						#elif SNOW_CONDITION == 1
							emission = mix(emission, emission * floorNoiseEmission, inSnowy * winterTime * floorNoiseIntensity); // make only appear in cold biomes
							smoothnessD = mix(smoothnessD, 0.0, snowVariable * inSnowy * winterTime * floorNoiseIntensity);
						#else
							emission = mix(emission, emission * floorNoiseEmission, winterTime * floorNoiseIntensity);
							smoothnessD = mix(smoothnessD, 0.0, snowVariable * winterTime * floorNoiseIntensity);
						#endif
					}
				#endif

				#ifdef GBUFFERS_WATER
					if (dot(normal, upVec) > 0.99) {
						#if SNOW_CONDITION == 0
							floorNoiseTransparentOverwrite = mix(floorNoiseTransparentOverwrite, floorNoiseAlpha, rainFactor * inSnowy * winterTime);
							fresnel = mix(fresnel, 0.01, snowVariable * floorNoiseFresnelMult * winterTime * rainFactor * inSnowy);
						#elif SNOW_CONDITION == 1
							floorNoiseTransparentOverwrite = mix(floorNoiseTransparentOverwrite, floorNoiseAlpha, inSnowy * winterTime);
							fresnel = mix(fresnel, 0.01, snowVariable * floorNoiseFresnelMult * winterTime * inSnowy);
						#else
							floorNoiseTransparentOverwrite = mix(1.0, floorNoiseAlpha, winterTime);
							fresnel = mix(fresnel, 0.01, snowVariable * floorNoiseFresnelMult * winterTime);
						#endif
					}
				#endif

				// final mix
				winterColor = mix(winterColor, snowColor, snowVariable * floorNoiseIntensity);
				winterAlpha = mix(color.a, 1.0, clamp(floorNoiseTransparentOverwrite * snowVariable, 0.0, 1.0));
				color.a = mix(color.a, winterAlpha, winterTime * floorNoiseIntensity);
			#endif
		}
	#endif

	#if SEASONS == 1
		vec3 summerToAutumn = mix(summerColor, autumnColor, summer);
		vec3 autumnToWinter = mix(summerToAutumn, winterColor, autumn);	
		vec3 winterToSpring = mix(autumnToWinter, springColor, winter);
		vec3 springToSummer = mix(winterToSpring, summerColor, spring);

		#ifndef GBUFFERS_ENTITIES	
			color.rgb = springToSummer;
		#endif

	#elif SEASONS == 2
		color.rgb = summerColor;

	#elif SEASONS == 3
		color.rgb = autumnColor;

	#elif SEASONS == 4
		color.rgb = winterColor;

	#elif SEASONS == 5
		color.rgb = springColor;
	#endif

	#ifdef GBUFFERS_ENTITIES
		color.rgb = oldColor;
	#endif
#endif