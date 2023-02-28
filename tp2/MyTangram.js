import {CGFobject} from '../lib/CGF.js';
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
	}

    display(){

        this.scene.diamond = new MyDiamond(this.scene);
        this.scene.triangle = new MyTriangle(this.scene);
        this.scene.paralelogram = new MyParalelogram(this.scene);

        var mDiamond =[
            1, 0, 0, 0,  
            0, 1, 0, 0,   
            0, 0, 1, 0,    
            -1, 0, 0, 1  
        ];
    
        this.scene.pushMatrix()
        this.scene.multMatrix(mDiamond);
    
        // ---- BEGIN Primitive drawing section
    
        this.scene.diamond.display();
    
        // ---- END Primitive drawing section
    
        this.scene.popMatrix();
    
        // Blue triangle
        this.scene.pushMatrix()
        this.scene.translate(Math.sqrt(2)-1,Math.sqrt(2)-1,0);
        this.scene.translate(0,0,0);
        this.scene.scale(2,2,2);
        this.scene.rotate(-135 * Math.PI/180,0,0,1);
        this.scene.triangle.display();
        this.scene.popMatrix();
    
        // Purple triangle
        this.scene.pushMatrix()
        this.scene.translate(0,1,0);
        this.scene.rotate(180 * Math.PI/180,0,0,1);
        this.scene.triangle.display();
        this.scene.popMatrix();
    
        // Red triangle
        this.scene.pushMatrix()
        this.scene.translate(-2,1,0);
        this.scene.rotate(-90 * Math.PI/180,0,0,1);
        this.scene.triangle.display();
        this.scene.popMatrix();
    
        // Orange triangle
        this.scene.pushMatrix()
        this.scene.translate(3*(Math.sqrt(2))-1,Math.sqrt(2)-1,0);
        this.scene.scale(2,2,2);
        this.scene.rotate(45 * Math.PI/180,0,0,1);
        this.scene.triangle.display();
        this.scene.popMatrix();
    
        // Pink triangle
        this.scene.pushMatrix()
        this.scene.translate(-Math.sqrt(2),1.5+Math.sqrt(2),0);
        this.scene.scale(1.5,1.5,1.5);
        this.scene.rotate(180 * Math.PI/180,0,0,1);
        this.scene.triangle.display();
        this.scene.popMatrix();
    
        // Paralelogram
        this.scene.pushMatrix()
        this.scene.translate(2*(Math.sqrt(2))-1,-1,0);
        this.scene.scale(Math.sqrt(2),Math.sqrt(2),Math.sqrt(2));
        this.scene.paralelogram.display();
        this.scene.popMatrix();
    }
	
}