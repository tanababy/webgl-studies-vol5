import * as THREE from 'three';
import { FullScreenQuad } from 'three/examples/jsm/postprocessing/Pass.js';
import vertex from '../shader/vertex.glsl?raw';
import fragment from '../shader/fragment.glsl?raw';
import { baseObject3D } from './baseObject3D.js';

export class FullScreen extends baseObject3D {
    constructor() {
        super();

        this.init();
    }

    async init() {
        this.material = new THREE.ShaderMaterial({
            uniforms: {
                uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
            },
            vertexShader: vertex,
            fragmentShader: fragment,
        });

        this.fsq = new FullScreenQuad(this.material);
    }

    update() {
        super.update();

        //https://scrapbox.io/0b5vr/Three.js:_FullScreenQuad
        //これ使うとrenderいらない
        this.fsq.render(this.renderer);
    }
}
