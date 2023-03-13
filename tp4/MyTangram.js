import {CGFobject,CGFappearance} from '../lib/CGF.js';
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParalelogram} from "./MyParalelogram.js";

/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyTangram extends CGFobject {
	constructor(scene) {
		super(scene);
        this.diamond = new MyDiamond(this.scene);
        this.triangle = new MyTriangle(this.scene);
        this.paralelogram = new MyParalelogram(this.scene);
        this.initMaterials();
    }
    initMaterials() {

        // Materials
		this.materials = [];

		// Material for blue triangle
        this.materials['blue'] = new CGFappearance(this.scene);
        this.materials['blue'].setAmbient(0.2, 0.2, 1.0, 1.0);
        this.materials['blue'].setDiffuse(0.2, 0.2, 1.0, 1.0);
        this.materials['blue'].setSpecular(1.0, 1.0, 1.0, 1.0);
        this.materials['blue'].setShininess(10.0);
        

		// Material for purple triangle
		this.materials['purple'] = new CGFappearance(this.scene);
		this.materials['purple'].setAmbient(0.5, 0.0, 0.8, 1.0);
		this.materials['purple'].setDiffuse(0.5, 0.0, 0.8, 1.0);
        this.materials['purple'].setSpecular(1.0, 1.0, 1.0, 1.0);
		this.materials['purple'].setShininess(10.0);

		// Material for red triangle
		this.materials['red'] = new CGFappearance(this.scene);
		this.materials['red'].setAmbient(0.8, 0.0, 0.0, 1.0);
		this.materials['red'].setDiffuse(0.8, 0.0, 0.0, 1.0);
		this.materials['red'].setSpecular(1.0, 1.0, 1.0, 1.0);
		this.materials['red'].setShininess(10.0);

        // Material for orange triangle
        this.materials['orange'] = new CGFappearance(this.scene);
        this.materials['orange'].setAmbient(0.8, 0.4, 0.0, 1.0);
        this.materials['orange'].setDiffuse(0.8, 0.4, 0.0, 1.0);
        this.materials['orange'].setSpecular(1.0, 1.0, 1.0, 1.0);
        this.materials['orange'].setShininess(10.0);


        // Material for pink triangle
        this.materials['pink'] = new CGFappearance(this.scene);
        this.materials['pink'].setAmbient(0.8, 0.0, 0.4, 1.0);
        this.materials['pink'].setDiffuse(1.0, 0.4, 0.8, 1.0);
        this.materials['pink'].setSpecular(1.0, 1.0, 1.0, 1.0);
        this.materials['pink'].setShininess(10.0);


        // Material for yellow paralelogram
        this.materials['yellow'] = new CGFappearance(this.scene);
        this.materials['yellow'].setAmbient(0.8, 0.8, 0.0, 1.0);
        this.materials['yellow'].setDiffuse(0.8, 0.8, 0.0, 1.0);
        this.materials['yellow'].setSpecular(1.0, 1.0, 1.0, 1.0);
        this.materials['yellow'].setShininess(10.0);

        // Material for green diamond
        this.materials['green'] = new CGFappearance(this.scene);
        this.materials['green'].setAmbient(0.8, 0.8, 0.8, 1.0);
        this.materials['green'].setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.materials['green'].setSpecular(1.0, 1.0, 1.0, 1.0);
        this.materials['green'].setShininess(10.0);
        this.materials['green'].loadTexture('images/tangram.png');
        this.materials['green'].setTextureWrap('REPEAT', 'REPEAT');

	}

    enableNormalViz(){
        this.diamond.enableNormalViz();
        this.triangle.enableNormalViz();
        this.paralelogram.enableNormalViz();
    }
    disableNormalViz(){
        this.diamond.disableNormalViz();
        this.triangle.disableNormalViz();
        this.paralelogram.disableNormalViz();
    }

    display(){

        var m =[
            1, 0, 0, 0,  
            0, 1, 0, 0,   
            0, 0, 1, 0,    
            -1, 0, 0, 1  
        ];
    
        this.scene.pushMatrix()
        this.scene.multMatrix(m);
    
        // ---- BEGIN Primitive drawing section
        
        // Green diamond
        this.materials['green'].apply();
        this.diamond.display();
    
        // ---- END Primitive drawing section
    
        this.scene.popMatrix();
    
        // Blue triangle with material
        this.scene.pushMatrix()
        this.scene.translate(Math.sqrt(2)-1,Math.sqrt(2)-1,0);
        this.scene.translate(0,0,0);
        this.scene.scale(2,2,2);
        this.scene.rotate(-135 * Math.PI/180,0,0,1);
        this.materials['blue'].apply();
        this.triangle.display();
        this.scene.popMatrix();

        
        // Purple triangle
        this.scene.pushMatrix()
        this.scene.translate(0,1,0);
        this.scene.rotate(180 * Math.PI/180,0,0,1);
        this.materials['purple'].apply();
        this.triangle.display();
        this.scene.popMatrix();
    
        // Red triangle
        this.scene.pushMatrix()
        this.scene.translate(-2,1,0);
        this.scene.rotate(-90 * Math.PI/180,0,0,1);
        this.materials['red'].apply();
        this.triangle.display();
        this.scene.popMatrix();
    
        // Orange triangle
        this.scene.pushMatrix()
        this.scene.translate(3*(Math.sqrt(2))-1,Math.sqrt(2)-1,0);
        this.scene.scale(2,2,2);
        this.scene.rotate(45 * Math.PI/180,0,0,1);
        this.materials['orange'].apply();
        this.triangle.display();
        this.scene.popMatrix();
    
        // Pink triangle
        this.scene.pushMatrix()
        this.scene.translate(-Math.sqrt(2),1.5+Math.sqrt(2),0);
        this.scene.scale(1.5,1.5,1.5);
        this.scene.rotate(180 * Math.PI/180,0,0,1);
        this.materials['pink'].apply();
        this.triangle.display();
        this.scene.popMatrix();
    
        // Paralelogram
        this.scene.pushMatrix()
        this.scene.translate(2*(Math.sqrt(2))-1,-1,0);
        this.scene.scale(Math.sqrt(2),Math.sqrt(2),Math.sqrt(2));
        this.materials['yellow'].apply();
        this.paralelogram.display();
        this.scene.popMatrix();

        
    }

    updateBuffers(){
        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
	
}