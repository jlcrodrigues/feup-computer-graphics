import {CGFobject,CGFappearance,CGFtexture} from '../../lib/CGF.js';
import { MyBirdEgg } from './MyBirdEgg.js';

/**
 * MyNest
 * @constructor
 * @param scene - Reference to MyScene object
 * @param position - position of the nest
 */
export class MyNest extends CGFobject {
	constructor(scene,eggs) {
		super(scene);
        this.eggs = new Array(eggs);
        this.numberEggs = eggs;
    }

    spawnEggs() {
        let minDistance = 20; // Minimum distance between eggs
        let numEggs = 5;
        let eggsSpawned = 0;
        
        while (eggsSpawned < numEggs) {
          // Generate a random position for the egg
          let x = Math.random() * (100 - 60) + 60;
          let y = -55;
          let z = Math.random() * (50 - (-20)) + (-20);
          
          // Check the distance to all previously spawned eggs
          let tooClose = false;
          for (let i = 0; i < eggsSpawned; i++) {
            let distance = Math.sqrt(
              Math.pow(x - this.eggs[i].position[0], 2) +
              Math.pow(y - this.eggs[i].position[1], 2) +
              Math.pow(z - this.eggs[i].position[2], 2)
            );
            if (distance < minDistance) {
              tooClose = true;
              break;
            }
          }
          
          // If the egg is far enough away, add it to the array
          if (!tooClose) {
            this.eggs[eggsSpawned] = new MyBirdEgg(this, 0, [x, y, z]);
            eggsSpawned++;
          }
        }
      }

    createEggsInNest(position){
        var x = position[0];
        var y = position[1];
        var z = position[2];
        var offset = 1;
        this.eggs[0] = new MyBirdEgg(this.scene,0,[x,y,z],true);
        this.eggs[1] = new MyBirdEgg(this.scene,0,[x+offset,y,z+offset],true);
        this.eggs[2] = new MyBirdEgg(this.scene,0,[x+offset,y,z-offset],true);
        this.eggs[3] = new MyBirdEgg(this.scene,0,[x-offset,y,z+offset],true);
        this.eggs[4] = new MyBirdEgg(this.scene,0,[x-offset,y,z-offset],true);
    }

    update(){
        for (let i = 0; i < numberEggs; i++){
            this.eggs[i].updateVelocity();
            this.eggs[i].updatePosition();
          }
    }


    display(){
        // display eggs
        for (var i = 0; i < this.numberEggs; i++){
            this.pushMatrix();
            this.translate(this.eggs[i].position[0],this.eggs[i].position[1],this.eggs[i].position[2]);
            this.scale(this.scene.scaleFactor,this.scene.scaleFactor,this.scene.scaleFactor);
            this.eggs[i].display();
            this.popMatrix();
        }

    }

    updateBuffers(){
        // reinitialize buffers
        this.initBuffers();
    }
	
}