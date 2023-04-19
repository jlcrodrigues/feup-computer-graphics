import {CGFobject} from '../../lib/CGF.js';
/**
* MyCone
* @constructor
 * @param scene - Reference to MyScene object
 * @param slices - number of divisions around the Y axis
 * @param stacks - number of divisions along the Y axis
*/
export class MyCone extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.initBuffers();
    }

    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];
        this.texCoords = [];
    
        var ang = 0;
        var alphaAng = 2 * Math.PI / this.slices;
    
        for (var i = 0; i < this.slices; i++) {
            var x = Math.cos(ang);
            var z = -Math.sin(ang);
            var u = 0.5 + 0.5 * x;
            var v = 0.5 + 0.5 * z;
            this.vertices.push(x, 0, z);
            this.normals.push(x, Math.cos(Math.PI / 4.0), z);
            this.texCoords.push(u, v);
            ang += alphaAng;
        }
    
        this.vertices.push(0, 1, 0);
        this.normals.push(0, 1, 0);
        this.texCoords.push(0.5, 0.5);
    
        for (var i = 0; i < this.slices; i++) {
            var j = (i + 1) % this.slices;
            this.indices.push(i, j, this.slices);
        }
    
        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }
    

    updateBuffers(complexity) {
        this.slices = 3 + Math.round(9 * complexity);

        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}



