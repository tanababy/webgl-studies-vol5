import * as THREE from 'three';
import { RAF } from '../utils/RAF.js';
import { store } from '../store/state.js';

export class baseObject3D extends THREE.Object3D {
    constructor() {
        super();

        const { scene, camera, renderer, world } = store;

        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.world = world;

        this.update = this.update.bind(this);
        RAF.instance.add(this.update);
    }

    update() {}
}
