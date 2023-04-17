import {CGFobject,CGFappearance} from '../../lib/CGF.js';
import { MyCone } from '../shapes/MyCone.js';
import { MyPyramid } from '../shapes/MyPyramid.js';
import { MyCilinder } from '../shapes/MyCilinder.js';

/**
 * MyBirdBody
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBirdBody extends CGFobject {
	constructor(scene) {
		super(scene);
        this.cone = new MyCone(this.scene, 6, 1);
        this.pyramid = new MyPyramid(this.scene, 4, 1);
        this.cilinder = new MyCilinder(this.scene, 6, 1);
        this.materials = new CGFappearance(this.scene);
    }

    display(){

        this.materials.setAmbient(0.0, 0.5, 1.0, 1.0);
        this.materials.setDiffuse(0.0, 0.5, 1.0, 1.0);
        this.materials.setSpecular(0.0, 0.5, 1.0, 1.0);
        this.materials.setShininess(10.0);
        this.materials.apply();

        // top of body
        this.scene.pushMatrix();
        this.scene.scale(1,0.5,1.3);
        this.cone.display();
        this.scene.popMatrix();

        // middle of body
        this.scene.pushMatrix();
        this.scene.scale(1,0.95,1.3);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.cilinder.display();
        this.scene.popMatrix();
        
        // bottom of body
        this.scene.pushMatrix();
        this.scene.translate(0,-0.95,0);
        this.scene.scale(1,0.5,1.3);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.cone.display();
        this.scene.popMatrix();

        //tail
        this.scene.pushMatrix();
        this.scene.translate(0,-0.4,-1.12);
        this.scene.scale(0.72,0.57,0.7);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.rotate(Math.PI/4,0,1,0);
        this.pyramid.display();
        this.scene.popMatrix();

    }

    updateBuffers(){
        // reinitialize buffers
        this.initBuffers();
    }
	
}