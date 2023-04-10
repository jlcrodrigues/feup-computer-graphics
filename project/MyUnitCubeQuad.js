import {CGFobject, CGFappearance, CGFtexture} from '../lib/CGF.js';
import { MyQuad } from "./MyQuad.js";

/**
 * MyUnitCubeQuad
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyUnitCubeQuad extends CGFobject {
	constructor(scene, ...textures) {
		super(scene);
		this.initBuffers();
	}
	
    display(){
        this.scene.quad = new MyQuad(this.scene);
		//top,
        this.scene.pushMatrix();
        this.scene.translate(0,0.5,0);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.scene.quad.display();
        this.scene.popMatrix();
        // front
        this.scene.pushMatrix();
        this.scene.translate(0,0,0.5);
        this.scene.quad.display();
        this.scene.popMatrix();
		//right
        this.scene.pushMatrix();
        this.scene.translate(0.5,0,0);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.scene.quad.display();
        this.scene.popMatrix();
		// back
        this.scene.pushMatrix();
        this.scene.translate(0,0,-0.5);
        this.scene.rotate(Math.PI,0,1,0);
        this.scene.quad.display();
        this.scene.popMatrix();
		//left
        this.scene.pushMatrix();
        this.scene.translate(-0.5,0,0);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.scene.quad.display();
        this.scene.popMatrix();
		//bot,
        this.scene.pushMatrix();
        this.scene.translate(0,-0.5,0);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.scene.quad.display();
        this.scene.popMatrix();
        
    }
}

