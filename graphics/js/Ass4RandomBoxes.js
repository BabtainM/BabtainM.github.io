
let camera, scene, renderer;
let cameraControls;
let clock = new THREE.Clock();

    let nbrBoxes = 100;
    let minSide = 5;
    let maxSide = 20;
    let minHeight = 5;
    let maxHeight = 50;

function createScene() {

    let floor = createFloor();
    floor.position.set(0,-50, 0);
    var ambientLight = new THREE.AmbientLight(0x404040);
    let city = randomBoxes(nbrBoxes, minSide, maxSide, minHeight, maxHeight);
    let sun = new THREE.PointLight(0xbababa, 1, 0);
    sun.position.set(300, 300, 300);
    
    scene.add(city);
    scene.add(floor);
    scene.add(ambientLight);
    scene.add(sun);
}

function createFloor() {
    let geom = new THREE.BoxGeometry(200, .1, 200);
    let c = new THREE.Color(0.5, 0.5, 0.5);
    let args = { color: c, transparent: false };
    let mat = new THREE.MeshLambertMaterial(args);
    let floor = new THREE.Mesh(geom, mat);
    return floor;
}

function randomBoxes(nbrBoxes, minSide, maxSide, minHeight, maxHeight) {
    let city = new THREE.Object3D();
    for (let i = 0; i < nbrBoxes; ++i) {
        let scaleX = Math.random() * (maxSide - minSide) + minSide;
        let scaleY = Math.random() * (maxHeight - minHeight) + minHeight;
        let scaleZ = Math.random() * (maxSide - minSide) + minSide;
        let geom = new THREE.BoxGeometry(scaleX, scaleY, scaleZ);
        let c = getRandomColor(0.8, 0.1, 0.8);
        let args = { color: c, opacity: 0.8, transparent: true };
        let mat = new THREE.MeshLambertMaterial(args);
        let building = new THREE.Mesh(geom, mat);
        
        let x = Math.random() * (200 - scaleX) - (100 - scaleX / 2); 
        let z = Math.random() * (200 - scaleZ) - (100 - scaleZ / 2);
        let y = scaleY / 2 - 50;
        building.position.set(x, y, z);
        city.add(building);
    }
    return city;
}

function animate() {
    window.requestAnimationFrame(animate);
    render();
}

function render() {
    let delta = clock.getDelta();
    cameraControls.update(delta);
    renderer.render(scene, camera);
}

function init() {
    let canvasWidth = window.innerWidth;
    let canvasHeight = window.innerHeight;
    let canvasRatio = canvasWidth / canvasHeight;
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.setSize(canvasWidth, canvasHeight);
    renderer.setClearColor(0x000000, 1.0);

    camera = new THREE.PerspectiveCamera(40, canvasRatio, 1, 1000);
    camera.position.set(2, 100, 350);
    camera.lookAt(new THREE.Vector3(0, -50, 0)); 

    cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
}

function addToDOM() {
    let container = document.getElementById('container');
    let canvas = container.getElementsByTagName('canvas');
    if (canvas.length > 0) {
        container.removeChild(canvas[0]);
    }
    container.appendChild(renderer.domElement);
}

init();
createScene();
addToDOM();
render();
animate();