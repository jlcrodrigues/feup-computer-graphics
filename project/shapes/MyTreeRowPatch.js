import { MyTreePatch } from './MyTreePatch.js';

export class MyTreeRowPatch extends MyTreePatch {
	constructor(scene, x, y, z) {
		super(scene, 6, x, y, z);
        super.initTrees(this.getPos)
	}

    getPos(position, i) {
        let offset1 = Math.random() - 0.5;
        let offset2 = Math.random() - 0.5;
        return [
            position[0] + i * 10 + offset1 * 5,
            position[1],
            position[2]  + offset2 * 5]
    }

}
