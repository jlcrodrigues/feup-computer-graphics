import { CGFobject, CGFscene, CGFcamera, CGFaxis, CGFappearance, CGFshader, CGFtexture } from "../../lib/CGF.js";
import { MyPlane } from "./MyPlane.js";

export class MyTerrain extends CGFobject {
	constructor(scene) {
		super(scene);
        this.scene = scene;
        this.plane = new MyPlane(this.scene, 30);
        this.shader = new CGFshader(this.scene.gl, "./shaders/terrain.vert", "./shaders/terrain.frag");
		this.shader.setUniformsValues({ uSampler2: 2 });
		this.shader.setUniformsValues({ uSampler3: 3 });

        this.heightMap = new CGFtexture(this.scene, "./images/heightmap.jpg");
        this.colorMap = new CGFtexture(this.scene, "./images/altimetry.png");
        this.texture = new CGFtexture(this.scene, "./images/terrain.jpg");
        this.terrainMaterial = new CGFappearance(this.scene);
        this.terrainMaterial.setTexture(this.texture);
        this.terrainMaterial.setTextureWrap('REPEAT', 'REPEAT');
    }

    display() {
		this.shader.setUniformsValues({ normScale: this.scene.scaleFactor });
        this.scene.setActiveShader(this.shader);
        this.scene.pushMatrix();
        this.terrainMaterial.apply()
        this.heightMap.bind(2)
        this.colorMap.bind(3)

        this.scene.translate(0,-100,0);
        this.scene.scale(400,400,400);
        this.scene.rotate(-Math.PI/2.0,1,0,0);
        this.plane.display();
        this.scene.popMatrix();

		// restore default shader (will be needed for drawing the axis in next frame)
		this.scene.setActiveShader(this.scene.defaultShader);
    }
}
