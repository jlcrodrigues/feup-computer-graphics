import {CGFobject,CGFappearance,CGFtexture} from '../../lib/CGF.js';
import { MyHemisphere } from '../shapes/MyHemisphere.js';
import { MySetOfEggs } from './MySetOfEggs.js';

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
        this.setEggs = new MySetOfEggs(this.scene,5,this.position);
        this.setEggs.createEggsInNest();
        this.nrEggsInNest = 0;
    
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

    reset(){
        this.nrEggsInNest = 0;
        for (var i = 0; i < this.setEggs.numberEggs; i++){
            this.setEggs.eggs[i].disable();
        }
    }


    display(){

        this.materials.apply();

        this.scene.pushMatrix();
        this.scene.translate(this.position[0],this.position[1]-1.5+(1.5*this.scene.scaleFactor),this.position[2]);
        this.scene.scale(this.scene.scaleFactor,0.5*this.scene.scaleFactor,this.scene.scaleFactor);
        this.nest.display();
        this.scene.popMatrix();

        this.setEggs.display(true);

    }

    updateBuffers(){
        // reinitialize buffers
        this.initBuffers();
    }
	
}