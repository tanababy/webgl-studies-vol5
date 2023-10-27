import * as THREE from 'three';
import { store } from '../store/state.js';
import { Pointer } from '../events/pointer.js';
import { baseObject3D } from './baseObject3D.js';
import { Damper } from '../utils/damper.js';

export class Box extends baseObject3D {
    constructor() {
        super();

        // this.damper = new Damper({
        //     values: { x: 0, y: 0 },
        //     dampingFactor: 0.1,
        // });

        this.init();
    }

    async init() {
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        this.cube = new THREE.Mesh(geometry, material);
        this.cube.position.set(0, 0, 0);
        this.scene.add(this.cube);
    }

    update() {
        super.update();

        // this.damper.setTarget({ x: Pointer.instance.nx, y: Pointer.instance.ny });
        // this.damper.update();

        // const mouse3D = new THREE.Vector3(
        //     this.damper.getCurrentValues().x,
        //     this.damper.getCurrentValues().y,
        //     4,
        // );

        // this.cube.position.copy(mouse3D);
    }
}
