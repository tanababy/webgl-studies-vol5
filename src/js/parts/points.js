import * as THREE from 'three';
import vertex from '../shader/vertex.glsl?raw'
import fragment from '../shader/fragment.glsl?raw'
import { store } from '../store/state.js';
import { baseObject3D } from './baseObject3D.js';

export class Points extends baseObject3D {
    constructor() {
        super();

        this.init();
    }

    async init() {
        const material = new THREE.ShaderMaterial({
            extensions: {
                derivatives: "#extension GL_OES_standard_derivatives : enable"
            },
            side: THREE.DoubleSide,
            uniforms: {
                time: {value: 0},
            },
            vertexShader: vertex,
            fragmentShader: fragment,
        });
        const geometry = new THREE.PlaneGeometry(1,1,1,1);
        const mesh = new THREE.Mesh(geometry, material);
        this.scene.add(mesh);
    }

    update() {
        super.update();
    }
}
