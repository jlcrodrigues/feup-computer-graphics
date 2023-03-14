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

        //generic material
        this.materials = new CGFappearance(this.scene);
        this.materials.setAmbient(0.8, 0.8, 0.8, 1.0);
        this.materials.setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.materials.setSpecular(1.0, 1.0, 1.0, 1.0);
        this.materials.setShininess(10.0);
        this.materials.loadTexture('images/tangram.png');
        this.materials.setTextureWrap('REPEAT', 'REPEAT');
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
        this.materials.apply();
        this.diamond.display();
    
        // ---- END Primitive drawing section
    
        this.scene.popMatrix();
    
        // Blue triangle with material
        this.scene.pushMatrix()
        this.scene.translate(Math.sqrt(2)-1,Math.sqrt(2)-1,0);
        this.scene.translate(0,0,0);
        this.scene.scale(2,2,2);
        this.scene.rotate(-135 * Math.PI/180,0,0,1);
        this.materials.apply();
        //update My triangle texCoords
        const TexCoordsBlue = [
            1, 0,
            0, 0,
            0.5, 0.5
        ];
        this.triangle.texCoords = TexCoordsBlue;
        this.triangle.updateBuffers();
        this.triangle.display();
        this.scene.popMatrix();

        
        // Purple triangle
        this.scene.pushMatrix()
        this.scene.translate(0,1,0);
        this.scene.rotate(180 * Math.PI/180,0,0,1);
        this.materials.apply();
        //update My triangle texCoords
        const TexCoordsPurple = [
            0, 0,
            0, 0.5,
            0.25, 0.25
        ];
        this.triangle.texCoords = TexCoordsPurple;
        this.triangle.updateBuffers();
        this.triangle.display();
        this.scene.popMatrix();
    

        // Red triangle
        this.scene.pushMatrix()
        this.scene.translate(-2,1,0);
        this.scene.rotate(-90 * Math.PI/180,0,0,1);
        this.materials.apply();
        //update My triangle texCoords
        const TexCoordsRed = [
            0.25, 0.75,
            0.75, 0.75,
            0.5, 0.5
        ];
        this.triangle.texCoords = TexCoordsRed;
        this.triangle.updateBuffers();
        this.triangle.display();
        this.scene.popMatrix();
    
        // Orange triangle
        this.scene.pushMatrix()
        this.scene.translate(3*(Math.sqrt(2))-1,Math.sqrt(2)-1,0);
        this.scene.scale(2,2,2);
        this.scene.rotate(45 * Math.PI/180,0,0,1);
        this.materials.apply();
        //update My triangle texCoords
        const TexCoordsOrange = [
            1, 1,
            1, 0,
            0.5, 0.5
        ];
        this.triangle.texCoords = TexCoordsOrange;
        this.triangle.updateBuffers();
        this.triangle.display();
        this.scene.popMatrix();
    
        // Pink triangle
        this.scene.pushMatrix()
        this.scene.translate(-Math.sqrt(2),1.5+Math.sqrt(2),0);
        this.scene.scale(1.5,1.5,1.5);
        this.scene.rotate(180 * Math.PI/180,0,0,1);
        this.materials.apply();
        //update My triangle texCoords
        const TexCoordsPink = [
            0.5, 1,
            0, 0.5,
            0, 1
        ];
        this.triangle.texCoords = TexCoordsPink;
        this.triangle.updateBuffers();
        this.triangle.display();
        this.scene.popMatrix();
    
        // Paralelogram
        this.scene.pushMatrix()
        this.scene.translate(2*(Math.sqrt(2))-1,-1,0);
        this.scene.scale(Math.sqrt(2),Math.sqrt(2),Math.sqrt(2));
        this.materials.apply();
        this.paralelogram.display();
        this.scene.popMatrix();

        
    }

    updateBuffers(){
        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
	
}