import { CGFobject } from '../../lib/CGF.js';
import { MySphere } from './shapes/MySphere.js';


export class MyPanorama extends CGFobject {
	constructor(scene, texture) {
		super(scene);

        this.sphere = new MySphere(this.scene, 30, 30, 400, true);
        this.sphere.setTexture(texture);
        this.texture = texture;
	}

    display(position) {
        this.scene.pushMatrix()
        this.scene.translate(...position);
        this.sphere.display();
        this.scene.popMatrix();

    }

}
