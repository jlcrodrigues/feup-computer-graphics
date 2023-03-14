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
        this.textures = []
        for (let i = 0; i < textures.length; i++) {
            this.textures.push(new CGFtexture(this.scene, textures[i]));
        }
        this.initMaterials();
	}

    initMaterials() {
        //generic material
        this.materials = new CGFappearance(this.scene);
        this.materials.setAmbient(0.8, 0.8, 0.8, 1.0);
        this.materials.setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.materials.setSpecular(1.0, 1.0, 1.0, 1.0);
        this.materials.setShininess(10.0);
        this.materials.loadTexture('images/tangram.png');
        this.materials.setTextureWrap('REPEAT', 'REPEAT');
	}
	
    display(){
        this.scene.quad = new MyQuad(this.scene);
		//top,
        this.scene.pushMatrix();
        this.scene.translate(0,0.5,0);
        this.scene.rotate(-Math.PI/2,1,0,0);
        this.textures[0].bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.quad.display();
        this.scene.popMatrix();
        // front
        this.scene.pushMatrix();
        this.scene.translate(0,0,0.5);
        this.textures[1].bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.quad.display();
        this.scene.popMatrix();
		//right
        this.scene.pushMatrix();
        this.scene.translate(0.5,0,0);
        this.scene.rotate(Math.PI/2,0,1,0);
        this.textures[2].bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.quad.display();
        this.scene.popMatrix();
		// back
        this.scene.pushMatrix();
        this.scene.translate(0,0,-0.5);
        this.scene.rotate(Math.PI,0,1,0);
        this.textures[3].bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.quad.display();
        this.scene.popMatrix();
		//left
        this.scene.pushMatrix();
        this.scene.translate(-0.5,0,0);
        this.scene.rotate(-Math.PI/2,0,1,0);
        this.textures[4].bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.quad.display();
        this.scene.popMatrix();
		//bot,
        this.scene.pushMatrix();
        this.scene.translate(0,-0.5,0);
        this.scene.rotate(Math.PI/2,1,0,0);
        this.textures[5].bind();
        this.scene.gl.texParameteri(this.scene.gl.TEXTURE_2D, this.scene.gl.TEXTURE_MAG_FILTER, this.scene.gl.NEAREST);
        this.scene.quad.display();
        this.scene.popMatrix();
        
    }
}

