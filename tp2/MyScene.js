import { CGFscene, CGFcamera, CGFaxis } from "../lib/CGF.js";
import { MyDiamond } from "./MyDiamond.js";
import { MyTriangle } from "./MyTriangle.js";
import { MyParalelogram} from "./MyParalelogram.js";

/**
 * MyScene
 * @constructor
 */
export class MyScene extends CGFscene {
  constructor() {
    super();
  }
  init(application) {
    super.init(application);
    
    this.initCameras();
    this.initLights();

    //Background color
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

    this.gl.clearDepth(100.0);
    this.gl.enable(this.gl.DEPTH_TEST);
    this.gl.enable(this.gl.CULL_FACE);
    this.gl.depthFunc(this.gl.LEQUAL);

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.diamond = new MyDiamond(this);
    this.triangle = new MyTriangle(this);
    this.trianglePurple = new MyTriangle(this);
    this.triangleRed = new MyTriangle(this);
    this.triangleOrange = new MyTriangle(this);
    this.paralelogram = new MyParalelogram(this);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.displayDiamond = true;
  }
  initLights() {
    this.lights[0].setPosition(15, 2, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      0.4,
      0.1,
      500,
      vec3.fromValues(15, 15, 15),
      vec3.fromValues(0, 0, 0)
    );
  }
  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }
  display() {
    // ---- BEGIN Background, camera and axis setup
    // Clear image and depth buffer everytime we update the scene
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    // Initialize Model-View matrix as identity (no transformation
    this.updateProjectionMatrix();
    this.loadIdentity();
    // Apply transformations corresponding to the camera position relative to the origin
    this.applyViewMatrix();

    // Draw axis
    if (this.displayAxis) this.axis.display();

    this.setDefaultAppearance();

    var sca = [
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      this.scaleFactor,
      0.0,
      0.0,
      0.0,
      0.0,
      1.0,
    ];

    var mDiamond =[
        1, 0, 0, 0,  
        0, 1, 0, 0,   
        0, 0, 1, 0,    
        -1, 0, 0, 1  
    ];

    this.pushMatrix()
    this.multMatrix(mDiamond);

    // ---- BEGIN Primitive drawing section

    this.diamond.display();

    // ---- END Primitive drawing section

    this.popMatrix();

    // Blue triangle
    this.pushMatrix()
    this.translate(Math.sqrt(2)-1,Math.sqrt(2)-1,0);
    this.translate(0,0,0);
    this.scale(2,2,2);
    this.rotate(-135 * Math.PI/180,0,0,1);
    this.triangle.display();
    this.popMatrix();

    // Purple triangle
    this.pushMatrix()
    this.translate(0,1,0);
    this.rotate(180 * Math.PI/180,0,0,1);
    this.triangle.display();
    this.popMatrix();

    // Red triangle
    this.pushMatrix()
    this.translate(-2,1,0);
    this.rotate(-90 * Math.PI/180,0,0,1);
    this.triangle.display();
    this.popMatrix();

    // Orange triangle
    this.pushMatrix()
    this.translate(3*(Math.sqrt(2))-1,Math.sqrt(2)-1,0);
    this.scale(2,2,2);
    this.rotate(45 * Math.PI/180,0,0,1);
    this.triangle.display();
    this.popMatrix();

    // Pink triangle
    this.pushMatrix()
    this.translate(-Math.sqrt(2),1.5+Math.sqrt(2),0);
    this.scale(1.5,1.5,1.5);
    this.rotate(180 * Math.PI/180,0,0,1);
    this.triangle.display();
    this.popMatrix();

    // Paralelogram
    this.pushMatrix()
    this.translate(2*(Math.sqrt(2))-1,-1,0);
    this.paralelogram.display();
    this.popMatrix();

  }
}
