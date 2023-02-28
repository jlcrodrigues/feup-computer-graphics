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
		  7----6
		 /|   /|
		3----2 |
		| 4. | 5
		|/   |/
		0----1
		*/
		const size = 0.5;
		this.vertices = [
			-size, -size, size,	//0
			size, -size, size, //1
			size, size, size,	//2
			-size, size, size,	//3

			-size, -size, -size, //4
			size, -size, -size, //5
			size, size, -size,	//6
			-size, size, -size	//7
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			// front
			0, 1, 2,
			2, 3, 0,
			// back
			4, 5, 6,
			6, 7, 4,
			//top,
			2, 6, 7,
			7, 3, 2,
			//bot,
			1, 5, 4,
			4, 0, 1,
			//left
			0, 4, 7,
			7, 3, 0,
			//right
			1, 5, 6,
			6, 2, 1
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}

