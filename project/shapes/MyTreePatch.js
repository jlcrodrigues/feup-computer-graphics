import { CGFobject, CGFtexture, CGFappearance } from '../../lib/CGF.js';
import { MyBillboard } from './MyBillboard.js';


export class MyTreePatch extends CGFobject {
	constructor(scene, count, x, y, z) {
		super(scene);
        this.position = [x, y, z];
        this.count = count
	}

    initTrees(getPos) {
        this.trees = []
        for (let i = 0; i < this.count; i++) {
            let size = Math.random() * 4 + 5
            let textureIndex = Math.floor(Math.random() * 3);
            let texture = new CGFtexture(this.scene, `./images/trees/${textureIndex}.png`);
            let coords = getPos(this.position, i)

            this.trees.push(new MyBillboard(this.scene, size, texture, ...coords));
        }
    }

    getOffset() {
        return (Math.random() - 0.5) * 5;
    }

    display() {
        for (let tree of this.trees) {
            tree.display();
        }
    }
}
