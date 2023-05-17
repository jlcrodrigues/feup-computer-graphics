import {CGFobject,CGFappearance, CGFtexture} from '../../lib/CGF.js';
import { MyBirdHead } from './MyBirdHead.js';
import { MyBirdBody } from './MyBirdBody.js';
import { MyBirdWing } from './MyBirdWing.js';
import { MyBirdEgg } from './MyBirdEgg.js';

/**
 * MyBird
 * @constructor
 * @param scene - Reference to MyScene object
 */
export class MyBird extends CGFobject {
	constructor(scene,orientation,velocity,position) {
		super(scene);
        this.birdHead = new MyBirdHead(this.scene);
        this.birdBody = new MyBirdBody(this.scene);
        this.leftBirdWing = new MyBirdWing(this.scene);
        this.rightBirdWing = new MyBirdWing(this.scene);
        this.egg = new MyBirdEgg(this.scene,0,[position[0],position[1],position[2]],true);
        this.time = 0;
        this.orientation = orientation; //in degrees 0 means pointing to the positive z axis
        this.rawVelocity = velocity;
        this.position = position;
        this.tiltAngle = 0;
        this.speedFactor = 1;
        this.velocity = this.rawVelocity * this.speedFactor;
        this.fowardAngle = this.velocity * 30 * Math.PI/180;
        this.wingAngle1 = 0;
        this.wingAngle2 = 0;
        this.wingUp1 = true;
        this.wingUp2 = true;
        this.movingDown = false;
        this.movingUp = false;
        
        this.initMaterials();
    }

    initMaterials() {
        //generic material
        this.materials = new CGFappearance(this.scene);
        this.materials.setAmbient(0.8, 0.8, 0.8, 1.0);
        this.materials.setDiffuse(0.8, 0.8, 0.8, 1.0);
        this.materials.setSpecular(1.0, 1.0, 1.0, 1.0);
        this.materials.setShininess(10.0);
	}

    updatePosition(){
        this.position[2] += this.velocity * 0.2 * Math.cos(this.orientation * Math.PI/180) * this.scene.scaleFactor;
        this.position[0] += this.velocity * 0.2 * Math.sin(this.orientation * Math.PI/180) * this.scene.scaleFactor;
        if (this.movingDown){
            this.position[1] -= 0.14 * this.scene.speedFactor;
            if (this.position[1] <= -55){
                this.catchEgg();
                this.position[1] = -55;
                this.movingDown = false;
                this.movingUp = true;
            }
        }
        else if (this.movingUp){
            this.position[1] += 0.14 * this.scene.speedFactor;
            if (this.position[1] >= -48){
                this.position[1] = -48;
                this.movingUp = false;
            }
        }

    }

    catchEgg(){
        // see all eggs and check if they are 2 unit apart from the bird 
        for (let i = 0; i < this.scene.setEggs.numberEggs; i++){
            if (this.scene.setEggs.eggs[i].disabled){
                continue;
            }
            var d = Math.sqrt(Math.pow(this.scene.setEggs.eggs[i].position[0] - this.position[0],2) + Math.pow(this.scene.setEggs.eggs[i].position[2] - this.position[2],2));
            if (d <= 4){
                this.scene.setEggs.eggs[i].disable();
                this.egg.enable();
                break;
            }
        }
    }

    dropEgg(){
        this.egg.disable();
        // search the first egg that is disabled and enable it
        for (let i = 0; i < this.scene.setEggs.numberEggs; i++){
            if (this.scene.setEggs.eggs[i].disabled){
                this.scene.setEggs.eggs[i].enable();
                this.scene.setEggs.eggs[i].position = [this.position[0],this.position[1]-1.3,this.position[2]-1.7];
                this.scene.setEggs.eggs[i].rawVelocity = this.rawVelocity;
                this.scene.setEggs.eggs[i].orientation = this.orientation;
                this.scene.setEggs.eggs[i].falling = true;
                break;
            }
        }
    }

    updateVelocity(){
        if (this.rawVelocity-0.005 <= 0){
            this.rawVelocity = 0;
        }
        else {
            this.rawVelocity -= 0.005;
        } 
        this.velocity = this.rawVelocity * this.speedFactor;
        this.fowardAngle = this.rawVelocity * 30 * Math.PI/180;
    }

    updateWingAngle(){

        if (this.wingUp1){
            this.wingAngle1 += 0.015 * 140*Math.PI/180 * (this.velocity + 1);
            if(this.wingAngle1 >= 35*Math.PI/180){
                this.wingAngle1 = 35*Math.PI/180;
                this.wingUp1 = false;
            }
        }
        else{
            this.wingAngle1 -= 0.015 * 140*Math.PI/180* (this.velocity + 1);
            if(this.wingAngle1 <= -35*Math.PI/180){
                this.wingAngle1 = -35*Math.PI/180;
                this.wingUp1 = true;
            }
        }
        if (this.wingUp2){
            this.wingAngle2 += 0.015 * 280*Math.PI/180 * (this.velocity + 1);
            if(this.wingAngle2 >= 70*Math.PI/180){
                this.wingAngle2 = 70*Math.PI/180;
                this.wingUp2 = false;
            }
        }
        else{
            this.wingAngle2 -= 0.015 * 280*Math.PI/180* (this.velocity + 1);
            if(this.wingAngle2 <= -70*Math.PI/180){
                this.wingAngle2 = -70*Math.PI/180;
                this.wingUp2 = true;
            }
        }
    }

    accelerate(v){
        if(this.rawVelocity+v > 0 && this.rawVelocity+v < 1){
            this.rawVelocity += v;   
        }
        else if (this.rawVelocity+v <= 0){
            this.rawVelocity = 0;
        }
        else {
            this.rawVelocity = 1;
        }        
    }

    turn(v){
        this.orientation += v;
        this.tilt(-v);

    }

    tilt(a){
        // cap tilt angle to 60 degrees
        this.tiltAngle += a;
        if(this.tiltAngle > 60){
            this.tiltAngle = 60;
        }
        else if(this.tiltAngle < -60){
            this.tiltAngle = -60;
        }
    }

    reset(){
        this.orientation = 90;
        this.rawVelocity = 0;
        this.tiltAngle  = 0;
        this.wingAngle1 = 0;
        this.wingAngle2 = 0;
        this.wingUp1 = true;
        this.wingUp2 = true;
        this.position = [35,-48,50];
        this.movingDown = false;
        this.movingUp = false;
        this.egg.disable();
    }

    display(){

        this.scene.pushMatrix();
        this.scene.translate(this.position[0],this.position[1]-2+(2*this.scene.scaleFactor),this.position[2]);
        this.scene.scale(0.9*this.scene.scaleFactor,0.9*this.scene.scaleFactor,0.9*this.scene.scaleFactor);
        this.scene.rotate(this.orientation * Math.PI/180,0,1,0);
        this.scene.rotate(this.tiltAngle * Math.PI/180,0,0,1);
        this.scene.rotate(this.fowardAngle,1,0,0);
        this.scene.rotate(- 50 * Math.PI/180,1,0,0);

        //head
        this.scene.pushMatrix();
        this.scene.translate(0,-Math.sin(this.wingAngle2)*0.3,0);
        this.scene.translate(0,-0.15,0);
        this.scene.scale(0.4,0.4,0.3);
        this.scene.rotate(40*Math.PI/180 - this.fowardAngle,1,0,0)
        this.birdHead.display();
        this.scene.popMatrix();

        //body
        this.scene.pushMatrix();
        this.scene.translate(0,-Math.sin(this.wingAngle2)*0.3,0);
        this.scene.translate(0,0,-1.15);
        this.birdBody.display();
        this.scene.popMatrix();

        // left wing
        this.scene.pushMatrix();
        this.scene.translate(0,-Math.sin(this.wingAngle2)*0.3,0);
        this.scene.translate(0.6,-0.2,-1.1);
        this.leftBirdWing.display(this.wingAngle1,this.wingAngle2);
        this.scene.popMatrix();

        // right wing
        this.scene.pushMatrix();
        this.scene.translate(0,-Math.sin(this.wingAngle2)*0.3,0);
        this.scene.translate(-0.6,-0.2,-1.1);
        this.scene.rotate(Math.PI,0,1,0);
        this.rightBirdWing.display(this.wingAngle1,this.wingAngle2);
        this.scene.popMatrix();

        // egg
        this.scene.pushMatrix();
        this.scene.translate(0,-Math.sin(this.wingAngle2)*0.3,0);
        this.scene.translate(0,-1.3,-1.7);
        this.scene.rotate(55*Math.PI/180,1,0,0)
        this.egg.display();
        this.scene.popMatrix();

        this.scene.popMatrix();

        

    }

    updateBuffers(){
        // reinitialize buffers
        this.initBuffers();
    }
	
}