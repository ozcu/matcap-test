import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()
scene.background = new THREE.Color(0.5,0.5,0.5)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 5
camera.position.y = 5
camera.position.z = 15

scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


const light = new THREE.PointLight( 0xff0000, 1, 100 );
light.position.set(0, 25, 0);
scene.add( light );

/**
 * Textures
 */
 const textureLoader = new THREE.TextureLoader()
 const matcapTexture = textureLoader.load('/textures/matcaps/12.png')
 const matcapTexture2 = textureLoader.load('/textures/matcaps/3.png')
 const matcapTexture3 = textureLoader.load('/textures/matcaps/10.png')
 const matcapTexture4 = textureLoader.load('/textures/matcaps/11.png')

 const material = new THREE.MeshMatcapMaterial()
 const material2 = new THREE.MeshMatcapMaterial()
 const material3 = new THREE.MeshMatcapMaterial()
 const material4 = new THREE.MeshMatcapMaterial()

 material.matcap = matcapTexture
 material2.matcap = matcapTexture2
 material3.matcap = matcapTexture3
 material4.matcap = matcapTexture4

/**
 * Object
 */

const loader = new OBJLoader()

 loader.load(
	// resource URL
	'models/hand.obj',
	// called when resource is loaded
	function ( object ) {

		scene.add( object );
        object.children[0].material = material
        object.position.x=-20
        object.position.z = -5
        object.scale.set(0.5,0.5,0.5)

        const object2 = object.clone()
        object2.position.x = -10
        object.position.z = -5
        object2.scale.set(0.5,0.5,0.5)
        object2.children[0].material = material2
        scene.add(object2)

        const object3 = object.clone()
        object3.position.x = 0
        object.position.z = -5
        object3.scale.set(0.5,0.5,0.5)
        object3.children[0].material = material3
        scene.add(object3)

        const object4 = object.clone()
        object4.position.x = 10
        object.position.z = -5
        object4.scale.set(0.5,0.5,0.5)
        object4.children[0].material = material4
        scene.add(object4)


	},
	// called when loading is in progresses
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
let lastElapsedTime = 0

const animateScene = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - lastElapsedTime
    lastElapsedTime = elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call animateScene again on the next frame
    window.requestAnimationFrame(animateScene)
}

animateScene()