import {CGFobject,CGFappearance,CGFtexture} from '../../lib/CGF.js';
import { MyHemisphere } from '../shapes/MyHemisphere.js';

/**
 * MyEgg
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBirdEgg extends CGFobject {
	constructor(scene,velocity,position,disabled = false) {
		super(scene);
        this.time = 0;
        this.rawVelocity = velocity;
        this.position = position;
        this.orientation = 0;
        this.speedFactor = 1;
        this.velocity = this.rawVelocity * this.speedFactor;
        this.eggTop = new MyHemisphere(this.scene, 20, 20,0.5);
        this.eggBottom = new MyHemisphere(this.scene, 20, 20,0.5);
        this.disabled = disabled;
        this.falling = true;
        
        this.initMaterials();
    }

    initMaterials() {
        //generic material
        this.materials = new CGFappearance(this.scene);
        this.materials.setAmbient(0.8, 0.8, 0.8, 1.0);
        this.materials.setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.materials.setSpecular(1.0, 1.0, 1.0, 1.0);
        this.materials.setShininess(10.0);
        this.eggTexture = new CGFtexture(this.scene, './images/egg.png');
        this.materials.setTexture(this.eggTexture);
	}

    updatePosition(){
        this.position[2] += this.velocity * 0.2 * Math.cos(this.orientation * Math.PI/180) * this.scene.scaleFactor;
        this.position[0] += this.velocity * 0.2 * Math.sin(this.orientation * Math.PI/180) * this.scene.scaleFactor;
        if (this.falling){
            this.position[1] -= 0.1 * this.scene.scaleFactor;
        }
        if(this.position[1] <= -55 && this.falling){
            this.position[1] = -55;
            this.falling = false;
            //distance to nest
            let distance = Math.sqrt(Math.pow(this.position[0]-this.scene.nest.position[0],2) + Math.pow(this.position[2]-this.scene.nest.position[2],2));
            if (distance <= 4){
                this.disabled = true;
                this.scene.nest.setEggs.eggs[this.scene.nest.nrEggsInNest].enable();
                this.scene.nest.nrEggsInNest++;
            }
        }
    }

    updateVelocity(){
        if (this.rawVelocity-0.01 <= 0){
            this.rawVelocity = 0;
        }
        else {
            this.rawVelocity -= 0.01;
        } 
        this.velocity = this.rawVelocity * this.speedFactor;
    }

    enable(){
        this.disabled = false;
    } 

    disable(){
        this.disabled = true;
    }

    display(){

        if (this.disabled){
            return;
        }

        this.materials.apply();

        this.scene.pushMatrix();
        this.eggBottom.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.scale(1,1.7,1);
        this.scene.rotate(Math.PI,0,0,1);
        this.eggTop.display();
        this.scene.popMatrix();

    }

    updateBuffers(){
        // reinitialize buffers
        this.initBuffers();
    }
	
}