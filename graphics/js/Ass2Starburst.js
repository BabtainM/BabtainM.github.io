

var camera, scene, renderer;
var cameraControls;
var clock = new THREE.Clock();

function createScene() {
    let nbrBursts = 250;
    let radius = 15;
    let height = 15;
    let maxRays = 50;
    let maxRad = 1.2;
    root = starburst(nbrBursts, height, radius, maxRays, maxRad);
    scene.add(root);
}

function starburstsOnSphereA(nbrBursts, sphereRadius, maxRays, maxRad) {
    let root = new THREE.Object3D();
    for (let i = 0; i < nbrBursts; i++) {
        let mesh = starburstA(maxRays, maxRad);
        let p = getRandomPointOnSphere(sphereRadius);
        mesh.position.set(p.x, p.y, p.z);
        root.add(mesh);
    }
    return root;
}

function starburstsOnBox(nbrBursts, len, maxRays, maxRad) {
    let root = new THREE.Object3D();
    for (var i = 0; i < nbrBursts; i++) {
    let mesh = starburstA(maxRays, maxRad);
    let p = getRandomPointOnBox(len);
    mesh.position.set(p.x, p.y, p.z);
    root.add(mesh);
    }
    
    return root;
}

function getRandomPointOnBox(len) {
    let xx = ((Math.round(Math.random()) == 0) ? -1 : 1);
    let yy = ((Math.round(Math.random()) == 0) ? -1 : 1);
    let zz = ((Math.round(Math.random()) == 0) ? -1 : 1);
    let x = xx * (len/2);
    let y = yy * (len/2);
    let z = zz * (len/2);
    let rand = Math.floor(Math.random() * 3);
    switch (rand) {
    case 0:
    x *= Math.random();
    y *= Math.random();
    break;
    case 1:
    x *= Math.random();
    z *= Math.random();
    break;
    case 2:
    y *= Math.random();
    z *= Math.random();
    break;
    }

    return new THREE.Vector3(x, y, z);
}

function starburst(nbrBursts, height, radius, maxRays, maxRad) {
    let root = new THREE.Object3D();
    root = starburstsOnBox(nbrBursts, height, maxRays, maxRad);
    scene.add(root);
}

function starburstA(maxRays, maxRad) {
    let rad = 1;
    let origin = new THREE.Vector3(0, 0, 0);
    let innerColor = getRandomColor(0.8, 0.1, 0.8);
    let black = new THREE.Color(0x000000);
    let geom = new THREE.Geometry();
    let nbrRays = getRandomInt(1, maxRays);
    for (let i = 0; i < nbrRays; i++) {
        let r = rad * getRandomFloat(0.1, maxRad);
        let dest = getRandomPointOnSphere(r);
        geom.vertices.push(origin, dest);
        geom.colors.push(innerColor, black);
    }
    let args = {vertexColors: true, linewidth: 2};
    let mat = new THREE.LineBasicMaterial(args);
    return new THREE.Line(geom, mat, THREE.LineSegments);
}

function init() {
    var canvasWidth = window.innerWidth;
    var canvasHeight = window.innerHeight;
    var canvasRatio = canvasWidth / canvasHeight;

    scene = new THREE.Scene();

    renderer = new THREE.WebGLRenderer(
    {
        antialias: true,
        preserveDrawingBuffer: true
    }
    );
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.setSize(canvasWidth, canvasHeight);
    renderer.setClearColor(0x000000, 1.0);

    camera = new THREE.PerspectiveCamera(60, canvasRatio, 1, 1000);
    camera.position.set(0, 0, 60);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
}

function render() {
    var delta = clock.getDelta();
    cameraControls.update(delta);
    renderer.render(scene, camera);
}

function animate() {
    window.requestAnimationFrame(animate);
    render();
}


function addToDOM() {
    var container = document.getElementById('container');
    var canvas = container.getElementsByTagName('canvas');

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
