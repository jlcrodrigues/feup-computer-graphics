import { CGFobject, CGFtexture, CGFappearance } from '../../lib/CGF.js';
import { MyUnitCube } from './MyUnitCube.js';


export class MyBillboard extends CGFobject {
	constructor(scene, x, y, z) {
		super(scene);
        this.position = [x, y, z];

        this.cube = new MyUnitCube(this.scene, true);

        this.texture = new CGFtexture(this.scene, "./images/billboardtree.png");
        this.material = new CGFappearance(this.scene);
        this.material.setTexture(this.texture)
        this.material.setTextureWrap('REPEAT', 'REPEAT');
	}

    display() {
        let cubeNormal = vec3.fromValues(0, 0, 0.5);
        let cameraVector = vec3.create();
        vec3.subtract(cameraVector, this.position, this.scene.camera.position);
        cameraVector[1] = 0;

        let angle = Math.acos(vec3.dot(cameraVector, cubeNormal) / (vec3.length(cameraVector) * vec3.length(cubeNormal)));
        let cross = vec3.create();
        vec3.cross(cross, cameraVector, cubeNormal);

        this.scene.pushMatrix();
        this.material.apply();
        this.scene.translate(...this.position);
        this.scene.scale(10, 10, 10);
        this.scene.rotate(-angle, ...cross);
        this.cube.display();
        this.scene.popMatrix();


    }
}
