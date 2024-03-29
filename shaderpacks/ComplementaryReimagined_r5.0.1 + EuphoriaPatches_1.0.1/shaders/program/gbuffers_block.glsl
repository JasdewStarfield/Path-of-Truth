//////////////////////////////////
// Complementary Base by EminGT //
//////////////////////////////////

//Common//
#include "/lib/common.glsl"

//////////Fragment Shader//////////Fragment Shader//////////Fragment Shader//////////
#ifdef FRAGMENT_SHADER

in vec2 texCoord;
in vec2 lmCoord;

flat in int mat;

flat in vec3 upVec, sunVec, northVec, eastVec;
in vec3 normal;

in vec4 glColor;

#if defined GENERATED_NORMALS || defined COATED_TEXTURES || defined POM || SEASONS == 1 || SEASONS == 4 || defined MOSS_NOISE || defined SAND_NOISE 
	in vec2 signMidCoordPos;
	flat in vec2 absMidCoordPos;
#endif

#if defined GENERATED_NORMALS || defined CUSTOM_PBR
	flat in vec3 binormal, tangent;
#endif

#ifdef POM
	in vec3 viewVector;

	in vec4 vTexCoordAM;
#endif

#if SEASONS > 0
	in vec3 midUV;
#endif

#if SEASONS == 1 || SEASONS == 4 || defined MOSS_NOISE || defined SAND_NOISE 
	flat in ivec2 pixelTexSize;
#endif

//Uniforms//
uniform int isEyeInWater;
uniform int blockEntityId;
uniform int frameCounter;

uniform float viewWidth;
uniform float viewHeight;
uniform float nightVision;

uniform vec3 skyColor;
uniform vec3 cameraPosition;

uniform mat4 gbufferProjectionInverse;
uniform mat4 gbufferModelViewInverse;
uniform mat4 shadowModelView;
uniform mat4 shadowProjection;

uniform sampler2D tex;
uniform sampler2D noisetex;

#if defined GENERATED_NORMALS || defined COATED_TEXTURES || defined POM
	uniform ivec2 atlasSize;
#endif

#ifdef CUSTOM_PBR
	uniform sampler2D normals;
	uniform sampler2D specular;
#endif

uniform float inSnowy;

#ifdef MULTICOLORED_BLOCKLIGHT
	uniform vec3 previousCameraPosition;

	uniform mat4 gbufferPreviousModelView;
	uniform mat4 gbufferPreviousProjection;

	uniform sampler2D colortex9;
#endif

#ifdef AURORA_INFLUENCE
	#if !(defined MOON_PHASE_INF_LIGHT || defined MOON_PHASE_INF_REFLECTION)
		uniform int moonPhase;
	#endif
	uniform float blindness;
	uniform float darknessFactor;
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

#if defined GENERATED_NORMALS || defined CUSTOM_PBR
	mat3 tbnMatrix = mat3(
		tangent.x, binormal.x, normal.x,
		tangent.y, binormal.y, normal.y,
		tangent.z, binormal.z, normal.z
	);
#endif

//Common Functions//

//Includes//
#include "/lib/util/spaceConversion.glsl"
#include "/lib/util/dither.glsl"
#include "/lib/lighting/mainLighting.glsl"

#ifdef TAA
	#include "/lib/util/jitter.glsl"
#endif

#if defined GENERATED_NORMALS || defined COATED_TEXTURES
	#include "/lib/util/miplevel.glsl"
#endif

#ifdef GENERATED_NORMALS
	#include "/lib/materials/materialMethods/generatedNormals.glsl"
#endif

#ifdef COATED_TEXTURES
	#include "/lib/materials/materialMethods/coatedTextures.glsl"
#endif

#ifdef CUSTOM_PBR
	#include "/lib/materials/materialHandling/customMaterials.glsl"
#endif

#ifdef COLOR_CODED_PROGRAMS
	#include "/lib/misc/colorCodedPrograms.glsl"
#endif

#ifdef MULTICOLORED_BLOCKLIGHT
	#include "/lib/lighting/coloredBlocklight.glsl"
#endif

#ifdef AURORA_INFLUENCE
	#ifdef RGB_AURORA
		#include "/lib/colors/rainbowColor.glsl"
	#endif
	#include "/lib/atmospherics/auroraBorealis.glsl"
#endif

#if SEASONS > 0 || defined MOSS_NOISE || defined SAND_NOISE
	#include "/lib/materials/floorNoise.glsl"
#endif

//Program//
void main() {
	vec4 color = texture2D(tex, texCoord);
	#ifdef GENERATED_NORMALS
		vec3 colorP = color.rgb;
	#endif
	color *= glColor;

	vec3 screenPos = vec3(gl_FragCoord.xy / vec2(viewWidth, viewHeight), gl_FragCoord.z);
	#ifdef TAA
		vec3 viewPos = ScreenToView(vec3(TAAJitter(screenPos.xy, -0.5), screenPos.z));
	#else
		vec3 viewPos = ScreenToView(screenPos);
    #endif
	float lViewPos = length(viewPos);
	vec3 playerPos = ViewToPlayer(viewPos);
	vec3 worldPos = playerPos + cameraPosition;

	#if SEASONS == 1 || SEASONS == 4 || defined MOSS_NOISE || defined SAND_NOISE 
		float floorNoiseIntensity = 1.0;
		float snowNoiseIntensity = 1.0;
		float sandNoiseIntensity = 1.0;
		float mossNoiseIntensity = 1.0;
		float floorNoiseTransparentOverwrite = 0.0;
		float IPBRMult = 1.0;
		int subsurfaceMode = 0;
	#endif

	bool noSmoothLighting = false, noDirectionalShading = false;
	
	float smoothnessD = 0.0, skyLightFactor = 0.0, materialMask = 0.0;
	float smoothnessG = 0.0, highlightMult = 1.0, emission = 0.0, noiseFactor = 1.0;
	vec2 lmCoordM = lmCoord;
	vec3 normalM = normal, shadowMult = vec3(1.0);
	#ifdef IPBR
		#include "/lib/materials/materialHandling/blockEntityMaterials.glsl"
	#else
		#ifdef CUSTOM_PBR
			GetCustomMaterials(color, normalM, lmCoordM, NdotU, shadowMult, smoothnessG, smoothnessD, highlightMult, emission, materialMask, viewPos, lViewPos);
		#endif

		if (blockEntityId == 60024) { // End Portal
			#if END_PORTAL_VARIATION != 2
				#include "/lib/materials/specificMaterials/others/endPortalEffect.glsl"
				#if SEASONS == 1 || SEASONS == 4 || defined MOSS_NOISE || defined SAND_NOISE
                    floorNoiseIntensity = 0.0;
                #endif
			#endif
		} else if (blockEntityId == 60028) { // End Gateway
			#if SEASONS == 1 || SEASONS == 4 || defined MOSS_NOISE || defined SAND_NOISE
				floorNoiseIntensity = 0.0;
			#endif
		} else if (blockEntityId == 60004) { // Signs
			noSmoothLighting = true;
			if (glColor.r + glColor.g + glColor.b <= 2.99 || lmCoord.x > 0.999) { // Sign Text
				#include "/lib/materials/specificMaterials/others/signText.glsl"
			}
		} else if (blockEntityId == 60020) { // Conduit
			#if SEASONS == 1 || SEASONS == 4 || defined MOSS_NOISE || defined SAND_NOISE
				floorNoiseIntensity = 0.3;
			#endif
		} else if (blockEntityId == 60012) {
			#if SEASONS == 1 || SEASONS == 4 || defined MOSS_NOISE || defined SAND_NOISE
				floorNoiseIntensity = 0.5;
			#endif
		} else {	
			noSmoothLighting = true;
		}
	#endif

	#if defined MOSS_NOISE || defined SAND_NOISE
		#include "/lib/materials/floorNoiseApply.glsl"
	#endif
	#if SEASONS > 0
		#include "/lib/materials/seasons.glsl"
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

	#ifdef GENERATED_NORMALS
		GenerateNormals(normalM, colorP);
	#endif

	#ifdef COATED_TEXTURES
		CoatTextures(color.rgb, noiseFactor, playerPos);
	#endif

	#ifdef MULTICOLORED_BLOCKLIGHT
		blocklightCol = ApplyMultiColoredBlocklight(blocklightCol, screenPos);
	#endif

	#ifdef AURORA_INFLUENCE
        AuroraAmbientColor(ambientColor, viewPos);
    #endif

	emission *= EMISSION_MULTIPLIER;

	DoLighting(color, shadowMult, playerPos, viewPos, lViewPos, normalM, lmCoordM,
	           noSmoothLighting, noDirectionalShading, false, false,
			   0, smoothnessG, highlightMult, emission);

	#ifdef MULTICOLORED_BLOCKLIGHT
		vec3 lightAlbedo = normalize(color.rgb) * min1(emission);

		if (blockEntityId == 60000) lightAlbedo = color.rgb;
		if (blockEntityId == 60004) lightAlbedo = vec3(0.0); // fix glowing sign text affecting blocklight color
	#endif

	#ifdef COLOR_CODED_PROGRAMS
		ColorCodeProgram(color);
	#endif

	/* DRAWBUFFERS:01 */
	gl_FragData[0] = color;
	gl_FragData[1] = vec4(smoothnessD, materialMask, skyLightFactor, 1.0);

	#if BLOCK_REFLECT_QUALITY >= 2 && RP_MODE >= 2
		/* DRAWBUFFERS:015 */
		gl_FragData[2] = vec4(mat3(gbufferModelViewInverse) * normalM, 1.0);

		#ifdef MULTICOLORED_BLOCKLIGHT
			/* DRAWBUFFERS:0158 */
			gl_FragData[3] = vec4(lightAlbedo, 1.0);
		#endif
	#elif defined MULTICOLORED_BLOCKLIGHT
		/* DRAWBUFFERS:018 */
		gl_FragData[2] = vec4(lightAlbedo, 1.0);
	#endif
}

#endif

//////////Vertex Shader//////////Vertex Shader//////////Vertex Shader//////////
#ifdef VERTEX_SHADER

out vec2 texCoord;
out vec2 lmCoord;

flat out int mat;

flat out vec3 upVec, sunVec, northVec, eastVec;
out vec3 normal;

out vec4 glColor;

#if SEASONS > 0	
	out vec3 midUV; //useful to hardcode something to a specific pixel coordinate of a block
#endif

#if SEASONS == 1 || SEASONS == 4 || defined MOSS_NOISE || defined SAND_NOISE 
	flat out ivec2 pixelTexSize;
#endif

#if defined GENERATED_NORMALS || defined COATED_TEXTURES || defined POM || SEASONS == 1 || SEASONS == 4 || defined MOSS_NOISE || defined SAND_NOISE 
	out vec2 signMidCoordPos;
	flat out vec2 absMidCoordPos;
#endif

#if defined GENERATED_NORMALS || defined CUSTOM_PBR
	flat out vec3 binormal, tangent;
#endif

#ifdef POM
	out vec3 viewVector;

	out vec4 vTexCoordAM;
#endif

//Uniforms//
#ifdef TAA
	uniform float viewWidth, viewHeight;
#endif

#if defined IPBR || defined GENERATED_NORMALS || defined COATED_TEXTURES || defined POM
	uniform int blockEntityId;
#endif

#if defined GENERATED_NORMALS || defined COATED_TEXTURES || defined POM || defined ATLAS_ROTATION || defined WAVE_EVERYTHING 
	uniform vec3 cameraPosition;

	uniform mat4 gbufferModelViewInverse;
#elif defined WORLD_CURVATURE || defined MIRROR_DIMENSION
	uniform mat4 gbufferModelViewInverse;
#endif

#if defined MIRROR_DIMENSION || defined WORLD_CURVATURE
	uniform sampler2D noisetex;
#endif

#if SEASONS == 1 || SEASONS == 4 || defined MOSS_NOISE || defined SAND_NOISE 
	uniform ivec2 atlasSize;
#endif

//Attributes//
#if defined GENERATED_NORMALS || defined COATED_TEXTURES || defined POM || SEASONS == 1 || SEASONS == 4 || defined MOSS_NOISE || defined SAND_NOISE || defined WAVE_EVERYTHING
	attribute vec4 mc_midTexCoord;
#endif

#if defined GENERATED_NORMALS || defined CUSTOM_PBR
	attribute vec4 at_tangent;
#endif

attribute vec3 at_midBlock;
attribute vec4 mc_Entity;

//Common Variables//

//Common Functions//

//Includes//
#ifdef TAA
	#include "/lib/util/jitter.glsl"
#endif

#if defined MIRROR_DIMENSION || defined WORLD_CURVATURE
	#include "/lib/misc/distortWorld.glsl"
#endif

#ifdef WAVE_EVERYTHING
	#include "/lib/materials/materialMethods/wavingBlocks.glsl"
#endif

//Program//
void main() {
	gl_Position = ftransform();
	#ifdef TAA
		gl_Position.xy = TAAJitter(gl_Position.xy, gl_Position.w);
	#endif

	texCoord = (gl_TextureMatrix[0] * gl_MultiTexCoord0).xy;
	#ifdef ATLAS_ROTATION
		texCoord += texCoord * float(hash33(mod(cameraPosition * 0.1, vec3(100.0))));
	#endif

	lmCoord  = GetLightMapCoordinates();

	glColor = gl_Color;

	#if SEASONS > 0
		midUV = 0.5 - at_midBlock / 64.0;
	#endif

	mat = int(mc_Entity.x + 0.5);

	normal = normalize(gl_NormalMatrix * gl_Normal);

	upVec = normalize(gbufferModelView[1].xyz);
	eastVec = normalize(gbufferModelView[0].xyz);
	northVec = normalize(gbufferModelView[2].xyz);
	sunVec = GetSunVector();

	if (normal != normal) normal = -upVec; // Mod Fix: Fixes Better Nether Fireflies

	#ifdef IPBR
		if (blockEntityId == 60024) { // End Portal, End Gateway
			gl_Position.z -= 0.002;
		}
	#endif

	#if defined GENERATED_NORMALS || defined COATED_TEXTURES || defined POM
		if (blockEntityId == 60008) { // Chest
			float fractWorldPosY = fract((gbufferModelViewInverse * gl_ModelViewMatrix * gl_Vertex).y + cameraPosition.y);
			if (fractWorldPosY > 0.56 && 0.57 > fractWorldPosY) gl_Position.z -= 0.0001;
		}
		
		vec2 midCoord = (gl_TextureMatrix[0] * mc_midTexCoord).st;
		vec2 texMinMidCoord = texCoord - midCoord;
		signMidCoordPos = sign(texMinMidCoord);
		absMidCoordPos  = abs(texMinMidCoord);
	#endif

	#if SEASONS == 1 || SEASONS == 4 || defined MOSS_NOISE || defined SAND_NOISE 
		ivec2 pixelTexSize = ivec2(absMidCoordPos * 2.0 * atlasSize);
	#endif

	#if defined GENERATED_NORMALS || defined CUSTOM_PBR
		binormal = normalize(gl_NormalMatrix * cross(at_tangent.xyz, gl_Normal.xyz) * at_tangent.w);
		tangent  = normalize(gl_NormalMatrix * at_tangent.xyz);
	#endif

	#ifdef POM
		mat3 tbnMatrix = mat3(
			tangent.x, binormal.x, normal.x,
			tangent.y, binormal.y, normal.y,
			tangent.z, binormal.z, normal.z
		);

		viewVector = tbnMatrix * (gl_ModelViewMatrix * gl_Vertex).xyz;

		vTexCoordAM.zw  = abs(texMinMidCoord) * 2;
		vTexCoordAM.xy  = min(texCoord, midCoord - texMinMidCoord);
	#endif

	#if defined MIRROR_DIMENSION || defined WORLD_CURVATURE || defined WAVE_EVERYTHING
		vec4 position = gbufferModelViewInverse * gl_ModelViewMatrix * gl_Vertex;
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
	#endif
}

#endif
