////////////////////////////////////////
// Complementary Reimagined by EminGT with Euphoria Patches by isuewo and SpacEagle17 //
////////////////////////////////////////

//Common//
#include "/lib/common.glsl"

//////////Fragment Shader//////////Fragment Shader//////////Fragment Shader//////////
#ifdef FRAGMENT_SHADER

noperspective in vec2 texCoord;

flat in vec3 upVec, sunVec;

#ifdef LIGHTSHAFTS_ACTIVE
	flat in float vlFactor;
#endif

//Uniforms//
uniform int isEyeInWater;

uniform float far, near;
uniform float viewWidth, viewHeight;

#if RETRO_LOOK == 2
	uniform float nightVision;
#endif

uniform vec3 cameraPosition;

uniform mat4 gbufferProjectionInverse;

uniform sampler2D colortex0;
uniform sampler2D depthtex0;
uniform sampler2D depthtex1;

#if defined LIGHTSHAFTS_ACTIVE || WATER_QUALITY >= 3 || defined NETHER_STORM || RAINBOWS > 0 || defined MULTICOLORED_BLOCKLIGHT

	uniform mat4 gbufferProjection;
	uniform mat4 gbufferModelViewInverse;
	uniform mat4 shadowModelView;
	uniform mat4 shadowProjection;
	
	uniform sampler2D noisetex;
#endif

#if defined LIGHTSHAFTS_ACTIVE || defined NETHER_STORM || RAINBOWS > 0
	uniform int frameCounter;

	uniform sampler2D colortex3;
#endif

#ifdef LIGHTSHAFTS_ACTIVE
	//uniform float viewWidth, viewHeight;
	uniform float frameTime;
	uniform float frameTimeSmooth;

	uniform ivec2 eyeBrightness;

	uniform vec3 skyColor;

	uniform sampler2D shadowtex0;
	uniform sampler2DShadow shadowtex1;
	uniform sampler2D shadowcolor1;
#endif

#if WATER_QUALITY >= 3
	uniform sampler2D colortex1;
#endif

#if defined LIGHTSHAFTS_ACTIVE && defined LENSFLARE || RAINBOWS > 0 && defined OVERWORLD
	uniform sampler2D colortex4;
#endif

#if RAINBOWS == 1
	uniform float wetness;
	uniform float inRainy;
#endif

#if OVERWORLD_BEAMS_CONDITION == 0 || defined AURORA_INFLUENCE
	uniform int moonPhase;
#endif

#ifdef MULTICOLORED_BLOCKLIGHT
	#if !defined LIGHTSHAFTS_ACTIVE && !defined NETHER_STORM && RAINBOWS == 0
		//uniform float viewWidth, viewHeight;
		uniform int frameCounter;
	#endif

	uniform vec3 previousCameraPosition;

	uniform mat4 gbufferPreviousModelView;
	uniform mat4 gbufferPreviousProjection;

	uniform sampler2D colortex8;
	uniform sampler2D colortex9;
#endif

#ifdef AURORA_INFLUENCE
	uniform float inSnowy;
#endif

//Pipeline Constants//
//const bool colortex0MipmapEnabled = true;

#ifdef MULTICOLORED_BLOCKLIGHT
	const bool colortex9Clear = false;
#endif

#if defined NETHER_NOISE || defined BEDROCK_NOISE || defined LIGHTSHAFTS_ACTIVE
	uniform float blindness;
	uniform float darknessFactor;
#endif

//Common Variables//
float SdotU = dot(sunVec, upVec);
float sunFactor = SdotU < 0.0 ? clamp(SdotU + 0.375, 0.0, 0.75) / 0.75 : clamp(SdotU + 0.03125, 0.0, 0.0625) / 0.0625;
float sunVisibility = clamp(SdotU + 0.0625, 0.0, 0.125) / 0.125;
float sunVisibility2 = sunVisibility * sunVisibility;

vec2 view = vec2(viewWidth, viewHeight);

#ifdef OVERWORLD
	vec3 lightVec = sunVec * ((timeAngle < 0.5325 || timeAngle > 0.9675) ? 1.0 : -1.0);
#else
	vec3 lightVec = sunVec;
#endif

#ifdef LIGHTSHAFTS_ACTIVE
	float shadowTimeVar1 = abs(sunVisibility - 0.5) * 2.0;
	float shadowTimeVar2 = shadowTimeVar1 * shadowTimeVar1;
	float shadowTime = shadowTimeVar2 * shadowTimeVar2;
	float vlTime = min(abs(SdotU) - 0.05, 0.15) / 0.15;
#endif

//Common Functions//
#ifdef MULTICOLORED_BLOCKLIGHT
	float GetLinearDepth(float depth) {
    	return (2.0 * near) / (far + near - depth * (far - near));
	}

	vec2 Reprojection(vec3 pos) {
		pos = pos * 2.0 - 1.0;

		vec4 viewPosPrev = gbufferProjectionInverse * vec4(pos, 1.0);
		viewPosPrev /= viewPosPrev.w;
		viewPosPrev = gbufferModelViewInverse * viewPosPrev;

		vec3 cameraOffset = cameraPosition - previousCameraPosition;
		cameraOffset *= float(pos.z > 0.56);

		vec4 previousPosition = viewPosPrev + vec4(cameraOffset, 0.0);
		previousPosition = gbufferPreviousModelView * previousPosition;
		previousPosition = gbufferPreviousProjection * previousPosition;
		return previousPosition.xy / previousPosition.w * 0.5 + 0.5;
	}

	vec2 OffsetDist(float x) {
		float n = fract(x * 16.2) * 2 * pi;
    	return vec2(cos(n), sin(n)) * x;
	}

	vec3 GetMultiColoredBlocklight(vec2 coord, float z, float dither) {
		vec2 prevCoord = Reprojection(vec3(coord, z));
		float lz = GetLinearDepth(z);

		float distScale = clamp((far - near) * lz + near, 4.0, 128.0);
		float fovScale = gbufferProjection[1][1] / 1.37;

		vec2 blurstr = vec2(1.0 / (viewWidth / viewHeight), 1.0) * fovScale / distScale;
		vec3 lightAlbedo = texture2D(colortex8, coord).rgb;
		vec3 previousColoredLight = vec3(0.0);

		float mask = clamp(2.0 - 2.0 * max(abs(prevCoord.x - 0.5), abs(prevCoord.y - 0.5)), 0.0, 1.0);

		vec2 offset = OffsetDist(dither) * blurstr;
	
		vec2 sampleZPos = coord + offset;
		float sampleZ0 = texture2D(depthtex0, sampleZPos).r;
		float sampleZ1 = texture2D(depthtex1, sampleZPos).r;
		float linearSampleZ = GetLinearDepth(sampleZ1 >= 1.0 ? sampleZ0 : sampleZ1);

		float sampleWeight = clamp(abs(lz - linearSampleZ) * far / 16.0, 0.0, 1.0);
		sampleWeight = 1.0 - sampleWeight * sampleWeight;

		previousColoredLight += texture2D(colortex9, prevCoord.xy + offset).rgb * sampleWeight;
		previousColoredLight *= previousColoredLight * mask;

		if (lightAlbedo.g + lightAlbedo.b < 0.05) lightAlbedo.r *= 0.45; // red color reduction to prevent redstone from overpowering everything

		return sqrt(mix(previousColoredLight, lightAlbedo * lightAlbedo / clamp(previousColoredLight.r + previousColoredLight.g + previousColoredLight.b, 0.01, 1.0), 0.01));
	}
#endif

//Includes//
#include "/lib/atmospherics/fog/waterFog.glsl"

#ifdef BLOOM_FOG_COMPOSITE
	#include "/lib/atmospherics/fog/bloomFog.glsl"
#endif

#ifdef AURORA_INFLUENCE
	#ifdef RGB_AURORA
		#include "/lib/colors/rainbowColor.glsl"
	#endif
	#include "/lib/atmospherics/auroraBorealis.glsl"
#endif

#ifdef LIGHTSHAFTS_ACTIVE
	#if defined END && defined END_BEAMS
		#include "/lib/atmospherics/enderBeams.glsl"
	#elif defined OVERWORLD && defined OVERWORLD_BEAMS
		#include "/lib/atmospherics/overworldBeams.glsl"
	#endif
	#include "/lib/atmospherics/volumetricLight.glsl"
#endif

#if WATER_QUALITY >= 3 || defined NETHER_STORM
	#include "/lib/util/spaceConversion.glsl"
#endif

#if WATER_QUALITY >= 3
	#include "/lib/materials/materialMethods/refraction.glsl"
#endif

#ifdef NETHER_STORM
	#include "/lib/atmospherics/netherStorm.glsl"
#endif

#ifdef ATM_COLOR_MULTS
	#include "/lib/colors/colorMultipliers.glsl"
#endif

#if RAINBOWS > 0 && defined OVERWORLD
	#include "/lib/atmospherics/rainbow.glsl"
#endif

//Program//
void main() {
	vec3 color = texelFetch(colortex0, texelCoord, 0).rgb;
	float z0 = texelFetch(depthtex0, texelCoord, 0).r;
	float z1 = texelFetch(depthtex1, texelCoord, 0).r;

	#if defined LIGHTSHAFTS_ACTIVE || WATER_QUALITY >= 3 || defined BLOOM_FOG_COMPOSITE || defined NETHER_STORM || RAINBOWS > 0 && defined OVERWORLD
		vec4 screenPos = vec4(texCoord, z0, 1.0);
		vec4 viewPos = gbufferProjectionInverse * (screenPos * 2.0 - 1.0);
		viewPos /= viewPos.w;
		float lViewPos = length(viewPos.xyz);
	#endif

	#if defined LIGHTSHAFTS_ACTIVE || defined NETHER_STORM || RAINBOWS > 0 && defined OVERWORLD || defined MULTICOLORED_BLOCKLIGHT
		float dither = texture2D(noisetex, texCoord * view / 128.0).b;
		#ifdef TAA
			dither = fract(dither + 1.61803398875 * mod(float(frameCounter), 3600.0));
		#endif
		#ifdef MULTICOLORED_BLOCKLIGHT
			float lightZ = z1 >= 1.0 ? z0 : z1;
			vec3 coloredLight = GetMultiColoredBlocklight(texCoord, lightZ, dither);
		#endif
	#endif

	#if WATER_QUALITY >= 3
		DoRefraction(color, z0, z1, viewPos.xyz, lViewPos);
	#endif

	vec4 volumetricEffect = vec4(0.0);

	#if defined LIGHTSHAFTS_ACTIVE || defined NETHER_STORM || RAINBOWS > 0 && defined OVERWORLD
		/* The "1.0 - translucentMult" trick is done because of the default color attachment
		value being vec3(0.0). This makes it vec3(1.0) to avoid issues especially on improved glass */
		vec3 translucentMult = 1.0 - texelFetch(colortex3, texelCoord, 0).rgb;

		vec4 screenPos1 = vec4(texCoord, z1, 1.0);
		vec4 viewPos1 = gbufferProjectionInverse * (screenPos1 * 2.0 - 1.0);
		viewPos1 /= viewPos1.w;
		float lViewPos1 = length(viewPos1.xyz);
	#endif

	#if defined LIGHTSHAFTS_ACTIVE || RAINBOWS > 0 && defined OVERWORLD
		vec3 nViewPos = normalize(viewPos.xyz);
		float VdotL = dot(nViewPos, lightVec);
	#endif

	#ifdef LIGHTSHAFTS_ACTIVE
		float vlFactorM = vlFactor;

		float VdotU = dot(nViewPos, upVec);

		volumetricEffect = GetVolumetricLight(color, vlFactorM, translucentMult, lViewPos1, nViewPos, VdotL, VdotU, texCoord, z0, z1, dither);
	#endif

	#ifdef NETHER_STORM
		vec3 playerPos = ViewToPlayer(viewPos.xyz);

		volumetricEffect = GetNetherStorm(color, translucentMult, playerPos, viewPos.xyz, lViewPos, lViewPos1, dither);
	#endif
		
	#ifdef ATM_COLOR_MULTS
		volumetricEffect.rgb *= GetAtmColorMult();
	#endif

	#ifdef NETHER_STORM
		if (isEyeInWater == 0) color = mix(color, volumetricEffect.rgb, volumetricEffect.a);
	#endif

	#if RAINBOWS > 0 && defined OVERWORLD
		if (isEyeInWater == 0) color += GetRainbow(translucentMult, z0, z1, lViewPos, lViewPos1, VdotL, dither);
	#endif
	
	if (isEyeInWater == 1) {
		if (z0 == 1.0) color.rgb = waterFogColor;

		vec3 underwaterMult = vec3(0.80, 0.87, 0.97);
		color.rgb *= underwaterMult * 0.85;
		volumetricEffect.rgb *= pow2(underwaterMult * 0.71);
	} else {
		if (isEyeInWater == 2) {
			if (z1 == 1.0) color.rgb = fogColor * 5.0;
			#if defined SOUL_SAND_VALLEY_OVERHAUL && defined NETHER
				color.rgb = soulColor(color.rgb, 2.0);
			#endif
			
			volumetricEffect.rgb *= 0.0;
		}
	}

	#if TONEMAP > 0
		// convert rgb to linear:
		const vec3 a = vec3(0.055f);
		color = mix(pow((color.rgb + a)/(vec3(1.0f) + a), vec3(2.4)), color.rgb / 12.92f, lessThan(color.rgb, vec3(0.04045f)));
	#else
		color = pow(color, vec3(2.2));
	#endif
	
	#ifdef LIGHTSHAFTS_ACTIVE
		#ifdef END
			volumetricEffect.rgb *= volumetricEffect.rgb;
		#endif
		
		color += volumetricEffect.rgb;
	#endif

	#ifdef BLOOM_FOG_COMPOSITE
		color *= GetBloomFog(lViewPos); // Reminder: Bloom Fog can move between composite1-2-3
	#endif

	#if RETRO_LOOK == 1
		color.rgb *= vec3(RETRO_LOOK_R, RETRO_LOOK_G, RETRO_LOOK_B) * 0.5 * RETRO_LOOK_I;
	#elif RETRO_LOOK == 2
		color.rgb *= mix(vec3(1.0), vec3(RETRO_LOOK_R, RETRO_LOOK_G, RETRO_LOOK_B) * 0.5, nightVision) * RETRO_LOOK_I;
	#endif

	/* DRAWBUFFERS:0 */
	gl_FragData[0] = vec4(color, 1.0);
	
	// a.k.a #if defined LIGHTSHAFTS_ACTIVE && (LIGHTSHAFT_BEHAVIOUR == 1 && SHADOW_QUALITY >= 1 || defined END)
	#if LIGHTSHAFT_QUALI_DEFINE > 0 && LIGHTSHAFT_BEHAVIOUR == 1 && SHADOW_QUALITY >= 1 && defined OVERWORLD && defined REALTIME_SHADOWS || defined END
		#ifdef LENSFLARE
			if (viewWidth + viewHeight - gl_FragCoord.x - gl_FragCoord.y > 1.5)
				vlFactorM = texelFetch(colortex4, texelCoord, 0).r;
		#endif

		/* DRAWBUFFERS:04 */
		gl_FragData[1] = vec4(vlFactorM, 0.0, 0.0, 1.0);

		#ifdef MULTICOLORED_BLOCKLIGHT
			/* DRAWBUFFERS:049 */
			gl_FragData[2] = vec4(coloredLight, 1.0);
		#endif
	#elif defined MULTICOLORED_BLOCKLIGHT
		/* DRAWBUFFERS:09 */
		gl_FragData[1] = vec4(coloredLight, 1.0);
	#endif
}

#endif

//////////Vertex Shader//////////Vertex Shader//////////Vertex Shader//////////
#ifdef VERTEX_SHADER

noperspective out vec2 texCoord;

flat out vec3 upVec, sunVec;

#ifdef LIGHTSHAFTS_ACTIVE
	flat out float vlFactor;
#endif

//Uniforms//
#if defined LIGHTSHAFTS_ACTIVE && (LIGHTSHAFT_BEHAVIOUR == 1 && SHADOW_QUALITY >= 1 || defined END)
	uniform float viewWidth, viewHeight;
	
	uniform sampler2D colortex4;
#endif

//Attributes//

//Common Variables//

//Common Functions//

//Includes//

//Program//
void main() {
	gl_Position = ftransform();

	texCoord = (gl_TextureMatrix[0] * gl_MultiTexCoord0).xy;

	upVec = normalize(gbufferModelView[1].xyz);
	sunVec = GetSunVector();

	#ifdef LIGHTSHAFTS_ACTIVE
		#if LIGHTSHAFT_BEHAVIOUR == 1 && SHADOW_QUALITY >= 1 || defined END
			vlFactor = texelFetch(colortex4, ivec2(viewWidth-1, viewHeight-1), 0).r;
		#else
			#if LIGHTSHAFT_BEHAVIOUR == 2
				vlFactor = 0.0;
			#elif LIGHTSHAFT_BEHAVIOUR == 3
				vlFactor = 1.0;
			#endif
		#endif
	#endif
}

#endif
