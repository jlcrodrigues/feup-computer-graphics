import {CGFobject,CGFappearance,CGFtexture} from '../../lib/CGF.js';
import { MyTreeGroupPatch } from './MyTreeGroupPatch.js';
import { MyTreeRowPatch } from './MyTreeRowPatch.js';

/**
 * MyNest
 * @constructor
 * @param scene - Reference to MyScene object
 * @param position - position of the nest
 */
export class MyForest extends CGFobject {
	constructor(scene) {
		super(scene);
        this.forest = [];
        this.spawnTrees(10, -50, 70, 40, 70);
        this.spawnTrees(2, 75, 90, -20, -50)
    }

    spawnTrees(count, minX, maxX, minZ, maxZ) {
        let minDistance = 20; // Minimum distance between patches
        let treesSpawned = 0;
        
        while (treesSpawned < count) {

          // Generate a random position for the patch
          let intervalX = [minX, maxX]
          let intervalZ = [minZ, maxZ]
          let x = Math.random() * (intervalX[1] - intervalX[0]) + (intervalX[0]);
          let y = -53;
          let z = Math.random() * (intervalZ[1] - intervalZ[0]) + (intervalZ[0]);
          
          // Check the distance to all previously spawned patches
          if (Math.random() > 0.2)
            this.forest.push(new MyTreeGroupPatch(this.scene, ...[x, y, z]));
          else
            this.forest.push(new MyTreeRowPatch(this.scene, ...[x, y, z]));
          treesSpawned++;
        }
      }

    display(){
      for (var i = 0; i < this.forest.length; i++){
        this.forest[i].display();
      }
    }

    updateBuffers(){
        // reinitialize buffers
        this.initBuffers();
    }
	
}