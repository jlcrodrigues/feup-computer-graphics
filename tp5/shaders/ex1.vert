attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

varying vec4 coords;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform float normScale;

uniform float timeFactor;

void main() {
    vec4 vertex = vec4(aVertexPosition.x +cos(timeFactor)*normScale*0.1, aVertexPosition.yz, 1.0);
	gl_Position = uPMatrix * uMVMatrix * vertex;
    coords = gl_Position;
}
