#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying float blue;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform sampler2D uSampler3;

void main() {
	vec4 colorTerrain = texture2D(uSampler, vTextureCoord);

	float y = (1.0 - blue) * 1.25;
	if (y >= 0.99) y = 0.99;
	vec4 colorAltimetry = texture2D(uSampler3, vec2(0, y));
	vec4 color = 0.7*colorTerrain + 0.3*colorAltimetry;
	vec4 filter = texture2D(uSampler, vTextureCoord);
	
	gl_FragColor = color;
}