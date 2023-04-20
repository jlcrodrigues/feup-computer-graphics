import {CGFobject,CGFappearance,CGFtexture} from '../../lib/CGF.js';
import { MyHemisphere } from '../shapes/MyHemisphere.js';
import { MyBirdEgg } from './MyBirdEgg.js';

/**
 * MyNest
 * @constructor
 * @param scene - Reference to MyScene object
 * @param position - position of the nest
 */
export class MyNest extends CGFobject {
	constructor(scene,position) {
		super(scene);
        this.position = position;
        this.nest = new MyHemisphere(this.scene, 20, 20,3);
        this.eggs = new Array(5);   
        this.createEggsPosition();
        this.numberEggs = 0;
    
        this.initMaterials();
    }

    initMaterials() {
        //generic material
        this.materials = new CGFappearance(this.scene);
        this.materials.setAmbient(0.8, 0.8, 0.8, 1.0);
        this.materials.setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.materials.setSpecular(1.0, 1.0, 1.0, 1.0);
        this.materials.setShininess(10.0);
        this.nestTexture = new CGFtexture(this.scene, './images/nest.png');
        this.materials.setTexture(this.nestTexture);
	}

    createEggsPosition(){
        var x = this.position[0];
        var y = this.position[1];
        var z = this.position[2];
        var offset = 1;
        this.eggs[0] = new MyBirdEgg(this.scene,0,[x,y,z],true);
        this.eggs[1] = new MyBirdEgg(this.scene,0,[x+offset,y,z+offset],true);
        this.eggs[2] = new MyBirdEgg(this.scene,0,[x+offset,y,z-offset],true);
        this.eggs[3] = new MyBirdEgg(this.scene,0,[x-offset,y,z+offset],true);
        this.eggs[4] = new MyBirdEgg(this.scene,0,[x-offset,y,z-offset],true);
    }

    reset(){
        this.numberEggs = 0;
        for (var i = 0; i < this.eggs.length; i++){
            this.eggs[i].disable();
        }
    }


    display(){

        this.materials.apply();

        this.scene.pushMatrix();
        this.scene.translate(this.position[0],this.position[1]-1+(1*this.scene.scaleFactor),this.position[2]);
        this.scene.scale(this.scene.scaleFactor,0.5*this.scene.scaleFactor,this.scene.scaleFactor);
        this.nest.display();
        this.scene.popMatrix();

        for (var i = 0; i < this.eggs.length; i++){
            this.scene.pushMatrix();
            this.scene.translate(this.eggs[i].position[0],this.eggs[i].position[1],this.eggs[i].position[2]);
            this.scene.scale(this.scene.scaleFactor,this.scene.scaleFactor,this.scene.scaleFactor);
            this.eggs[i].display();
            this.scene.popMatrix();
        }


    }

    updateBuffers(){
        // reinitialize buffers
        this.initBuffers();
    }
	
}