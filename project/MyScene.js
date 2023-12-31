import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyTerrain } from "./shapes/MyTerrain.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyBird } from "./bird/MyBird.js"
import { MyNest } from "./bird/MyNest.js"
import { MySetOfEggs } from "./bird/MySetOfEggs.js"
import { MyForest } from "./shapes/MyForest.js";

/**
 * MyScenew
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

    // Labels and ID's for camera selection on MyInterface
    this.cameraIDs = { 'Far': "far" , 'Close': "close", 'Bird Beak': "beak", 'Behind Bird': "bird", 'Free Roam': "free"};

    //Objects connected to MyInterface
    this.scaleFactor = 1;
    this.speedFactor = 1;
    this.selectedCamera = "far";
    
    let panoramaTexture = new CGFtexture(this, "./images/panorama4.jpg");
    this.panorama = new MyPanorama(this, panoramaTexture);

    this.forest = new MyForest(this);

    this.bird = new MyBird(this,90,0,[35,-48,50]);

    this.setEggs = new MySetOfEggs(this,5,[0,0,0]);
    this.setEggs.spawnEggs();

    this.nest = new MyNest(this,[110,-54,30]);

    this.enableTextures(true);

    this.appearance = new CGFappearance(this);

    //Initialize scene objects
    this.axis = new CGFaxis(this);
    this.terrain = new MyTerrain(this);
    this.appearance.setTextureWrap('REPEAT', 'REPEAT');

    // set the scene update period 
		// (to invoke the update() method every 10ms or as close as possible to that )
		this.setUpdatePeriod(10);

  }

  initLights() {
    this.lights[0].setPosition(15, 0, 5, 1);
    this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
    this.lights[0].enable();
    this.lights[0].update();
  }
  initCameras() {
    this.camera = new CGFcamera(
      0.9,
      0.1,
      1000,
      vec3.fromValues(-7, -18, 94),
      vec3.fromValues(60, -43, 35)
    );
  }

  updateCameras() {
    let x,y,z;
    let targetx,targety,targetz;
    switch (this.selectedCamera) {
      case "far":
        this.camera.setTarget(vec3.fromValues(this.bird.position[0],this.bird.position[1],this.bird.position[2]));
        this.camera.setPosition(vec3.fromValues(-7, -18, 94));
        break;
      case "close":
        this.camera.setTarget(vec3.fromValues(this.bird.position[0],this.bird.position[1],this.bird.position[2]));
        this.camera.setPosition(vec3.fromValues(this.bird.position[0]- 8 - (3 * this.scaleFactor),this.bird.position[1]+ 8 + (3 * this.scaleFactor),this.bird.position[2] + 8 + (3 * this.scaleFactor)))
        break;
      case "beak":
        // point in front of the bird
        targetx = this.bird.position[0] + 15 * Math.sin(this.bird.orientation * Math.PI / 180);
        targety = this.bird.position[1] - 5;
        targetz = this.bird.position[2] + 15 * Math.cos(this.bird.orientation * Math.PI / 180);

        x = this.bird.position[0] + 3 * Math.sin(this.bird.orientation * Math.PI / 180);
        y = this.bird.position[1] -2.5+(1.5*this.scaleFactor);
        z = this.bird.position[2] + 3 * Math.cos(this.bird.orientation * Math.PI / 180);
        this.camera.setPosition(vec3.fromValues(x,y,z));
        this.camera.setTarget(vec3.fromValues(targetx,targety,targetz));
        break;
      case "bird":
        x = this.bird.position[0] - 10 * Math.sin(this.bird.orientation * Math.PI / 180);
        y = this.bird.position[1] + (4 * this.scaleFactor);
        z = this.bird.position[2] - 10 * Math.cos(this.bird.orientation * Math.PI / 180);

        targetx = this.bird.position[0] + 15 * Math.sin(this.bird.orientation * Math.PI / 180);
        targety = this.bird.position[1] - 5;
        targetz = this.bird.position[2] + 15 * Math.cos(this.bird.orientation * Math.PI / 180);
        this.camera.setPosition(vec3.fromValues(x,y,z));
        this.camera.setTarget(vec3.fromValues(targetx,targety,targetz));
        break;
    }
  }

  setDefaultAppearance() {
    this.setAmbient(0.2, 0.4, 0.8, 1.0);
    this.setDiffuse(0.2, 0.4, 0.8, 1.0);
    this.setSpecular(0.2, 0.4, 0.8, 1.0);
    this.setShininess(10.0);
  }

  checkKeys() {
    var text="Keys pressed: ";
    var keysPressed=false;
    // Check for key codes e.g. in https://keycode.info/
    if (this.gui.isKeyPressed("KeyW"))
        this.bird.accelerate(0.015);           

    if (this.gui.isKeyPressed("KeyS"))
        this.bird.accelerate(-0.015);

    if (this.gui.isKeyPressed("KeyA"))
        this.bird.turn(2.5);
    else if (this.bird.tiltAngle < 0)
        this.bird.tilt(2.5);

    if (this.gui.isKeyPressed("KeyD"))
        this.bird.turn(-2.5);
    else if (this.bird.tiltAngle > 0)
        this.bird.tilt(-2.5);
        
    if (this.gui.isKeyPressed("KeyR"))
        this.reset(); 
    
    if (this.gui.isKeyPressed("KeyP")){
      if (!(this.bird.movingDown || this.bird.movingUp || !this.bird.egg.disabled))
        this.bird.movingDown = true;
    }

    if (this.gui.isKeyPressed("KeyO")){
      if (!(this.bird.movingDown || this.bird.movingUp || this.bird.egg.disabled))
        this.bird.dropEgg();
    }

    if (keysPressed)
      console.log(text);
  }

  reset() {
    this.bird.reset();
    this.nest.reset();
    this.setEggs.spawnEggs();
    this.camera.position = vec3.fromValues(-7, -18, 94);
    this.camera.target = vec3.fromValues(60, -43, 35);
    this.forest = new MyForest(this);
  }

  // called periodically (as per setUpdatePeriod() in init())
	update(t){
    this.bird.time = this.bird.time + 0.01;
    this.bird.speedFactor = this.speedFactor;
    this.bird.updateVelocity();
    this.bird.updatePosition();
    this.bird.updateWingAngle();
    this.setEggs.update();
    this.updateCameras();
    this.checkKeys();
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

    // ---- BEGIN Primitive drawing section

    this.panorama.display(this.camera.position);
    this.terrain.display();
    this.bird.display();
    this.nest.display();
    this.setEggs.display(false);

    this.forest.display();

    // ---- END Primitive drawing section
  }
}
