var camera, scene, renderer;
var cameraControls;
var clock = new THREE.Clock();
function createCylinder(n, len, rad, isCappedBottom, isCappedTop) {
var geom = new THREE.CylinderGeometry(rad, rad, len, n, n, false);
if (!isCappedTop) {
    geom.faces.splice(geom.faces.length - 2 * n, n);
}
if (!isCappedBottom) {
    geom.faces.splice(geom.faces.length - n, n);
}
return geom;
}
function createScene() {
var size = 10;
var geom = createCylinder(12, 7, 2);

var mat = new THREE.MeshLambertMaterial({color: "white", shading: THREE.FlatShading, side: THREE.DoubleSide});

var mesh = new THREE.Mesh(geom, mat);
var light = new THREE.PointLight(0x22222222, 2, 1000);
light.position.set(0, 15, 10);
var ambientLight = new THREE.AmbientLight(0x2222);
scene.add(light);
scene.add(ambientLight);

scene.add(mesh);
}

function init() {
var canvasWidth = window.innerWidth;
var canvasHeight = window.innerHeight;
var canvasRatio = canvasWidth / canvasHeight;

scene = new THREE.Scene();

renderer = new THREE.WebGLRenderer({antialias : true, preserveDrawingBuffer: true});
renderer.gammaInput = true;
renderer.gammaOutput = true;
renderer.setSize(canvasWidth, canvasHeight);
renderer.setClearColor(0x000000, 1.0);

var target = new THREE.Vector3(0, 0, 0);
camera = new THREE.PerspectiveCamera(40, canvasRatio, 1, 1000);
camera.position.set(-1, 20, 5);
camera.lookAt(target);
cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
cameraControls.target = target;
cameraControls.center = target;
}

function animate() {
window.requestAnimationFrame(animate);
render();
}

function render() {
var delta = clock.getDelta();
cameraControls.update(delta);
renderer.render(scene, camera);
}

function addToDOM() {
var container = document.getElementById('container');
var canvas = container.getElementsByTagName('canvas');
if (canvas.length>0) {
    container.removeChild(canvas[0]);
}
container.appendChild( renderer.domElement );
}
try {
init();
createScene();
addToDOM();
render();
animate();
} catch(e) {
var errorMsg = "Error: " + e;
document.getElementById("msg").innerHTML = errorMsg;
}
