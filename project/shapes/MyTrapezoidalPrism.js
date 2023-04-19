import { CGFobject } from '../../lib/CGF.js';

/**
 * MyTrapezoidalPrism
 * @constructor
 * @param scene - Reference to MyScene object
 * @param topWidth - Width of the top face of the prism
 * @param bottomWidth - Width of the bottom face of the prism
 * @param height - Height of the prism
 * @param depth - this.Depth of the prism

 */
export class MyTrapezoidalPrism extends CGFobject {
    constructor(scene, topWidth, bottomWidth, height) {
        super(scene);
        this.topWidth = topWidth;
        this.bottomWidth = bottomWidth;
        this.height = height;
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
		const size = this.bottomWidth;
        const size2 = this.topWidth;
		this.vertices = [
			// front face
			-size, 0, size, //0
			size, 0, size, //1
			size2, this.height, size2, //2
			-size2, this.height, size2, //3

			// back face
			size, 0, -size, //4
			-size, 0, -size, //5
			-size2, this.height, -size2, //6
			size2, this.height, -size2, //7

			// right face
			size, 0, size, //8 / 1
			size, 0, -size, //9 / 4
			size2, this.height, -size2, //10 / 7
			size2, this.height, size2, //11 / 2

			// left face
			-size,0 , -size, //12 / 5
			-size,0 , size, //13 / 0
			-size2, this.height, size2, //14 / 3
			-size2, this.height, -size2, //15 / 6

			// top face
			-size2, this.height, size2, //16 / 3
			size2, this.height, size2, //17 / 2
			size2, this.height, -size2, //18 / 7
			-size2, this.height, -size2, //19 / 6

			// bottom face
			-size, 0, -size, //20 / 5
			size, 0, -size, //21 / 4
			size, 0, size, //22 / 1
			-size, 0, size //23 / 0
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
		
		this.texCoords = [
			// front
			0, 0,
			1, 0,
			1, 1,
			0, 1,

			// back
			1, 0,
			0, 0,
			0, 1,
			1, 1,

			// right
			0, 0,
			1, 0,
			1, 1,
			0, 1,

			// left
			1, 0,
			0, 0,
			0, 1,
			1, 1,

			// top
			0, 0,
			1, 0,
			1, 1,
			0, 1,

			// bottom
			0, 1,
			1, 1,
			1, 0,
			0, 0
		];


		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
    
}





