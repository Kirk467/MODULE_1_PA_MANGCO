import * as THREE from 'https://unpkg.com';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { texture } from 'three/tsl';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf3ede2);

const camera = new THREE.PerspectiveCamera(
    45, window.innerWidth / window.innerHeight, 0.1, 1000
);
camera.position.set(7, 6, 9);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 1, 0);

// ---------- Helper Functions ----------

function box(w, h, d, color, x, y, z) {
    const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(w, h, d),
        new THREE.MeshStandardMaterial({ color: color })
    );
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    scene.add(mesh);
    return mesh;
}

function cylinder(radius, height, color, x, y, z) {
    const mesh = new THREE.Mesh(
        new THREE.CylinderGeometry(radius, radius, height, 16),
        new THREE.MeshStandardMaterial({ color: color })
    );
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    scene.add(mesh);
    return mesh;
}

// ---------- Room ----------

box(6.2, 0.2, 5, 0xe2d4c9, .4, -0.1, 0);
box(0.2, 4, 5, 0x90a4ae, -2.6, 2, 0);
box(6.2, 4, 0.2, 0xb0bec5, .4, 2, -2.6);

// ---------- Rug ----------

const rug = new THREE.Mesh(
    new THREE.PlaneGeometry(4, 4),
    new THREE.MeshStandardMaterial({ color: 0xffffff })
);
rug.rotation.x = -Math.PI / 2;
rug.position.set(-0.2, 0.01, 0.2);
scene.add(rug);

// ---------- Bed ----------

box(2.2, 0.4, 3, 0x5d4037, -0.6, 0.2, -.8);
box(2.2, 1.2, 0.2, 0x5d4037, -0.6, 0.6, -2.4);
box(2.1, 0.4, 2.7, 0xffffff, -0.6, 0.5, -1);
box(2.12, 0.42, 1.8, 0x4f5d75, -0.6, 0.52, -0.9);

box(0.8, 0.15, 0.5, 0xffffff, -1.05, 0.75, -2);
box(0.8, 0.15, 0.5, 0xffffff, -0.15, 0.75, -2);

// ---------- Bedside Table ----------

box(0.7, 0.65, 0.7, 0x5d4037, -2.15, 0.325, -2.2);

// Lamp
cylinder(0.1, 0.15, 0xffb74d, -2.15, 0.75, -2.2);
cylinder(0.025, 0.25, 0xffb74d, -2.15, 0.95, -2.2);

const lampShade = new THREE.Mesh(
    new THREE.CylinderGeometry(0.16, 0.24, 0.3, 16),
    new THREE.MeshStandardMaterial({ color: 0xfff3e0 })
);
lampShade.position.set(-2.15, 1.15, -2.2);
scene.add(lampShade);

const lampLight = new THREE.PointLight(0xffaa44, 1.5, 5);
lampLight.position.set(-2.15, 1, -2.2);
scene.add(lampLight);

// ---------- Window ----------

// Glass
box(1.8, 1.4, 0.05, 0x9ed8e8, 2, 2.4, -2.48);

// Window frame
box(2, 0.1, 0.1, 0x5d4037, 2, 3.1, -2.52);
box(2, 0.1, 0.1, 0x5d4037, 2, 1.7, -2.52);
box(0.1, 1.5, 0.1, 0x5d4037, 1, 2.4, -2.52);
box(0.1, 1.5, 0.1, 0x5d4037, 3, 2.4, -2.52);


// ---------- Study Table ----------

box(1.8, 0.15, 0.8, 0x795548, 2, 1.25, -2.25);

// Legs
box(0.12, 1.2, 0.12, 0x795548, 1.4, 0.6, -2.4);
box(0.12, 1.2, 0.12, 0x795548, 2.4, 0.6, -2.4);
box(0.12, 1.2, 0.12, 0x795548, 1.4, 0.6, -2);
box(0.12, 1.2, 0.12, 0x795548, 2.4, 0.6, -2);

// ---------- Books ----------

box(0.55, 0.08, 0.35, 0x455a64, 1.5, 1.38, -2.25);
box(0.5, 0.08, 0.32, 0x6a5acd, 1.5, 1.46, -2.25);
box(0.45, 0.08, 0.3, 0x8d6e63, 1.5, 1.54, -2.25);

// ---------- Chair ----------

box(0.8, 0.12, 0.8, 0x37474f, 1.9, 0.65, -1.50);
box(0.8, 1, 0.12, 0x37474f, 1.9, 1.05, -1.1);

box(0.1, 0.65, 0.1, 0x37474f, 1.6, 0.3, -1.80);
box(0.1, 0.65, 0.1, 0x37474f, 2.2, 0.3, -1.80);
box(0.1, 0.65, 0.1, 0x37474f, 1.6, 0.3, -1.05);
box(0.1, 0.65, 0.1, 0x37474f, 2.2, 0.3, -1.05);

// ---------- Lighting ----------

scene.add(new THREE.AmbientLight(0xffffff, 0.4));

const sunlight = new THREE.DirectionalLight(0xffffff, 0.6);
sunlight.position.set(6, 8, 5);
sunlight.castShadow = true;
scene.add(sunlight);

// ---------- Animation ----------

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
