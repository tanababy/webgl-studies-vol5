import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import * as CANNON from 'cannon-es';
import CannonDebugger from 'cannon-es-debugger';
import { store } from './store/state.js';
import { Util } from './utils/util.js';
import { RAF } from './utils/RAF.js';
import { Shield } from './parts/shield.js';
import { Ground } from './parts/ground.js';
import { Bullet } from './parts/bullet.js';
import { FullScreen } from './parts/fullScreen.js';

class Main {
    constructor() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.aspect = this.width / this.height;

        this.init();
    }

    init() {
        this.setupTHREE();
        this.setupScene();
        this.setupCamera();
        this.setupControl();

        this.setupCannon();

        this.setupObjects();

        this.render();

        document.body.addEventListener('click', () => {
            this.bullet.spawnBullet();
        })
    }

    setupTHREE() {
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: false,
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        document.getElementById('app').appendChild(this.renderer.domElement);
        store.renderer = this.renderer;
    }

    setupScene() {
        this.scene = new THREE.Scene();
        store.scene = this.scene;
    }

    setupCamera() {
        this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.01, 100);
        this.camera.position.set(2, 2, 2)

        store.camera = this.camera;
    }

    setupControl() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    }

    setupCannon() {
        this.world = new CANNON.World({
            gravity: new CANNON.Vec3(0, 0, 0),
        });

        store.world = this.world;

        this.cannonDebugger = new CannonDebugger(this.scene, this.world, {
            // options...
          })
    }

    setupObjects() {
        if(store.shaderart) {
            new FullScreen();
        } else {
            // new Box();
            new Shield();
            new Ground();
            this.bullet = new Bullet();
        }
    }

    render(time) {
        requestAnimationFrame(this.render.bind(this));

        this.world.fixedStep();
        // this.cannonDebugger.update();

        if(!store.shaderart) this.renderer.render(this.scene, this.camera);
        RAF.instance.update(time);
    }
}

new Main();
