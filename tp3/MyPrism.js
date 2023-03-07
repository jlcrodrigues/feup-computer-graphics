import { CGFobject } from '../lib/CGF.js';

/**
 * MyPrism
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of slices (lados) of the prism
 * @param stacks - Number of stacks (andares) of the prism
 */
export class MyPrism extends CGFobject {
	constructor(scene, slices, stacks) {
		super(scene);
		this.slices = slices;
		this.stacks = stacks;
        this.height = 1 / stacks;

		this.initBuffers();
	}

	initBuffers() {

        // Create vertices and normals for the sides of the prism
		const size = 1;
		const angle = (2 * Math.PI) / this.slices;  // angle between two consecutive vertices

        this.vertices = [];
        this.vertices.push(0,0,0);

        for (let i = 0; i < this.slices; i++) {
            const x = size * Math.cos(i * angle);
            const y = size * Math.sin(i * angle);
            this.vertices.push(x, y, 0);
        }

        this.indices = [];
        for (let i = 0; i < this.slices; i++) {
            this.indices.push(0, (i+1)%this.slices+1, i+1);
        }

        this.normals = [];
        for (let i = 0; i <= this.slices; i++) {
            this.normals.push(0, 0, 1);
        }

        this.vertices.push(0,0,1);

        // now create the bottom part of prism with 1 unit in distance from the top
        for (let i = 0; i < this.slices; i++) {
            const x = size * Math.cos(i * angle);
            const y = size * Math.sin(i * angle);
            this.vertices.push(x, y, 1);
        }

        for (let i = 0; i < this.slices; i++) {
            this.indices.push(this.slices+1+i+1,this.slices+1+(i+1)%this.slices+1, this.slices+1);
        }

        for (let i = 0; i <= this.slices; i++) {
            this.normals.push(0, 0, 1);
        }

        console.log(this.vertices); //6*(slices+1)
        console.log(this.indices);  //6*slices


        // now create the sides of the prism
        for (let floor = 0; floor < this.stacks; floor++) {
            for (let i = 0; i < this.slices; i++) {
                const x1 = size * Math.cos(i * angle);
                const y1 = size * Math.sin(i * angle);
                const x2 = size * Math.cos((i + 1) * angle);
                const y2 = size * Math.sin((i + 1) * angle);

                this.vertices.push(x1, y1, floor*this.height);  
                this.vertices.push(x2, y2, floor*this.height);   
                this.vertices.push(x2, y2, (floor+1)*this.height);  
                this.vertices.push(x1, y1, (floor+1)*this.height);  
                
                const offset = this.vertices.length / 3 - 4;

                this.indices.push(offset, offset + 1, offset + 2);
                this.indices.push(offset, offset + 2, offset + 3);

                let nx = y2 - y1;
                let ny = x1 - x2;
                const nz = 0;

                const mod = Math.sqrt(nx * nx + ny * ny + nz * nz);

                nx /= mod;
                ny /= mod;

                this.normals.push(nx, ny, nz);
                this.normals.push(nx, ny, nz);
                this.normals.push(nx, ny, nz);
                this.normals.push(nx, ny, nz); 
              
            }
            
        }

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}
