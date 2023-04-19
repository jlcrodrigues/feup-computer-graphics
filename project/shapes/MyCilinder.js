import { CGFobject } from '../../lib/CGF.js';

/**
 * MyCilinder
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of slices (lados) of the prism
 * @param stacks - Number of stacks (andares) of the prism
 */
export class MyCilinder extends CGFobject {
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
        this.indices = [];
        this.texCoords = [];

        this.vertices.push(0,0,0);
        this.texCoords.push(0.5, 0.5);

        for (let i = 0; i < this.slices; i++) {
            const x = size * Math.cos(i * angle);
            const y = size * Math.sin(i * angle);
            this.vertices.push(x, y, 0);
            this.texCoords.push(0.5 + 0.5 * x, 0.5 - 0.5 * y);
        }

        
        for (let i = 0; i < this.slices; i++) {
            this.indices.push(0, (i+1)%this.slices+1, i+1);
        }

        this.normals = [];
        for (let i = 0; i <= this.slices; i++) {
            this.normals.push(0, 0, -1);
        }

        this.vertices.push(0,0,1);
        this.texCoords.push(0.5, 0.5);

        // now create the bottom part of prism with 1 unit in distance from the top
        for (let i = 0; i < this.slices; i++) {
            const x = size * Math.cos(i * angle);
            const y = size * Math.sin(i * angle);
            this.vertices.push(x, y, 1);
            this.texCoords.push(0.5 + 0.5 * x, 0.5 - 0.5 * y);
        }

        for (let i = 0; i < this.slices; i++) {
            this.indices.push(this.slices+1+i+1,this.slices+1+(i+1)%this.slices+1, this.slices+1);
        }

        for (let i = 0; i <= this.slices; i++) {
            this.normals.push(0, 0, 1);
        }


        const offset_start = this.vertices.length / 3;
        let offset_next = this.stacks + 1

        // adding vertices for the sides
        for (let i = 0; i < this.slices; i++) {
            for (let floor = 0; floor < this.stacks + 1; floor++) {
                const x = size * Math.cos(i * angle);
                const y = size * Math.sin(i * angle);
                const s = i / this.slices;
                const t = 1 - floor / this.stacks; // invert t to make the texture start from the bottom
        
                this.vertices.push(x, y, floor * this.height);
                const mod = Math.sqrt(x * x + y * y);
                let nx = x / mod;
                let ny = y / mod;
                this.normals.push(nx, ny, 0);
                this.texCoords.push(s, t);
            }
        }
        
        


        // creating the sides
        for (let i = 0; i < this.slices; i++) {
            if (i == this.slices - 1) {
                offset_next = - (this.stacks + 1) * (this.slices - 1);
            }
            for (let floor = 0; floor < this.stacks; floor++) {

                let offset = offset_start + i * (this.stacks + 1) + floor;

                this.indices.push(offset, offset + offset_next, offset + 1);
                this.indices.push(offset + 1, offset + offset_next, offset + offset_next + 1);
            }
            
        }

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}
