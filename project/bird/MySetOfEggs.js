import {CGFobject,CGFappearance,CGFtexture} from '../../lib/CGF.js';
import { MyBirdEgg } from './MyBirdEgg.js';

/**
 * MyNest
 * @constructor
 * @param scene - Reference to MyScene object
 * @param position - position of the nest
 */
export class MySetOfEggs extends CGFobject {
	constructor(scene,eggs,pos) {
		super(scene);
        this.eggs = new Array(eggs);
        this.numberEggs = eggs;
        this.pos = pos;
    }

    spawnEggs() {
        let minDistance = 20; // Minimum distance between eggs
        let numEggs = this.numberEggs;
        let eggsSpawned = 0;
        
        while (eggsSpawned < numEggs) {
          // Generate a random position for the egg
          let x = Math.random() * (100 - 70) + 70;
          let y = -59;
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
            this.eggs[eggsSpawned] = new MyBirdEgg(this.scene, 0, [x, y, z]);
            eggsSpawned++;
          }
        }
      }

    createEggsInNest(){
        for (let i = 0; i < this.numberEggs; i++){
            this.eggs[i] = new MyBirdEgg(this.scene,0,this.eggPosition(i),true);
        }
    }

    update(){
        for (let i = 0; i < this.numberEggs; i++){
            this.eggs[i].updateVelocity();
            this.eggs[i].updatePosition();
          }
    }


    display(nest){
        // display eggs
        for (var i = 0; i < this.numberEggs; i++){
            this.scene.pushMatrix();
            if (!nest){
              this.scene.translate(this.eggs[i].position[0],this.eggs[i].position[1],this.eggs[i].position[2]);
            }
            else{
              this.scene.translate(this.eggPosition(i)[0],this.eggPosition(i)[1],this.eggPosition(i)[2]);
            }
            this.scene.scale(this.scene.scaleFactor,this.scene.scaleFactor,this.scene.scaleFactor);
            this.eggs[i].display();
            this.scene.popMatrix();
        }

    }

    eggPosition(i){
        var offset = 1 * this.scene.scaleFactor;
        var y = 1.7 - (1 * this.scene.scaleFactor);
        switch(i){
            case 0:
                return [this.pos[0],this.pos[1]-y,this.pos[2]];
            case 1:
                return [this.pos[0]+offset,this.pos[1]-y,this.pos[2]+offset];
            case 2:
                return [this.pos[0]+offset,this.pos[1]-y,this.pos[2]-offset];
            case 3:
                return [this.pos[0]-offset,this.pos[1]-y,this.pos[2]+offset];
            case 4:
                return [this.pos[0]-offset,this.pos[1]-y,this.pos[2]-offset];
        }
    }


    updateBuffers(){
        // reinitialize buffers
        this.initBuffers();
    }
	
}