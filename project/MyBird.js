import {CGFobject,CGFappearance} from '../lib/CGF.js';
import { MyUnitCubeQuad } from './MyUnitCubeQuad.js';
import { MyCone } from './MyCone.js';
import { MyPyramid } from './MyPyramid.js';
import { MyCilinder } from './MyCilinder.js';

/**
 * MyBird
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBird extends CGFobject {
	constructor(scene) {
		super(scene);
        this.cube = new MyUnitCubeQuad(this.scene);
        this.cone = new MyCone(this.scene, 8, 20);
        this.pyramid = new MyPyramid(this.scene, 4, 25);
        this.cilinder = new MyCilinder(this.scene, 3, 20);
        
        this.initMaterials();
    }

    initMaterials() {
        //generic material
        this.materials = new CGFappearance(this.scene);
        this.materials.setAmbient(0.8, 0.8, 0.8, 1.0);
        this.materials.setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.materials.setSpecular(1.0, 1.0, 1.0, 1.0);
        this.materials.setShininess(10.0);
	}

    display(){
        
        //light blue head 
        this.scene.pushMatrix();
        this.materials.setAmbient(0.0, 0.5, 1.0, 1.0);
        this.materials.setDiffuse(0.0, 0.5, 1.0, 1.0);
        this.materials.setSpecular(0.0, 0.5, 1.0, 1.0);
        this.materials.setShininess(10.0);
        this.materials.apply();
        this.cube.display();
        this.scene.popMatrix();

        //red right eye
        this.scene.pushMatrix();
        this.materials.setAmbient(1.0, 0.0, 0.0, 1.0);
        this.materials.setDiffuse(1.0, 0.0, 0.0, 1.0);
        this.materials.setSpecular(1.0, 0.0, 0.0, 1.0);
        this.materials.setShininess(10.0);
        this.materials.apply();
        this.scene.translate(0.5,0,0.4);
        this.scene.scale(0.25,0.25,0.25);
        this.cube.display();
        this.scene.popMatrix();

        //red left eye
        this.scene.pushMatrix();
        this.materials.setAmbient(1.0, 0.0, 0.0, 1.0);
        this.materials.setDiffuse(1.0, 0.0, 0.0, 1.0);
        this.materials.setSpecular(1.0, 0.0, 0.0, 1.0);
        this.materials.setShininess(10.0);
        this.materials.apply();
        this.scene.translate(-0.5,0,0.4);
        this.scene.scale(0.25,0.25,0.25);
        this.cube.display();
        this.scene.popMatrix();

        //yellow beak
        this.scene.pushMatrix();
        this.materials.setAmbient(1.0, 1.0, 0.0, 1.0);
        this.materials.setDiffuse(1.0, 1.0, 0.0, 1.0);
        this.materials.setSpecular(1.0, 1.0, 0.0, 1.0);
        this.materials.setShininess(10.0);
        this.materials.apply();
        this.scene.translate(0,-0.2,0.5);
        this.scene.scale(0.25,0.25,0.5);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.pyramid.display();
        this.scene.popMatrix();

        //light blue neck
        this.scene.pushMatrix();
        this.materials.setAmbient(0.0, 0.5, 1.0, 1.0);
        this.materials.setDiffuse(0.0, 0.5, 1.0, 1.0);
        this.materials.setSpecular(0.0, 0.5, 1.0, 1.0);
        this.materials.setShininess(10.0);
        this.materials.apply();
        this.scene.translate(0,-0.5,0);
        this.scene.scale(0.6,0.6,0.5);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.cone.display();
        this.scene.popMatrix();

        //light blue body
        this.scene.pushMatrix();
        this.materials.setAmbient(0.0, 0.5, 1.0, 1.0);
        this.materials.setDiffuse(0.0, 0.5, 1.0, 1.0);
        this.materials.setSpecular(0.0, 0.5, 1.0, 1.0);
        this.materials.setShininess(10.0);
        this.materials.apply();
        this.scene.translate(0,-0.8,-0.8);
        this.scene.scale(1.2,1.5,2);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.cube.display();
        this.scene.popMatrix();

        //light blue tail
        this.scene.pushMatrix();
        this.materials.setAmbient(0.0, 0.5, 1.0, 1.0);
        this.materials.setDiffuse(0.0, 0.5, 1.0, 1.0);
        this.materials.setSpecular(0.0, 0.5, 1.0, 1.0);
        this.materials.setShininess(10.0);
        this.materials.apply();
        this.scene.translate(0,-0.8,-1.8);
        this.scene.scale(0.7,0.7,1);
        this.scene.rotate(-Math.PI/4,0,0,1);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.pyramid.display();
        this.scene.popMatrix();

        //light blue left wing 1st part
        this.scene.pushMatrix();
        this.materials.setAmbient(0.0, 0.5, 1.0, 1.0);
        this.materials.setDiffuse(0.0, 0.5, 1.0, 1.0);
        this.materials.setSpecular(0.0, 0.5, 1.0, 1.0);
        this.materials.setShininess(10.0);
        this.materials.apply();
        this.scene.translate(1,0,-0.8);
        this.scene.rotate(Math.PI/8,0,0,1);
        this.scene.scale(1.2,0.1,1);
        this.cube.display();
        this.scene.popMatrix();

        //light blue left wing 2nd part
        this.scene.pushMatrix();
        this.materials.setAmbient(0.0, 0.5, 1.0, 1.0);
        this.materials.setDiffuse(0.0, 0.5, 1.0, 1.0);
        this.materials.setSpecular(0.0, 0.5, 1.0, 1.0);
        this.materials.setShininess(10.0);
        this.materials.apply();
        this.scene.translate(2,0.1,-0.8);
        this.scene.rotate(-Math.PI/8,0,0,1);
        this.scene.rotate(-Math.PI/2,0,0,1);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.scale(0.6,1,0.1);
        this.scene.rotate(-Math.PI/6,0,0,1);
        this.cilinder.display();
        this.scene.popMatrix();

        //light blue right wing 1st part
        this.scene.pushMatrix();
        this.materials.setAmbient(0.0, 0.5, 1.0, 1.0);
        this.materials.setDiffuse(0.0, 0.5, 1.0, 1.0);
        this.materials.setSpecular(0.0, 0.5, 1.0, 1.0);
        this.materials.setShininess(10.0);
        this.materials.apply();
        this.scene.translate(-1,0,-0.8);
        this.scene.rotate(-Math.PI/8,0,0,1);
        this.scene.scale(1.2,0.1,1);
        this.cube.display();
        this.scene.popMatrix();

        //light blue right wing 2nd part
        this.scene.pushMatrix();
        this.materials.setAmbient(0.0, 0.5, 1.0, 1.0);
        this.materials.setDiffuse(0.0, 0.5, 1.0, 1.0);
        this.materials.setSpecular(0.0, 0.5, 1.0, 1.0);
        this.materials.setShininess(10.0);
        this.materials.apply();
        this.scene.translate(-1.95,0,-0.8);
        this.scene.rotate(Math.PI/8,0,0,1);
        this.scene.rotate(Math.PI/2,0,0,1);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.scale(0.6,1,0.1);
        this.scene.rotate(-Math.PI/6,0,0,1);
        this.cilinder.display();
        this.scene.popMatrix();

    }

    updateBuffers(){
        // reinitialize buffers
        this.initBuffers();
    }
	
}