import {CGFobject,CGFappearance,CGFtexture} from '../../lib/CGF.js';
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
        this.wingTexture = new CGFtexture(this.scene,'./images/wing.jpg');
        this.materials.setAmbient(1.0, 1.0, 1,0, 1.0);
        this.materials.setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.materials.setSpecular(1.0, 1.0, 1.0, 1.0);
        this.materials.setShininess(20.0);
        this.materials.setTexture(this.wingTexture);
    }

    display(a1,a2){

        //console.log("t " + t + "v " + v)

        //var angleWing1 = (35 * Math.PI/180) * -Math.sin(frequency);
        //var angleWing2 = (70 * Math.PI/180) * -Math.sin(frequency);

        this.materials.apply();

        //wing 1st part
        this.scene.pushMatrix();
        this.scene.rotate(a1,0,0,1);
        this.scene.translate(0.5*1.2,0,0);
        this.scene.scale(1.2,0.1,0.85);
        this.cube.display();
        this.scene.popMatrix();

        //wing 2nd part
        this.scene.pushMatrix();
        this.scene.translate(Math.cos(a1)*1.2,Math.sin(a1)*1.2,0)
        this.scene.rotate(a2,0,0,1);
        this.scene.scale(0.85,0.1,0.5);
        this.scene.rotate(-Math.PI/2,0,0,1);
        this.scene.translate(0,0,-0.85);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.scene.translate(0.85,0.5,-0.5);
        this.scene.rotate(-Math.PI/6,0,0,1);
        this.cilinder.display();
        this.scene.popMatrix();

    }

    updateBuffers(){
        // reinitialize buffers
        this.initBuffers();
    }
	
}