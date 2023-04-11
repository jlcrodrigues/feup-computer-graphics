import { CGFobject, CGFappearance, CGFtexture } from '../lib/CGF.js';
import { MySphere } from './MySphere.js';

/**
 * MyCilinder
 * @constructor
 * @param scene - Reference to MyScene object
 * @param slices - Number of slices (lados) of the sphere
 * @param stacks - Number of stacks (andares) of the sphere
 */
export class MyPanorama extends CGFobject {
	constructor(scene, texture) {
		super(scene);

        this.sphere = new MySphere(this.scene, 20, 20, 200, true);
        this.sphere.setTexture(texture);
        this.texture = texture;
	}

    display() {
        this.sphere.display();
    }

}
