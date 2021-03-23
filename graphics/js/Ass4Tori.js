

let camera, scene, renderer;
let cameraControls;
let clock = new THREE.Clock();

function createScene() {

    let nbrRings = 10;
   
    var Loop = () => {
        requestAnimationFrame(Loop)
        renderer.render(scene, camera);
        RingBallMove(thing, nbrRings);
    }
    let thing = createR(nbrRings);
    scene.add(thing);
    let light = new THREE.PointLight(0xbababa, 1, 0);
    light.position.set(300, 300, 300);
    var ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(light);
    scene.add(ambientLight);
    Loop(); 
}

function Radians(min, max) {
    return 2 * Math.PI * min * max;
}

function createR(nbrRings) {
    let root = new THREE.Object3D();
    let sphereG = new THREE.SphereGeometry(1, 12, 12);
    let c = getRandomColor(0.8, 0.1, 0.1);
    let sphereArgs = { color: c, transparent: false };
    let sphereMat = new THREE.MeshLambertMaterial(sphereArgs);
    let sphereMesh = new THREE.Mesh(sphereG, sphereMat);
    root.add(sphereMesh);

    for (let i = 0; i < nbrRings; ++i) {
        let geom = new THREE.TorusGeometry(2 + i * 2, 1, 20, 100);
        c = getRandomColor(0.8, 0.1, 0.8);
        let args = { color: c, transparent: false };
        let mat = new THREE.MeshLambertMaterial(args);
        let mesh = new THREE.Mesh(geom, mat);
        root.add(mesh);
    }
    return root;
}

var trackBall = true;

function RingBallMove(thing, nbrRings) {
    let delta = clock.getDelta();
    let ball = thing.children[0];
    if (trackBall) {
        ball.position.z += delta * 20 / 4.0; 
        if (ball.position.z >= 20)
            trackBall = false; 
    }
    else {
        ball.position.z -= delta * 20 / 4.0;
        if (ball.position.z < -20)
            trackBall = true; 
    }
    
    let deltaRevRadians = Radians(0.04, delta);
    for (i = 1; i <= nbrRings; ++i) {
        let ring = thing.children[i];
        if (i % 4 == 0)
            ring.rotation.y += deltaRevRadians;
        else if (i % 4 == 1)
            ring.rotation.x -= deltaRevRadians;
        else if (i % 4 == 2)
            ring.rotation.y -= deltaRevRadians;
        else
            ring.rotation.x += deltaRevRadians;
    }
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
    camera.position.set(80, 80, 80); 
    camera.lookAt(new THREE.Vector3(0, 0, 0));

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