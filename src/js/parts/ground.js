import * as THREE from 'three';
import { store } from '../store/state.js';
import { baseObject3D } from './baseObject3D.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import vertexShader from '../shader/ground/vertex.glsl?raw';
import fragmentShader from '../shader/ground/fragment.glsl?raw';

export class Ground extends baseObject3D {
    constructor() {
        super();

        this.init();
    }

    async init() {
        const geometry = new THREE.PlaneGeometry(50, 50, 1, 1);
        this.material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
        })
        this.plane = new THREE.Mesh(geometry, this.material);
        this.plane.rotation.x = -Math.PI / 2;

        this.scene.add(this.plane)
    }

    update() {
        super.update();
    }
}
