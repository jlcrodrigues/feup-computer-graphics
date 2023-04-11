import { CGFobject } from '../lib/CGF.js';

/**
 * MyCilinder
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of slices (lados) of the sphere
 * @param stacks - Number of stacks (andares) of the sphere
 */
export class MySphere extends CGFobject {
	constructor(scene, slices, stacks, radius = 1) {
		super(scene);
		this.slices = slices;
		this.stacks = stacks;
        this.radius = radius;

        this.initBuffers()
	}

	initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.texCoords = [];

        for (let i = 0; i < this.stacks + 1; i++) {
            let latitude = - Math.PI / 2 + i * Math.PI / this.stacks;
            let cos_lat = Math.cos(latitude)
            let sin_lat = Math.sin(latitude)
            for (let j = 0; j < this.slices; j++) {
                let longitude = j * 2 * Math.PI / this.slices;
                this.vertices.push(this.radius * cos_lat * Math.cos(longitude))
                this.vertices.push(this.radius * sin_lat)
                this.vertices.push(this.radius * cos_lat * Math.sin(longitude))

                if (i > 0 && j > 0) {
                    let cur = i * this.slices + j;
                    // cur - 1  ; cur
                    // cur - slices - 1; cur - slices
                    this.indices.push(cur - this.slices - 1, cur - this.slices, cur);
                    this.indices.push(cur - this.slices - 1, cur, cur - 1);
                }
            }
            let last = (i + 1) * this.slices - 1
            // last slice 
            // last ; last - slices + 1
            // last - slices; last - 2 * slices + 1
            if (i > 0) {
                this.indices.push(last - this.slices, last - 2 * this.slices + 1, last - this.slices + 1);
                this.indices.push(last - this.slices, last - this.slices + 1, last);
            }
        }

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}
}
