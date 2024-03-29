////////////////////////////////////////
// Complementary Reimagined by EminGT with Euphoria Patches by isuewo and SpacEagle17 //
////////////////////////////////////////

//Common//
#include "/lib/common.glsl"

//////////Fragment Shader//////////Fragment Shader//////////Fragment Shader//////////
#ifdef FRAGMENT_SHADER

flat in int mat;

in vec2 texCoord;
in vec2 lmCoord;

flat in vec3 upVec, sunVec, northVec, eastVec;
in vec3 normal;
in vec3 viewVector;

in vec4 glColor;

#if WATER_STYLE >= 2 || RAIN_PUDDLES >= 1 && WATER_STYLE == 1 && WATER_QUALITY >= 2 || defined GENERATED_NORMALS || defined CUSTOM_PBR
	flat in vec3 binormal, tangent;
#endif

#if WATER_STYLE >= 2 || NETHER_PORTAL_VARIATION > 0 || defined GENERATED_NORMALS || defined POM || SEASONS == 1 || SEASONS == 4 || defined MOSS_NOISE || defined SAND_NOISE 
	in vec2 signMidCoordPos;
	flat in vec2 absMidCoordPos;
#endif

#ifdef POM
	in vec4 vTexCoordAM;
#endif

in vec3 midUV;

#if SEASONS == 1 || SEASONS == 4 || defined MOSS_NOISE || defined SAND_NOISE 
	flat in ivec2 pixelTexSize;
#endif

//Uniforms//
uniform int isEyeInWater;
uniform int frameCounter;
uniform int blockEntityId;

uniform float near;
uniform float far;
uniform float nightVision;
uniform float blindness;
uniform float darknessFactor;

uniform vec3 skyColor;
uniform vec3 cameraPosition;

uniform mat4 gbufferProjectionInverse;
uniform mat4 gbufferModelViewInverse;
uniform mat4 shadowModelView;
uniform mat4 shadowProjection;
uniform float viewWidth;
uniform float viewHeight;
uniform float aspectRatio;

uniform sampler2D tex;
uniform sampler2D noisetex;

#if WATER_STYLE >= 2
	uniform sampler2D gaux4;
#endif

#ifdef VL_CLOUDS_ACTIVE
	uniform sampler2D gaux1;
#endif

#if WATER_QUALITY >= 2 || WATER_REFLECT_QUALITY >= 1
	uniform sampler2D depthtex1;
#endif

#if WATER_REFLECT_QUALITY >= 1 || NETHER_PORTAL_VARIATION > 0 
	uniform mat4 gbufferProjection;
#endif

#if WATER_REFLECT_QUALITY >= 1
	uniform sampler2D gaux2;
#endif

#if RAIN_PUDDLES >= 1
	#if RAIN_PUDDLES < 3
		uniform float inRainy;
	#else
		float inRainy = 1.0;
	#endif
#endif

#if defined GENERATED_NORMALS || defined COATED_TEXTURES || defined POM || WATER_STYLE >= 2
	uniform ivec2 atlasSize;
#endif

#ifdef CUSTOM_PBR
	uniform sampler2D normals;
	uniform sampler2D specular;
#endif

#if (defined AURORA_INFLUENCE || OVERWORLD_BEAMS_CONDITION == 0) && !(defined MOON_PHASE_INF_LIGHT || defined MOON_PHASE_INF_REFLECTION)
	uniform int moonPhase;
#endif

uniform float inSnowy;

#ifdef MULTICOLORED_BLOCKLIGHT
	uniform vec3 previousCameraPosition;

	uniform mat4 gbufferPreviousModelView;
	uniform mat4 gbufferPreviousProjection;

	uniform sampler2D colortex8;
	uniform sampler2D colortex9;
#endif

#ifdef MOSS_NOISE
	uniform float inLushCave;
#endif
#ifdef SAND_NOISE
	uniform float inDesert;
	uniform float inDry;
	uniform float inWoodedBadlands;
	uniform float inErodedBadlands;
	uniform float inBadlands;
	uniform float inBeach;
#endif

//Pipeline Constants//

//Common Variables//
float NdotU = dot(normal, upVec);
float NdotUmax0 = max(NdotU, 0.0);
float SdotU = dot(sunVec, upVec);
float sunFactor = SdotU < 0.0 ? clamp(SdotU + 0.375, 0.0, 0.75) / 0.75 : clamp(SdotU + 0.03125, 0.0, 0.0625) / 0.0625;
float sunVisibility = clamp(SdotU + 0.0625, 0.0, 0.125) / 0.125;
float sunVisibility2 = sunVisibility * sunVisibility;
float shadowTimeVar1 = abs(sunVisibility - 0.5) * 2.0;
float shadowTimeVar2 = shadowTimeVar1 * shadowTimeVar1;
float shadowTime = shadowTimeVar2 * shadowTimeVar2;

#ifdef OVERWORLD
	vec3 lightVec = sunVec * ((timeAngle < 0.5325 || timeAngle > 0.9675) ? 1.0 : -1.0);
#else
	vec3 lightVec = sunVec;
#endif

#if WATER_STYLE >= 2 || RAIN_PUDDLES >= 1 && WATER_STYLE == 1 && WATER_QUALITY >= 2 || defined GENERATED_NORMALS || defined CUSTOM_PBR
	mat3 tbnMatrix = mat3(
		tangent.x, binormal.x, normal.x,
		tangent.y, binormal.y, normal.y,
		tangent.z, binormal.z, normal.z
	);
#endif

//Common Functions//
float GetLinearDepth(float depth) {
	return (2.0 * near) / (far + near - depth * (far - near));
}

//Includes//
#include "/lib/util/dither.glsl"
#include "/lib/util/spaceConversion.glsl"
#include "/lib/lighting/mainLighting.glsl"
#include "/lib/atmospherics/fog/mainFog.glsl"

#ifdef OVERWORLD_BEAMS
	float vlFactor = 0.0;
#endif

#ifdef OVERWORLD
	#include "/lib/atmospherics/sky.glsl"
#endif

#if !defined ATMOSPHERIC_FOG && !defined BORDER_FOG
	#include "/lib/colors/skyColors.glsl"
#endif

#ifdef AURORA_INFLUENCE
	#ifdef RGB_AURORA
		#include "/lib/colors/rainbowColor.glsl"
	#endif
	#include "/lib/atmospherics/auroraBorealis.glsl"
#endif

#if WATER_REFLECT_QUALITY >= 2
	#include "/lib/materials/materialMethods/reflections.glsl"
#endif

#ifdef TAA
	#include "/lib/util/jitter.glsl"
#endif

#if defined GENERATED_NORMALS || defined COATED_TEXTURES || WATER_STYLE >= 2
	#include "/lib/util/miplevel.glsl"
#endif

#ifdef GENERATED_NORMALS
	#include "/lib/materials/materialMethods/generatedNormals.glsl"
#endif

#ifdef CUSTOM_PBR
	#include "/lib/materials/materialHandling/customMaterials.glsl"
#endif

#ifdef ATM_COLOR_MULTS
    #include "/lib/colors/colorMultipliers.glsl"
#endif

#ifdef COLOR_CODED_PROGRAMS
	#include "/lib/misc/colorCodedPrograms.glsl"
#endif

#ifdef MULTICOLORED_BLOCKLIGHT
	#include "/lib/lighting/coloredBlocklight.glsl"
#endif

#if SEASONS > 0 || defined MOSS_NOISE || defined SAND_NOISE
	#include "/lib/materials/floorNoise.glsl"
#endif

//Program//
void main() {
	vec4 colorP = texture2D(tex, texCoord);
	vec4 color = colorP * vec4(glColor.rgb, 1.0);

	vec2 screenCoord = gl_FragCoord.xy / vec2(viewWidth, viewHeight);
	vec3 screenPos = vec3(screenCoord, gl_FragCoord.z);
	#ifdef TAA
		vec3 viewPos = ScreenToView(vec3(TAAJitter(screenPos.xy, -0.5), screenPos.z));
	#else
		vec3 viewPos = ScreenToView(screenPos);
    #endif
	float lViewPos = length(viewPos);

	float dither = Bayer64(gl_FragCoord.xy);
	#ifdef TAA
		dither = fract(dither + 1.61803398875 * mod(float(frameCounter), 3600.0));
	#endif

    #ifdef LIGHT_COLOR_MULTS
        lightColorMult = GetLightColorMult();
    #endif
	#ifdef ATM_COLOR_MULTS
		atmColorMult = GetAtmColorMult();
	#endif

	#if SEASONS == 1 || SEASONS == 4 || defined MOSS_NOISE || defined SAND_NOISE 
		float floorNoiseIntensity = 1.0;
		float snowNoiseIntensity = 1.0;
		float sandNoiseIntensity = 1.0;
		float mossNoiseIntensity = 1.0;
		float floorNoiseTransparentOverwrite = 0.0;
		float floorNoiseAlpha = 1.0;
		float floorNoiseFresnelMult = 1.0;
		float IPBRMult = 1.0;
	#endif

	#ifdef VL_CLOUDS_ACTIVE
		float cloudLinearDepth = texelFetch(gaux1, texelCoord, 0).r;

		if (pow2(cloudLinearDepth + OSIEBCA * dither) * far < min(lViewPos, far)) discard;
	#endif

	#if WATER_QUALITY >= 3
		float materialMask = 0.0;
	#endif

	vec3 nViewPos = normalize(viewPos);
    vec3 playerPos = ViewToPlayer(viewPos);
	float VdotU = dot(nViewPos, upVec);
	float VdotS = dot(nViewPos, sunVec);
	float VdotN = dot(nViewPos, normal);
	vec3 worldPos = playerPos + cameraPosition;

	// Materials
	vec4 translucentMult = vec4(1.0);
	bool noSmoothLighting = false, noDirectionalShading = false, translucentMultCalculated = false;
	#ifdef GENERATED_NORMALS
		bool noGeneratedNormals = false;
	#endif
	int subsurfaceMode = 0;
	float smoothnessG = 0.0, highlightMult = 1.0, reflectMult = 0.0, emission = 0.0;
	vec2 lmCoordM = lmCoord;
	vec3 normalM = VdotN > 0.0 ? -normal : normal; // Inverted Iris Water Normal Workaround
	vec3 geoNormal = normalM;
	vec3 shadowMult = vec3(1.0);
	float fresnel = clamp(1.0 + dot(normalM, nViewPos), 0.0, 1.0);
	#ifdef IPBR
		#include "/lib/materials/materialHandling/translucentMaterials.glsl"

		#ifdef GENERATED_NORMALS
			if (!noGeneratedNormals) GenerateNormals(normalM, colorP.rgb * colorP.a * 1.5);
		#endif
	#else
		#ifdef CUSTOM_PBR
			float smoothnessD, materialMaskPh;
			GetCustomMaterials(color, normalM, lmCoordM, NdotU, shadowMult, smoothnessG, smoothnessD, highlightMult, emission, materialMaskPh, viewPos, lViewPos);
			reflectMult = smoothnessD;
		#endif
		
		if (mat == 31000) { // Water
			#ifdef SHADER_WATER
				#include "/lib/materials/specificMaterials/translucents/water.glsl"
				#if SEASONS == 1 || SEASONS == 4 || defined MOSS_NOISE || defined SAND_NOISE
					floorNoiseIntensity = 0.0;
					floorNoiseFresnelMult = 0.0;
					IPBRMult = 0.0;
					floorNoiseAlpha = 0.0;
				#endif
			#endif
		} else if (mat == 30020) { // Nether Portal
			#if NETHER_PORTAL_VARIATION > 0 
				#include "/lib/materials/specificMaterials/translucents/netherPortal.glsl"
			#endif
		} else if (mat == 31016) { // Beacon
			#if SEASONS == 1 || SEASONS == 4 || defined MOSS_NOISE || defined SAND_NOISE 
				floorNoiseAlpha = 0.8;
				#if defined MOSS_NOISE || defined SAND_NOISE
					floorNoiseIntensity = 0.5;
				#endif
			#endif
		}
		#if SEASONS == 1 || SEASONS == 4 || defined MOSS_NOISE || defined SAND_NOISE 
			if (mat == 30020) floorNoiseIntensity = 0.0; // Nether Portal
		#endif
	#endif

	#if defined NETHER && defined BIOME_COLORED_NETHER_PORTALS
		if (mat == 30020) {
			#if NETHER_PORTAL_VARIATION == 1
				color.rgb = normalize(netherColor) * 0.4;
			#else
				float luminance = GetLuminance(color.rgb);
				color.rgb = normalize(netherColor) * luminance;
			#endif
			#if NETHER_PORTAL_VARIATION == 0
				emission = sqrt(luminance) * 11;
				color.a *= luminance;
				lmCoordM = vec2(0.0);
			#endif
		} 
	#endif
	#if defined MOSS_NOISE || defined SAND_NOISE
		#include "/lib/materials/floorNoiseApply.glsl"
	#endif
	#if SEASONS > 0
		#include "/lib/materials/seasons.glsl"
	#endif

	#ifdef REFLECTIVE_WORLD
		smoothnessG = 1.0;
	#endif

	#if MONOTONE_WORLD > 0
		#if MONOTONE_WORLD == 1
			color.rgb = vec3(1.0);
		#elif MONOTONE_WORLD == 2
			color.rgb = vec3(0.0);
		#else
			color.rgb = vec3(0.5);
		#endif
	#endif

	// Blending
	if (!translucentMultCalculated)
		translucentMult = vec4(mix(vec3(0.666), color.rgb * (1.0 - pow2(pow2(color.a))), color.a), 1.0);

	translucentMult.rgb = mix(translucentMult.rgb, vec3(1.0), min1(pow2(pow2(lViewPos / far))));
	
	#ifdef MULTICOLORED_BLOCKLIGHT
		blocklightCol = ApplyMultiColoredBlocklight(blocklightCol, screenPos);
	#endif

	#ifdef AURORA_INFLUENCE
        AuroraAmbientColor(ambientColor, viewPos);
    #endif

	emission *= EMISSION_MULTIPLIER;

	// Lighting
	DoLighting(color, shadowMult, playerPos, viewPos, lViewPos, normalM, lmCoordM,
	           noSmoothLighting, noDirectionalShading, false, false,
			   subsurfaceMode, smoothnessG, highlightMult, emission);

	#ifdef MULTICOLORED_BLOCKLIGHT
		vec3 normalizedColor = normalize(color.rgb);

		vec3 opaquelightAlbedo = texture2D(colortex8, screenPos.xy).rgb;
		opaquelightAlbedo *= normalizedColor;

		if (mat >= 30000 && mat <= 30016 || mat == 31004)
			opaquelightAlbedo = mix(normalizedColor, opaquelightAlbedo, min1(GetLuminance(opaquelightAlbedo)));

		vec3 lightAlbedo = normalizedColor * min1(emission);

		lightAlbedo = mix(opaquelightAlbedo, lightAlbedo, color.a);
	#endif

	// Reflections
	#if WATER_REFLECT_QUALITY > 0
		#ifdef LIGHT_COLOR_MULTS
			highlightColor *= lightColorMult;
		#endif
        #ifdef MOON_PHASE_INF_REFLECTION
            highlightColor *= pow2(moonPhaseInfluence);
        #endif

		float fresnelM = (pow2(pow2(fresnel)) * 0.85 + 0.15) * reflectMult;
		
		float skyLightFactor = pow2(max(lmCoordM.y - 0.7, 0.0) * 3.33333);

		#if WATER_REFLECT_QUALITY >= 2
			#if defined REALTIME_SHADOWS && WATER_QUALITY >= 2
				skyLightFactor = max(skyLightFactor, min1(dot(shadowMult, shadowMult)));
			#endif
		
			vec4 reflection = GetReflection(normalM, viewPos.xyz, nViewPos, playerPos, lViewPos, -1.0,
			                                depthtex1, dither, skyLightFactor, fresnel,
											smoothnessG, geoNormal, color.rgb, shadowMult, highlightMult);

			color.rgb = mix(color.rgb, reflection.rgb, fresnelM);
		#elif WATER_REFLECT_QUALITY == 1
			#ifdef OVERWORLD
				vec4 reflection = vec4(0.0);

				vec3 normalMR = normalM;
				#ifdef GENERATED_NORMALS
					normalMR = mix(geoNormal, normalM, 0.05);
				#endif
				vec3 nViewPosR = reflect(nViewPos, normalMR);
				float RVdotU = dot(normalize(nViewPosR), upVec);
				float RVdotS = dot(normalize(nViewPosR), sunVec);

				vec4 clipPosR = gbufferProjection * vec4(nViewPosR + 0.013 * viewPos, 1.0);
				vec3 screenPosR = clipPosR.xyz / clipPosR.w * 0.5 + 0.5;

				vec2 rEdge = vec2(0.6, 0.53);
				vec2 screenPosRM = abs(screenPosR.xy - 0.5);

				if (screenPosRM.x < rEdge.x && screenPosRM.y < rEdge.y) {
					vec2 edgeFactor = pow2(pow2(pow2(screenPosRM / rEdge)));
					screenPosR.y += (dither - 0.5) * (0.03 * (edgeFactor.x + edgeFactor.y) + 0.004);

					screenPosR.z = texture2D(depthtex1, screenPosR.xy).x;
					vec3 viewPosR = ScreenToView(screenPosR);
					if (lViewPos <= 2.0 + length(viewPosR)) {
						reflection = texture2D(gaux2, screenPosR.xy);
						reflection.rgb = pow2(reflection.rgb + 1.0);
					}

					edgeFactor.x = pow2(edgeFactor.x);
					edgeFactor = 1.0 - edgeFactor;
					reflection.a *= edgeFactor.x * edgeFactor.y;
				}

				reflection.a *= reflection.a;
				reflection.a *= clamp01((dot(nViewPos, nViewPosR) - 0.45) * 10.0); // Fixes perpendicular ref

				if (reflection.a < 1.0) {
					vec3 skyReflection = GetLowQualitySky(RVdotU, RVdotS, dither, true, true);
					skyReflection = mix(color.rgb * 0.5, skyReflection, skyLightFactor);
					
					#ifdef ATM_COLOR_MULTS
						skyReflection *= atmColorMult;
					#endif

					reflection.rgb = mix(skyReflection, reflection.rgb, reflection.a);
				}

				color.rgb = mix(color.rgb, reflection.rgb, fresnelM);
			#endif
		#endif
	#endif
    ////

	#ifdef COLOR_CODED_PROGRAMS
		ColorCodeProgram(color);
	#endif

	float sky = 0.0;
	DoFog(color.rgb, sky, lViewPos, playerPos, VdotU, VdotS, dither);
	color.a *= 1.0 - sky;

	/* DRAWBUFFERS:03 */
	gl_FragData[0] = color;
	gl_FragData[1] = vec4(1.0 - translucentMult.rgb, translucentMult.a);

	#if WATER_QUALITY >= 3
		/* DRAWBUFFERS:031 */
		gl_FragData[2] = vec4(0.0, materialMask, 0.0, 1.0);

		#ifdef MULTICOLORED_BLOCKLIGHT
			/* DRAWBUFFERS:0318 */
			gl_FragData[3] = vec4(lightAlbedo, 1.0);
		#endif
	#elif defined MULTICOLORED_BLOCKLIGHT
		/* DRAWBUFFERS:038 */
		gl_FragData[2] = vec4(lightAlbedo, 1.0);
	#endif
}

#endif

//////////Vertex Shader//////////Vertex Shader//////////Vertex Shader//////////
#ifdef VERTEX_SHADER

flat out int mat;

out vec2 texCoord;
out vec2 lmCoord;

flat out vec3 upVec, sunVec, northVec, eastVec;
out vec3 normal;
out vec3 viewVector;

out vec4 glColor;

out vec3 midUV; //useful to hardcode something to a specific pixel coordinate of a block

#if WATER_STYLE >= 2 || RAIN_PUDDLES >= 1 && WATER_STYLE == 1 && WATER_QUALITY >= 2 || defined GENERATED_NORMALS || defined CUSTOM_PBR
	flat out vec3 binormal, tangent;
#endif

#if WATER_STYLE >= 2 || NETHER_PORTAL_VARIATION > 0 || defined GENERATED_NORMALS || defined POM || SEASONS == 1 || SEASONS == 4 || defined MOSS_NOISE || defined SAND_NOISE 
	out vec2 signMidCoordPos;
	flat out vec2 absMidCoordPos;
#endif

#ifdef POM
	out vec4 vTexCoordAM;
#endif

#if SEASONS == 1 || SEASONS == 4 || defined MOSS_NOISE || defined SAND_NOISE 
	flat out ivec2 pixelTexSize;
#endif

//Uniforms//
#ifdef TAA
	uniform float viewWidth, viewHeight;
#endif

#if defined WAVING_WATER_VERTEX || defined WAVE_EVERYTHING || defined MIRROR_DIMENSION || defined WORLD_CURVATURE
	uniform mat4 gbufferModelViewInverse;
#endif

#if defined WAVE_EVERYTHING || defined MIRROR_DIMENSION || defined WORLD_CURVATURE
	uniform sampler2D noisetex;
#endif

#if defined WAVE_EVERYTHING || defined WAVING_WATER_VERTEX || defined ATLAS_ROTATION
	uniform vec3 cameraPosition;
#endif

#if SEASONS == 1 || SEASONS == 4 || defined MOSS_NOISE || defined SAND_NOISE 
	uniform ivec2 atlasSize;
#endif

//Attributes//
attribute vec4 mc_Entity;
attribute vec3 at_midBlock;
attribute vec4 mc_midTexCoord;
attribute vec4 at_tangent;

//Common Variables//

//Common Functions//

//Includes//
#ifdef TAA
	#include "/lib/util/jitter.glsl"
#endif

#if defined MIRROR_DIMENSION || defined WORLD_CURVATURE
	#include "/lib/misc/distortWorld.glsl"
#endif

#if defined WAVE_EVERYTHING || defined WAVING_WATER_VERTEX
	#include "/lib/materials/materialMethods/wavingBlocks.glsl"
#endif

//Program//
void main() {
	texCoord = (gl_TextureMatrix[0] * gl_MultiTexCoord0).xy;
	#ifdef ATLAS_ROTATION
		texCoord += texCoord * float(hash33(mod(cameraPosition * 0.1, vec3(100.0))));
	#endif
	lmCoord  = GetLightMapCoordinates();
	midUV = 0.5 - at_midBlock / 64.0;

	glColor = gl_Color;

	mat = int(mc_Entity.x + 0.5);

	#if defined WAVING_WATER_VERTEX || defined MIRROR_DIMENSION || defined WORLD_CURVATURE || defined WAVE_EVERYTHING
		vec4 position = gbufferModelViewInverse * gl_ModelViewMatrix * gl_Vertex;

		#ifdef WAVING_WATER_VERTEX
			DoWave(position.xyz, mat);
		#endif

		#ifdef MIRROR_DIMENSION
			doMirrorDimension(position);
		#endif

		#ifdef WORLD_CURVATURE
			position.y += doWorldCurvature(position.xz);
		#endif

		#ifdef WAVE_EVERYTHING
			DoWaveEverything(position.xyz);
		#endif
		
		gl_Position = gl_ProjectionMatrix * gbufferModelView * position;
	#else
		gl_Position = ftransform();
	#endif

	#ifdef TAA
		gl_Position.xy = TAAJitter(gl_Position.xy, gl_Position.w);
	#endif

	normal = normalize(gl_NormalMatrix * gl_Normal);
	upVec = normalize(gbufferModelView[1].xyz);
	eastVec = normalize(gbufferModelView[0].xyz);
	northVec = normalize(gbufferModelView[2].xyz);
	sunVec = GetSunVector();

	#if WATER_STYLE >= 2 || RAIN_PUDDLES >= 1 && WATER_STYLE == 1 && WATER_QUALITY >= 2 || defined GENERATED_NORMALS || defined CUSTOM_PBR
		binormal = normalize(gl_NormalMatrix * cross(at_tangent.xyz, gl_Normal.xyz) * at_tangent.w);
		tangent  = normalize(gl_NormalMatrix * at_tangent.xyz);
	#else
		vec3 binormal = normalize(gl_NormalMatrix * cross(at_tangent.xyz, gl_Normal.xyz) * at_tangent.w);
		vec3 tangent  = normalize(gl_NormalMatrix * at_tangent.xyz);
	#endif

	mat3 tbnMatrix = mat3(
		tangent.x, binormal.x, normal.x,
		tangent.y, binormal.y, normal.y,
		tangent.z, binormal.z, normal.z
	);

	viewVector = tbnMatrix * (gl_ModelViewMatrix * gl_Vertex).xyz;

	#if WATER_STYLE >= 2 || NETHER_PORTAL_VARIATION > 0 || defined GENERATED_NORMALS || defined POM || SEASONS == 1 || SEASONS == 4 || defined MOSS_NOISE || defined SAND_NOISE 
		vec2 midCoord = (gl_TextureMatrix[0] * mc_midTexCoord).st;
		vec2 texMinMidCoord = texCoord - midCoord;
		signMidCoordPos = sign(texMinMidCoord);
		absMidCoordPos  = abs(texMinMidCoord);

		#ifdef POM
			vTexCoordAM.zw  = abs(texMinMidCoord) * 2;
			vTexCoordAM.xy  = min(texCoord, midCoord - texMinMidCoord);
		#endif
	#endif

	#if SEASONS == 1 || SEASONS == 4 || defined MOSS_NOISE || defined SAND_NOISE 
		ivec2 pixelTexSize = ivec2(absMidCoordPos * 2.0 * atlasSize);
	#endif

	gl_Position.z -= 0.0001;
}

#endif
