import {CGFobject,CGFappearance,CGFtexture} from '../../lib/CGF.js';
import { MyHemisphere } from '../shapes/MyHemisphere.js';

/**
 * MyEgg
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyEgg extends CGFobject {
	constructor(scene,orientation,velocity,position) {
		super(scene);
        this.time = 0;
        this.rotation = orientation; //in degrees in y axis
        this.rawVelocity = velocity;
        this.position = position;
        this.speedFactor = 1;
        this.velocity = this.rawVelocity * this.speedFactor;
        this.eggTop = new MyHemisphere(this.scene, 20, 20,0.5);
        this.eggBottom = new MyHemisphere(this.scene, 20, 20,0.5);
        
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
    }

    updateVelocity(){
    }

    updateWingAngle(){
    }

    accelerate(v){      
    }

    turn(v){
    }

    tilt(a){
    }

    reset(){

    }

    display(){

        this.materials.apply();

        this.scene.pushMatrix();
        this.scene.translate(this.position[0],this.position[1],this.position[2]);
        this.scene.scale(this.scene.scaleFactor,this.scene.scaleFactor,this.scene.scaleFactor);
        this.eggBottom.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(this.position[0],this.position[1],this.position[2]);
        this.scene.scale(this.scene.scaleFactor,1.7*this.scene.scaleFactor,this.scene.scaleFactor);
        this.scene.rotate(Math.PI,0,0,1);
        this.eggTop.display();
        this.scene.popMatrix();

    }

    updateBuffers(){
        // reinitialize buffers
        this.initBuffers();
    }
	
}