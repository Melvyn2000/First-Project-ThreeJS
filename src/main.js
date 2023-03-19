import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import * as THREE from 'three'

const scene = new THREE.Scene(); // Initialisation de la scene

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000); // Initialisation de la camera

const renderer = new THREE.WebGLRenderer({ // Déclaration du rendu ThreeJS dans l'element '#bg'
    canvas: document.querySelector('#bg')
});

const geometry = new THREE.TorusGeometry(10, 3, 10, 100); // Définition de nos vecteurs => Définition de la forme géométrique que formera l'ensemble de nos vecteurs

const material = new THREE.MeshStandardMaterial({ // Définition de nos matériaux => Ajout d'une matière à nos vecteurs pour qu'ils possèdent un style (et soit visible !)
        color:0xFF6347
});

const torus = new THREE.Mesh(geometry, material); // Association de nos vecteurs avec nos matériaux 

renderer.setSize(window.innerWidth, window.innerHeight); // Déclaration de la taille du modele (dans notre cas : en fonction de la taille de l'écran)

camera.position.setZ(30); // Placement l'angle de la camera en fonction de l'axe Z (dans notre cas : à 30°deg)

renderer.render(scene, camera); // Ajout de la scene et de la camera dans la constante de rendu
scene.add(torus); // Ajout de notre torus à notre scene

function animate() { // Création d'une fonction animate() pour pouvoir donner une animation a l'element 3D
    requestAnimationFrame(animate); // Création d'une fonction qui va répéter de manière infinie notre animation
    renderer.render(scene, camera); // Ré-ajout de notre scene et de notre camera pour que l'animation soit prise en compte dans le rendu
    torus.rotation.x += 0.01; // Paramètre de l'orientation de notre animation sur l'axe des x
    torus.rotation.y += 0.005; // Paramètre de l'orientation de notre animation sur l'axe des y
    torus.rotation.y += 0.01; // Paramètre de l'orientation de notre animation sur l'axe des y ou z
}

animate(); // Lancement de notre fonction animate()

createApp(App).mount('#app');
