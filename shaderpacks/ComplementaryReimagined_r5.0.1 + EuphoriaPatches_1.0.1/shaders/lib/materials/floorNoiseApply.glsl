#ifdef MOSS_NOISE
	vec3 mossColor = mix(vec3(0.2745, 0.3412, 0.1412), vec3(0.451, 0.5804, 0.1255), float(hash33(floor(mod(worldPos, vec3(100.0)) * MOSS_SIZE + 0.03) * MOSS_SIZE)) * 0.15);
	#if MOSS_IN_CAVES < 2
		bool disableLight = true; 
	#else
		bool disableLight = false; 
	#endif

	vec2 mossVec = getFloorNoise(false, disableLight, 0.1, MOSS_SIZE, worldPos, 1.0, MOSS_TRANSPARENCY, MOSS_NOISE_REMOVE_INTENSITY * 1.5);

	float mossNoise = mossVec.y;
	float mossVariable = mossVec.x;

	#if MOSS_IN_CAVES == 0
		mossVariable *= inLushCave;
	#endif

	mossColor *= 1.1;
	mossColor += 0.13 * mossNoise * MOSS_NOISE_INTENSITY; // make the noise less noticeable & configurable with option

	#ifdef GBUFFERS_TERRAIN
		#if MOSS_IN_CAVES == 0
			emission *= mix(1.0, floorNoiseEmission, inLushCave * floorNoiseIntensity * mossNoiseIntensity);
			smoothnessG = mix(smoothnessG, 0.0, mossVariable * inLushCave * floorNoiseIntensity * mossNoiseIntensity);
			smoothnessD = mix(smoothnessD, smoothnessG, mossVariable * inLushCave * floorNoiseIntensity * mossNoiseIntensity);
		#else
			emission *= mix(1.0, floorNoiseEmission, floorNoiseIntensity * mossNoiseIntensity);
			smoothnessG = mix(smoothnessG, 0.0, mossVariable * floorNoiseIntensity * mossNoiseIntensity);
			smoothnessD = mix(smoothnessD, smoothnessG, mossVariable * floorNoiseIntensity * mossNoiseIntensity);
		#endif
	#endif
	
	#if MOSS_IN_CAVES == 0
		smoothnessG = mix(smoothnessG, max(smoothnessG, 0.3 * color.g * float(color.g > color.b * 1.5)), mossVariable * inLushCave * floorNoiseIntensity * mossNoiseIntensity);
	#else
		smoothnessG = mix(smoothnessG, max(smoothnessG, 0.3 * color.g * float(color.g > color.b * 1.5)), mossVariable * floorNoiseIntensity * mossNoiseIntensity);
	#endif

	#ifdef GBUFFERS_WATER
			#if MOSS_IN_CAVES == 0
				floorNoiseTransparentOverwrite = mix(floorNoiseTransparentOverwrite, floorNoiseAlpha, inLushCave);
				fresnel = mix(fresnel, 0.01, mossVariable * floorNoiseFresnelMult * inLushCave);
			#else
				floorNoiseTransparentOverwrite = floorNoiseAlpha;
				fresnel = mix(fresnel, 0.01, mossVariable * floorNoiseFresnelMult);
			#endif
	#endif

	color.rgb = mix(color.rgb, mossColor, mossVariable * floorNoiseIntensity * mossNoiseIntensity);
	color.a = mix(color.a, 1.0, clamp(floorNoiseTransparentOverwrite * mossVariable * mossNoiseIntensity, 0.0, 1.0));
#endif

#ifdef SAND_NOISE
	#if SAND_CONDITION == 0 
        float desertSandColorMixer = inDesert + inBeach + inBadlands + inErodedBadlands + inWoodedBadlands;
        vec3 sandColor = mix(
            vec3(0.9216, 0.8353, 0.6196),
            (
                inDesert * vec3(0.9216, 0.8353, 0.6196) + inBeach * vec3(0.9216, 0.8353, 0.6196) +
                inBadlands * vec3(0.5843, 0.3412, 0.1569) + inErodedBadlands * vec3(0.5843, 0.3412, 0.1569)+
                inWoodedBadlands * vec3(0.5843, 0.3412, 0.1569)
            ),
            desertSandColorMixer);
	#else
		vec3 sandColor = vec3(0.9216, 0.8353, 0.6196);
	#endif

	#if SAND_ONLY_TOP == 0
		bool sandTop = true;
		float wallIntensity = 0.0;
	#else
		bool sandTop = false;
		float wallIntensity = 1.0;
	#endif

	vec2 sandVec = getFloorNoise(sandTop, SAND_IN_CAVES, 0.1, SAND_SIZE, worldPos, wallIntensity, SAND_TRANSPARENCY, SAND_NOISE_REMOVE_INTENSITY * 2.0);

	float sandNoise = sandVec.y;
	float sandVariable = sandVec.x;

	#if SAND_CONDITION == 0
		sandVariable *= desertSandColorMixer;
	#elif SAND_CONDITION == 1
		sandVariable *= inDry;
	#endif

	sandColor *= 1.1;
	sandColor += 0.13 * sandNoise * SAND_NOISE_INTENSITY; // make the noise less noticeable & configurable with option

	#ifdef GBUFFERS_TERRAIN
		#if SAND_CONDITION == 0
			emission *= mix(1.0, floorNoiseEmission, desertSandColorMixer * floorNoiseIntensity * sandNoiseIntensity);
			smoothnessG = mix(smoothnessG, pow(color.g, 16.0) * 2.0, sandVariable * desertSandColorMixer * floorNoiseIntensity * sandNoiseIntensity);
			smoothnessG = mix(smoothnessG, min1(smoothnessG), sandVariable * desertSandColorMixer * floorNoiseIntensity * sandNoiseIntensity);
			smoothnessD = mix(smoothnessD, smoothnessG * 0.7, sandVariable * desertSandColorMixer * floorNoiseIntensity * sandNoiseIntensity);
			highlightMult = mix(highlightMult, 2.0, sandVariable * desertSandColorMixer * floorNoiseIntensity * sandNoiseIntensity);
		#elif SAND_CONDITION == 1
			emission *= mix(1.0, floorNoiseEmission, inDry * floorNoiseIntensity * sandNoiseIntensity);
			smoothnessG = mix(smoothnessG, pow(color.g, 16.0) * 2.0, sandVariable * inDry * floorNoiseIntensity * sandNoiseIntensity);
			smoothnessG = mix(smoothnessG, min1(smoothnessG), sandVariable * inDry * floorNoiseIntensity * sandNoiseIntensity);
			smoothnessD = mix(smoothnessD, smoothnessG * 0.7, sandVariable * inDry * floorNoiseIntensity * sandNoiseIntensity);
			highlightMult = mix(highlightMult, 2.0, sandVariable * inDry * floorNoiseIntensity * sandNoiseIntensity);
		#else
			emission *= floorNoiseEmission;
			smoothnessG = mix(smoothnessG, pow(color.g, 16.0) * 2.0, sandVariable * floorNoiseIntensity * sandNoiseIntensity);
			smoothnessG = mix(smoothnessG, min1(smoothnessG), sandVariable * floorNoiseIntensity * sandNoiseIntensity);
			smoothnessD = mix(smoothnessD, smoothnessG * 0.7, sandVariable * floorNoiseIntensity * sandNoiseIntensity);
			highlightMult = mix(highlightMult, 2.0, sandVariable * floorNoiseIntensity * sandNoiseIntensity);
		#endif
	#endif

	#ifdef GBUFFERS_WATER
		#if SAND_CONDITION == 0
			floorNoiseTransparentOverwrite = mix(0.0, floorNoiseAlpha, desertSandColorMixer);
			fresnel = mix(fresnel, 0.01, sandVariable * floorNoiseFresnelMult * desertSandColorMixer);
		#elif SAND_CONDITION == 1
			floorNoiseTransparentOverwrite = mix(0.0, floorNoiseAlpha, inDry);
			fresnel = mix(fresnel, 0.01, sandVariable * floorNoiseFresnelMult * inDry);
		#else
			floorNoiseTransparentOverwrite = floorNoiseAlpha;
			fresnel = mix(fresnel, 0.01, sandVariable * floorNoiseFresnelMult);
		#endif
	#endif

	color.rgb = mix(color.rgb, sandColor, sandVariable * floorNoiseIntensity * sandNoiseIntensity);
	color.a = mix(color.a, 1.0, clamp(floorNoiseTransparentOverwrite * sandVariable * floorNoiseIntensity * sandNoiseIntensity, 0.0, 1.0));
#endif