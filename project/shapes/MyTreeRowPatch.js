import { CGFobject, CGFtexture, CGFappearance } from '../../lib/CGF.js';
import { MyBillboard } from './MyBillboard.js';


export class MyTreeRowPatch extends CGFobject {
	constructor(scene, x, y, z) {
		super(scene);
        this.position = [x, y, z];
        this.initTrees()

	}

    initTrees() {
        this.trees = []
        for (let i = 0; i < 6; i++) {
            let texture = new CGFtexture(this.scene, "./images/billboardtree.png");
            let size = Math.random() * 4 + 5
            let offset = Math.random() - 0.5;
            let coords = [
                this.position[0] + i * 10 + offset * 2,
                this.position[1],
                this.position[2]  + offset * 2]

            this.trees.push(new MyBillboard(this.scene, size, texture, ...coords));
        }
    }

    display() {
        for (let tree of this.trees) {
            tree.display();
        }
    }
}
