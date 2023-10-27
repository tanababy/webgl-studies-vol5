import * as THREE from 'three';
import * as CANNON from 'cannon-es'
import { store } from '../store/state.js';
import { baseObject3D } from './baseObject3D.js';
import vertexShader from '../shader/ground/vertex.glsl?raw';
import fragmentShader from '../shader/ground/fragment.glsl?raw';

export class Bullet extends baseObject3D {
    constructor() {
        super();

        this.init();
    }

    async init() {
        this.geometry = new THREE.CylinderGeometry( 0.025, 0.025, 0.35, 32 );
        this.material = new THREE.MeshBasicMaterial( {color: 0x0000ff} );

        window.addEventListener('collide', (e) => {
            this.bulletBody.velocity = new CANNON.Vec3(0, 0, 10);
            this.bullet.visible = false;
        })
    }

    setPhysics() {
        this.bulletBody = new CANNON.Body({
            mass: 1,
            position: this.bullet.position,
            quaternion: this.bullet.quaternion,
            shape: new CANNON.Cylinder(0.025, 0.025, 0.35, 32)
        })

        this.world.addBody(this.bulletBody);

        const direction = new THREE.Vector3();
        const speed = 5;
        direction.subVectors(this.scene.getObjectByName('Shield').position, this.bullet.position).normalize().multiplyScalar(speed);
        this.bulletBody.velocity = new CANNON.Vec3(direction.x, direction.y, direction.z);
    }
    
    spawnBullet() {
        this.bullet = new THREE.Mesh(this.geometry, this.material);
        this.bullet.position.set(-1, 2, 1.5);
        this.bullet.visible = true;
        
        const target = this.scene.getObjectByName('Shield');
        this.bullet.lookAt(target.position);
        this.bullet.rotateX(Math.PI / 2);

        this.scene.add(this.bullet)
        this.setPhysics();
    }

    update() {
        super.update();

        if(this.bullet) {
            this.bullet.position.copy(this.bulletBody.position);
            this.bullet.quaternion.copy(this.bulletBody.quaternion);
        }
    }
}
