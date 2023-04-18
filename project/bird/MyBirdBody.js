import {CGFobject,CGFappearance,CGFtexture} from '../../lib/CGF.js';
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
        this.tail = new MyCone(this.scene, 4, 1);
        this.pyramid = new MyPyramid(this.scene, 4, 1);
        this.cilinder = new MyCilinder(this.scene, 6, 1);
        this.materials = new CGFappearance(this.scene);
        this.bodyTexture = new CGFtexture(this.scene,'./images/body.png');
        this.materials.setAmbient(1.0, 1.0, 1,0, 1.0);
        this.materials.setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.materials.setSpecular(1.0, 1.0, 1.0, 1.0);
        this.materials.setShininess(20.0);

    }

    display(){

        this.materials.setTexture(this.bodyTexture);
        this.materials.apply();

        // top of body
        this.scene.pushMatrix();
        this.scene.scale(0.85,0.35,1.3);
        this.cone.display();
        this.scene.popMatrix();

        // middle of body
        this.scene.pushMatrix();
        this.scene.scale(0.85,0.7,1.3);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.cilinder.display();
        this.scene.popMatrix();
        
        // bottom of body
        this.scene.pushMatrix();
        this.scene.translate(0,-0.7,0);
        this.scene.scale(0.85,0.35,1.3);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.cone.display();
        this.scene.popMatrix();

        //tail
        this.scene.pushMatrix();
        this.scene.translate(0,-0.37,-1.12);
        this.scene.scale(0.6,0.52,0.67);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.rotate(Math.PI/4,0,1,0);
        this.tail.display();
        this.scene.popMatrix();

    }

    updateBuffers(){
        // reinitialize buffers
        this.initBuffers();
    }
	
}