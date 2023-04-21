import { MyTreePatch } from './MyTreePatch.js';


export class MyTreeGroupPatch extends MyTreePatch {
	constructor(scene, x, y, z) {
		super(scene, 9, x, y, z);
        super.initTrees(this.getPos)
	}

    getPos(position, i) {
        return [
            position[0] + (i % 3) * 10 + super.getOffset(),
            position[1],
            position[2] + Math.floor(i / 3) * 10 + super.getOffset()]
    }
}
