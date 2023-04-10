import {CGFobject,CGFappearance} from '../lib/CGF.js';
import { MyCone } from './MyCone.js';
import { MyPyramid } from './MyPyramid.js';
import { MyCilinder } from './MyCilinder.js';

/**
 * MyBirdHead
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBirdHead extends CGFobject {
	constructor(scene) {
		super(scene);
        this.cone = new MyCone(this.scene, 4, 1);
        this.pyramid = new MyPyramid(this.scene, 4, 1);
        this.cilinder = new MyCilinder(this.scene, 4, 1);
    }

    display(){

        this.scene.pushMatrix();
        this.scene.scale(1,0.5,1);
        this.cone.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        //this.scene.translate(1,0,0);
        this.scene.scale(1,0.6,1);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.cilinder.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,-0.6,0);
        this.scene.scale(1,0.5,1);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.cone.display();
        this.scene.popMatrix();

    }

    updateBuffers(){
        // reinitialize buffers
        this.initBuffers();
    }
	
}