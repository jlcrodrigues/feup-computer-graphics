import { CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../lib/CGF.js";
import { MyTerrain } from "./shapes/MyTerrain.js";
import { MyPanorama } from "./MyPanorama.js";
import { MyBird } from "./bird/MyBird.js"
import { MyEgg} from "./nest/MyEgg.js"
import { MyNest } from "./nest/MyNest.js"

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
    
    let panoramaTexture = new CGFtexture(this, "./images/panorama4.jpg");
    this.panorama = new MyPanorama(this, panoramaTexture);

    this.bird = new MyBird(this,90,0,[35,-48,50]);

    // create a new array of eggs
    this.eggs = new Array(5); 
    this.spawnEggs();

    this.nest = new MyNest(this,[60,-54,80]);

    //Objects connected to MyInterface
    this.displayAxis = true;
    this.scaleFactor = 1;
    this.speedFactor = 1;

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
      vec3.fromValues(-20, -15, -10),
      vec3.fromValues(60, -30, 35)
    );
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
        
    if (keysPressed)
      console.log(text);
  }

  reset() {
    this.bird.reset();

    this.camera.position = vec3.fromValues(-20, -15, -10);
    this.camera.target = vec3.fromValues(60, -30, 35);

    this.spawnEggs();
  }

  spawnEggs() {
    for (let i = 0; i < 5; i++) {
      // generate random position x 60 a 100, y -54, z -20 a 50
      let x = Math.random() * (100 - 60) + 60;
      let y = -55;
      let z = Math.random() * (50 - (-20)) + (-20);
      this.eggs[i] = new MyEgg(this,0,0,[x,y,z]);
    }
  }


  // called periodically (as per setUpdatePeriod() in init())
	update(t){
    this.bird.time = this.bird.time + 0.01;
    this.bird.speedFactor = this.speedFactor;
    this.bird.updateVelocity();
    this.bird.updatePosition();
    this.bird.updateWingAngle();
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

    // Draw axis
    if (this.displayAxis) this.axis.display();

    // ---- BEGIN Primitive drawing section

    this.panorama.display(this.camera.position);
    this.terrain.display();
    this.bird.display();
    this.nest.display();
    for (let i = 0; i < 5; i++)
      this.eggs[i].display();

    // ---- END Primitive drawing section
  }
}
