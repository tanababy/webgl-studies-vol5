import * as THREE from 'three';
import * as CANNON from 'cannon-es'
import { store } from '../store/state.js';
import { baseObject3D } from './baseObject3D.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import vertexShader from '../shader/shield/vertex.glsl?raw';
import fragmentShader from '../shader/shield/fragment.glsl?raw';
import { Pane } from 'tweakpane';
import { gsap } from 'gsap';


export class Shield extends baseObject3D {
    constructor() {
        super();

        this.PARAMS = {
            size: 0,
            thickness: 0.7,
        };

        this.init();
    }

    async init() {
        const shieldModel = await new GLTFLoader().loadAsync('../model/shield.glb');
        const noiseTexture = await new THREE.TextureLoader().loadAsync('../../image/perlin-noise.png');
        noiseTexture.wrapS = THREE.RepeatWrapping;
        noiseTexture.wrapT = THREE.RepeatWrapping;
        this.material = new THREE.ShaderMaterial({
            vertexShader,
            fragmentShader,
            transparent: true,
            forceSinglePass: false,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending,
            uniforms: {
                u_HitPointColorA: { value: new THREE.Vector4(0, 168 / 255, 245 / 255, 0.04) },
                u_HitPointColorB: { value: new THREE.Vector4(53 / 255, 175 / 255, 90 / 255, 0.8) },
                u_HitPosition: { value: new THREE.Vector3(0, 0, 0) },
                t_Noise: { value: noiseTexture },
                u_Time: { value: 0 },
                u_Size: { value: this.PARAMS.size },
                u_Thickness: { value: this.PARAMS.thickness },
            }
        })
        this.shield = shieldModel.scene.getObjectByName('Shield');
        this.shield.material = this.material;

        this.scene.add(shieldModel.scene)

        this.setPhysics();

        this.tl = gsap.timeline({
            paused: true,
            onComplete: () => {
                // this.material.uniforms.u_Size.value = this.PARAMS.size;
                // this.material.uniforms.u_Thickness.value = this.PARAMS.thickness;
            }
        });

        this.tl
            .addLabel("start")
            .to(this.material.uniforms.u_Size, {
                value: 1,
                duration: 0.35,
            }, "start")
            .to(this.material.uniforms.u_Thickness, {
                value: 0,
                duration: 0.35,
            }, "start")
        // this.debug()
    }

    debug() {
        const pane = new Pane();
        pane.addBinding(this.PARAMS, 'size', {
            min: 0,
            max: 1,
        }).on('change', (e) => {
            this.material.uniforms.u_Size.value = e.value;
        });
        pane.addBinding(this.PARAMS, 'thickness', {
            min: 0,
            max: 1,
        }).on('change', (e) => {
            this.material.uniforms.u_Thickness.value = e.value;
        });

    }

    setPhysics() {
        this.shield.geometry.computeBoundingSphere();

        const sphereBody = new CANNON.Body({
            type: CANNON.Body.STATIC,
            shape: new CANNON.Sphere(this.shield.geometry.boundingSphere.radius)
        })

        this.world.addBody(sphereBody);

        sphereBody.addEventListener('collide', this.onCollide.bind(this));
    }

    onCollide(e) {

        const contactPos = e.contact.ni;

        this.tl.restart();

        this.material.uniforms.u_HitPosition.value = new THREE.Vector3(contactPos.x, contactPos.y, contactPos.z);

        window.dispatchEvent(new CustomEvent("collide", { detail: e }));
    }

    update() {
        super.update();

        if(this.material) this.material.uniforms.u_Time.value += 0.01;
    }
}
