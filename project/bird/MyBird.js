import {CGFobject,CGFappearance} from '../../lib/CGF.js';
import { MyUnitCube } from '../shapes/MyUnitCube.js';
import { MyCone } from '../shapes/MyCone.js';
import { MyPyramid } from '../shapes/MyPyramid.js';
import { MyCilinder } from '../shapes/MyCilinder.js';
import { MyBirdHead } from './MyBirdHead.js';
import { MyBirdBody } from './MyBirdBody.js';
import { MyBirdWing } from './MyBirdWing.js';

/**
 * MyBird
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBird extends CGFobject {
	constructor(scene,orientation,velocity,position) {
		super(scene);
        this.cube = new MyUnitCube(this.scene);
        this.cone = new MyCone(this.scene, 8, 1);
        this.pyramid = new MyPyramid(this.scene, 4, 1);
        this.cilinder = new MyCilinder(this.scene, 3, 1);
        this.birdHead = new MyBirdHead(this.scene);
        this.birdBody = new MyBirdBody(this.scene);
        this.leftBirdWing = new MyBirdWing(this.scene);
        this.rightBirdWing = new MyBirdWing(this.scene);
        this.time = 0;
        this.orientation = orientation; //in degrees 0 means pointing to the positive z axis
        this.rawVelocity = velocity;
        this.position = position;
        this.speedFactor = 1;
        this.velocity = this.rawVelocity * this.speedFactor;
        
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

    updatePosition(){
        this.position[2] += this.velocity * Math.cos(this.orientation * Math.PI/180);
        this.position[0] += this.velocity * Math.sin(this.orientation * Math.PI/180);
    }

    updateVelocity(){
        this.velocity = this.rawVelocity * this.speedFactor;
    }

    accelerate(v){
        if(this.rawVelocity+v > 0 && this.rawVelocity+v < 1.25){
            this.rawVelocity += v;   
        }
        else if (this.rawVelocity+v <= 0){
            this.rawVelocity = 0;
        }
        else {
            this.rawVelocity = 1.25;
        }        
    }

    turn(v){
        this.orientation += v;
    }

    reset(){
        this.orientation = 0;
        this.rawVelocity = 0;
        this.position = [0,3,0];
    }

    display(){

        //head
        this.scene.pushMatrix();
        this.scene.translate(0,Math.sin(this.time*10*(this.velocity+0.5))*0.3,0);
        this.scene.scale(0.8,0.8,0.8);
        this.birdHead.display();
        this.scene.popMatrix();

        //body
        this.scene.pushMatrix();
        this.scene.translate(0,Math.sin(this.time*10*(this.velocity+0.5))*0.3,0);
        this.scene.translate(0,-0.4,-1.5);
        this.scene.rotate(-Math.PI/8,1,0,0);
        this.birdBody.display();
        this.scene.popMatrix();

        // left wing
        this.scene.pushMatrix();
        this.scene.translate(0,Math.sin(this.time*10*(this.velocity+0.5))*0.3,0);
        this.scene.translate(1.2,-0.75,-1.3);
        this.leftBirdWing.display(this.time,this.velocity);
        this.scene.popMatrix();

        // right wing
        this.scene.pushMatrix();
        this.scene.translate(0,Math.sin(this.time*10*(this.velocity+0.5))*0.3,0);
        this.scene.translate(-1.2,-0.75,-1.3);
        this.scene.rotate(Math.PI,0,1,0);
        this.rightBirdWing.display(this.time,this.velocity);
        this.scene.popMatrix();

    }

    updateBuffers(){
        // reinitialize buffers
        this.initBuffers();
    }
	
}