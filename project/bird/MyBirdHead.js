import {CGFobject,CGFappearance} from '../../lib/CGF.js';
import { MyCone } from '../shapes/MyCone.js';
import { MyPyramid } from '../shapes/MyPyramid.js';
import { MyCilinder } from '../shapes/MyCilinder.js';
import { MyUnitCube } from '../shapes/MyUnitCube.js';

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
        this.cube = new MyUnitCube(this.scene);
        this.materials = new CGFappearance(this.scene);
    }

    display(){

        this.materials.setAmbient(0.0, 0.5, 1.0, 1.0);
        this.materials.setDiffuse(0.0, 0.5, 1.0, 1.0);
        this.materials.setSpecular(0.0, 0.5, 1.0, 1.0);
        this.materials.setShininess(10.0);
        this.materials.apply();

        //top of head
        this.scene.pushMatrix();
        this.scene.scale(1,0.5,1);
        this.scene.rotate(-Math.PI/4, 0, 1, 0);
        this.cone.display();
        this.scene.popMatrix();

        //middle of head
        this.scene.pushMatrix();
        this.scene.scale(1,0.6,1);
        this.scene.rotate(-Math.PI/4, 0, 1, 0);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.cilinder.display();
        this.scene.popMatrix();

        // bottom of head
        this.scene.pushMatrix();
        this.scene.translate(0,-0.6,0);
        this.scene.scale(1,0.5,1);
        this.scene.rotate(-Math.PI/4, 0, 1, 0);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.cone.display();
        this.scene.popMatrix();

        //yellow beak
        this.scene.pushMatrix();
        this.materials.setAmbient(1.0, 1.0, 0.0, 1.0);
        this.materials.setDiffuse(1.0, 1.0, 0.0, 1.0);
        this.materials.setSpecular(1.0, 1.0, 0.0, 1.0);
        this.materials.setShininess(10.0);
        this.materials.apply();
        this.scene.translate(0,-0.3,0.65);
        this.scene.scale(0.25,0.25,0.4);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.pyramid.display();
        this.scene.popMatrix();

        //red right eye
        this.scene.pushMatrix();
        this.materials.setAmbient(1.0, 0.0, 0.0, 1.0);
        this.materials.setDiffuse(1.0, 0.0, 0.0, 1.0);
        this.materials.setSpecular(1.0, 0.0, 0.0, 1.0);
        this.materials.setShininess(10.0);
        this.materials.apply();
        this.scene.translate(0.6,0,0.6);
        this.scene.scale(0.27,0.27,0.27);
        this.cube.display();
        this.scene.popMatrix();

        //red left eye
        this.scene.pushMatrix();
        this.materials.setAmbient(1.0, 0.0, 0.0, 1.0);
        this.materials.setDiffuse(1.0, 0.0, 0.0, 1.0);
        this.materials.setSpecular(1.0, 0.0, 0.0, 1.0);
        this.materials.setShininess(10.0);
        this.materials.apply();
        this.scene.translate(-0.6,0,0.6);
        this.scene.scale(0.27,0.27,0.27);
        this.cube.display();
        this.scene.popMatrix();

    }

    updateBuffers(){
        // reinitialize buffers
        this.initBuffers();
    }
	
}