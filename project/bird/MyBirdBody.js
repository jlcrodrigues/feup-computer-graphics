import {CGFobject,CGFappearance,CGFtexture} from '../../lib/CGF.js';
import { MyCone } from '../shapes/MyCone.js';
import { MyCilinder } from '../shapes/MyCilinder.js';
import { MyTrapezoidalPrism } from '../shapes/MyTrapezoidalPrism.js';

/**
 * MyBirdBody
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBirdBody extends CGFobject {
	constructor(scene) {
		super(scene);
        this.cone = new MyCone(this.scene, 6, 1);
        this.tail = new MyTrapezoidalPrism(this.scene, 0.25, 0.5, 0.3);
        this.tail2 = new MyTrapezoidalPrism(this.scene, 0.15, 0.5, 0.3);
        this.cilinder = new MyCilinder(this.scene, 6, 1);
        this.materials = new CGFappearance(this.scene);
        this.bodyTexture = new CGFtexture(this.scene,'./images/body.png');
        this.tailTexture = new CGFtexture(this.scene,'./images/head.png');
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
        this.scene.scale(0.85,0.25,1.15);
        this.cone.display();
        this.scene.popMatrix();

        // middle of body
        this.scene.pushMatrix();
        this.scene.scale(0.85,0.5,1.15);
        this.scene.rotate(Math.PI/2, 1, 0, 0);
        this.cilinder.display();
        this.scene.popMatrix();
        
        // bottom of body
        this.scene.pushMatrix();
        this.scene.translate(0,-0.5,0);
        this.scene.scale(0.85,0.25,1.15);
        this.scene.rotate(Math.PI, 1, 0, 0);
        this.cone.display();
        this.scene.popMatrix();

        //tail
        this.scene.pushMatrix();
        this.materials.setTexture(this.tailTexture);
        this.materials.apply();
        this.scene.translate(0,-0.25,-1.2);
        this.scene.scale(1,0.8,0.7);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.tail.display();
        this.scene.popMatrix();

        //tail2
        this.scene.pushMatrix();
        this.materials.setTexture(this.tailTexture);
        this.materials.apply();
        this.scene.translate(0,-0.25,-1.2);
        this.scene.scale(1,0.8,0.7);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.rotate(Math.PI,0,0,1);
        this.tail2.display();
        this.scene.popMatrix();


    }

    updateBuffers(){
        // reinitialize buffers
        this.initBuffers();
    }
	
}