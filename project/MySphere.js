import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';

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
        this.initMaterials()
	}

    initMaterials() {
        this.sphereTexture = new CGFtexture(this.scene, "images/earth.jpg");
        this.sphereMaterial = new CGFappearance(this.scene);
        this.sphereMaterial.setTexture(this.sphereTexture);
        this.sphereMaterial.setTextureWrap('REPEAT', 'REPEAT');
        this.sphereMaterial.setAmbient(1, 1, 1, 1.0)
        this.sphereMaterial.setDiffuse(1, 1, 1, 1.0)
    }

	initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];

        for (let i = 0; i < this.stacks + 1; i++) {
            let latitude = - Math.PI / 2 + i * Math.PI / this.stacks;
            let cos_lat = Math.cos(latitude)
            let sin_lat = Math.sin(latitude)
            for (let j = 0; j < this.slices + 1; j++) {
                let longitude = j * 2 * Math.PI / this.slices;
                let x = this.radius * cos_lat * Math.cos(longitude)
                let y = this.radius * sin_lat
                let z = this.radius * cos_lat * Math.sin(longitude)

                this.vertices.push(x)
                this.vertices.push(y)
                this.vertices.push(z)

                this.texCoords.push(1 - j / this.slices, 1 - i / this.stacks)
                this.normals.push(x, y, z) 

                if (i > 0 && j > 0) {
                    let cur = this.vertices.length / 3 - 1;
                    this.indices.push(cur - 1, cur - this.slices - 1, cur - this.slices - 2);
                    this.indices.push(cur - 1, cur, cur - this.slices - 1);

                }
            }
        }

		this.primitiveType = this.scene.gl.TRIANGLES;
		this.initGLBuffers();
	}

    display() {
        this.sphereMaterial.apply();
        super.display();
    }

}
