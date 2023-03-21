import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene(); // Initialisation de la scene

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000); // Initialisation de la camera

const renderer = new THREE.WebGLRenderer({ // Déclaration du rendu ThreeJS dans l'element '#bg'
    canvas: document.querySelector('#bg')
});

const geometry = new THREE.TorusGeometry(10, 3, 10, 100); // Définition de nos vecteurs => Définition de la forme géométrique que formera l'ensemble de nos vecteurs

// const material =  new THREE.MeshBasicMaterial({ // Définition de nos matériaux => Ajout d'une matière à nos vecteurs pour qu'ils possèdent un style (et soit visible !)
//     color:0xFF6347,
//     wireframe:true
// });
const material =  new THREE.MeshStandardMaterial({ // Définition de notre matériaux (MeshStandardMaterial() --> pour le concept de lumière)
    color:0xFF6347
});

const torus = new THREE.Mesh(geometry, material); // Association de nos vecteurs avec nos matériaux 

renderer.setSize(window.innerWidth, window.innerHeight); // Déclaration de la taille du modele (dans notre cas : en fonction de la taille de l'écran)

camera.position.setZ(30); // Placement l'angle de la camera en fonction de l'axe Z (dans notre cas : à 30°deg)

renderer.render(scene, camera); // Ajout de la scene et de la camera dans la constante de rendu
scene.add(torus); // Ajout de notre torus à notre scene

const pointLight = new THREE.PointLight(0xffffff); // Déclaration de notre point de lumière
pointLight.position.set(5,5,5); // Position de notre point lumineux

const ambientLight = new THREE.AmbientLight(0xffffff); // Déclaration de l'ambiance lumineuse
scene.add(pointLight, ambientLight); // Ajout de notre point lumineux et de notre ambiance lumineuse à notre scene

const lightHelper = new THREE.PointLightHelper(pointLight); // Aide pour pouvoir voir la position de la lumière
const gridHelper = new THREE.GridHelper(200, 50); // Design d'une grille en 2 dimensions
scene.add(lightHelper);

const controls = new OrbitControls(camera, renderer.domElement); // Autorisation du mouvement au niveau de la scene avec la souris

function animate() { // Création d'une fonction animate() pour pouvoir donner une animation a l'element 3D
    requestAnimationFrame(animate); // Création d'une fonction qui va répéter de manière infinie notre animation
    renderer.render(scene, camera); // Ré-ajout de notre scene et de notre camera pour que l'animation soit prise en compte dans le rendu
    torus.rotation.x += 0.01; // Paramètre de l'orientation de notre animation sur l'axe des x
    torus.rotation.y += 0.005; // Paramètre de l'orientation de notre animation sur l'axe des y
    torus.rotation.y += 0.01; // Paramètre de l'orientation de notre animation sur l'axe des y ou z
    controls.update(); // Fonction upate() pour bien prendre en compte le déplacement sur la scene avec la souris en plus de l'animation
}

animate(); // Lancement de notre fonction animate()

function addStar() { // Création d'une fonction addStar() pour pouvoir générer quelques "objets" dans notre scene
    const geometry = new THREE.SphereGeometry(0.25); // Déclaration d'un nouveau vecteur qui est une sphere geometrique
    const material = new THREE.MeshStandardMaterial({ // Déclaration de notre material
        color: 0xffffff
    });
    const star = new THREE.Mesh(geometry, material); // Association de notre vecteur avec son material
    const [x, y, z] = Array(3).fill().map(
        () => THREE.MathUtils.randFloatSpread(100)
    );

    star.position.set(x, y, z); // Modification de la position de notre objet en fonction des axes x, y, et z
    scene.add(star); // Ajout du nouvel objet a la scene
}

Array(250).fill().forEach(addStar); // Lancement de notre fonction addStar (x250 grâce à la bouche "forEach")

createApp(App).mount('#app');
