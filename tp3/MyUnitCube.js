import {CGFobject} from '../lib/CGF.js';
/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	
	initBuffers() {
		/*
		  6----7
		 /|   /|
		3----2 |
		| 5__|_4
		|/   |/
		0----1
		*/
		const size = 0.5;
		this.vertices = [
			// front face
			-size, -size, size, //0
			size, -size, size, //1
			size, size, size, //2
			-size, size, size, //3

			// back face
			size, -size, -size, //4
			-size, -size, -size, //5
			-size, size, -size, //6
			size, size, -size, //7

			// right face
			size, -size, size, //8 / 1
			size, -size, -size, //9 / 4
			size, size, -size, //10 / 7
			size, size, size, //11 / 2

			// left face
			-size, -size, -size, //12 / 5
			-size, -size, size, //13 / 0
			-size, size, size, //14 / 3
			-size, size, -size, //15 / 6

			// top face
			-size, size, size, //16 / 3
			size, size, size, //17 / 2
			size, size, -size, //18 / 7
			-size, size, -size, //19 / 6

			// bottom face
			-size, -size, -size, //20 / 5
			size, -size, -size, //21 / 4
			size, -size, size, //22 / 1
			-size, -size, size //23 / 0
		];

		this.indices = [
			// front face
			0, 1, 2,
			2, 3, 0,

			// back face
			4, 5, 6,
			6, 7, 4,

			// right face
			8, 9, 10,
			10, 11, 8,

			// left face
			12, 13, 14,
			14, 15, 12,

			// top face
			16, 17, 18,
			18, 19, 16,

			// bottom face
			20, 21, 22,
			22, 23, 20
		];

		this.normals = [
			// front
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
			0, 0, 1,
	
			// back
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,
			0, 0, -1,

			// right
			1, 0, 0,
			1, 0, 0,
			1, 0, 0,
			1, 0, 0,
	
			// left
			-1, 0, 0,
			-1, 0, 0,
			-1, 0, 0,
			-1, 0, 0,

			// top
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,
			0, 1, 0,
	
			// bottom
			0, -1, 0,
			0, -1, 0,
			0, -1, 0,
			0, -1, 0
		];



		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

