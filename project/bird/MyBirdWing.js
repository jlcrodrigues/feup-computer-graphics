import {CGFobject,CGFappearance} from '../../lib/CGF.js';
import { MyCilinder } from '../shapes/MyCilinder.js';
import { MyUnitCube } from '../shapes/MyUnitCube.js';

/**
 * MyBirdWing
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBirdWing extends CGFobject {
	constructor(scene) {
		super(scene);
        this.cube = new MyUnitCube(this.scene);
        this.cilinder = new MyCilinder(this.scene, 3, 1);
        this.materials = new CGFappearance(this.scene);
    }

    display(t,v){

        this.materials.setAmbient(0.0, 0.5, 1.0, 1.0);
        this.materials.setDiffuse(0.0, 0.5, 1.0, 1.0);
        this.materials.setSpecular(0.0, 0.5, 1.0, 1.0);
        this.materials.setShininess(10.0);
        this.materials.apply();

        //wing 1st part
        this.scene.pushMatrix();
        this.scene.rotate(-(Math.PI/6)*Math.sin(t*10*(v+0.5)),0,0,1);
        this.scene.scale(1.2,0.1,1);
        this.cube.display();
        this.scene.popMatrix();

        //wing 2nd part
        this.scene.pushMatrix();
        this.scene.translate(1.1-Math.abs(Math.sin(t*10*(v+0.5)))*0.35,0.05-Math.sin(t*10*(v+0.5))*0.705,0);
        this.scene.rotate(-(Math.PI/3)*Math.sin(t*10*(v+0.5)),0,0,1);
        this.scene.rotate(-Math.PI/2,0,0,1);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.scale(0.595,1,0.1);
        this.scene.rotate(-Math.PI/6,0,0,1);
        this.cilinder.display();
        this.scene.popMatrix();

    }

    updateBuffers(){
        // reinitialize buffers
        this.initBuffers();
    }
	
}