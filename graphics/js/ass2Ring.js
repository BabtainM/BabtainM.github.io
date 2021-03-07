

var camera, scene, renderer;
var cameraControls;
var clock = new THREE.Clock();
var ring;

const geometries = ["Cube", "Octahedron", "Icosahedron", "Dodecahedron"];
var rainbow = false;

var chooseType = "Cube";

function createScene() {
    ring = createRing(solidsFnc, 15, 10);
    let light = new THREE.PointLight(0xFFFFFF, 1, 1000);
    light.position.set(0, 10, 10);
    let light2 = new THREE.PointLight(0xFFFFFF, 1.0, 1000);
    light2.position.set(10, -10, -10);
    var ambientLight = new THREE.AmbientLight(0x222222);
    scene.add(ring);
    scene.add(light);
    scene.add(light2);
    scene.add(ambientLight);
}

function makeSolidsFnc() {
    
        var solids;

    switch (chooseType) {
    case "Cube":
    solids = [new THREE.BoxGeometry(1, 1, 1)];
           break;
    case "Octahedron":
    solids = [new THREE.OctahedronGeometry(1)];
           break;
    case "Icosahedron":
    solids = [new THREE.IcosahedronGeometry(1)];
           break;
    case "Dodecahedron":
    solids = [new THREE.DodecahedronGeometry(1)];
           break;
    }

    const nbrSolids = solids.length;

    function f(i, n) {
        let geom = solids[i % nbrSolids];
        let color = (rainbow == true) ? new THREE.Color().setHSL(i/n, 1.0, 0.5) : new THREE.Color().setRGB(1, 1, 1);
        let args = {color: color, opacity: 0.5, transparent: true};
        let mat = new THREE.MeshLambertMaterial(args);
        return new THREE.Mesh(geom, mat);
    }
    
    return f;
}

let solidsFnc = makeSolidsFnc();

function createRing(fnc, n, t) {
    let root = new THREE.Object3D();
    let angle = 2 * Math.PI / n;
    for (let i = 0, a = 0; i < n; i++, a += angle) {
        let obj = new THREE.Object3D();
        obj.rotation.y = a;
        let f = fnc(i, n);
        f.position.x = t;
        obj.add(f);
        root.add(obj);
    }
    
    return root;
}

controls = new function() {
    this.nbrSolids = 15;
    this.opacity = 0.5;
    this.scale = 1.0;
    this.type = geometries[0];
    this.rainbow = rainbow;
}

function initGui() {
    var gui = new dat.GUI();
    gui.add(controls, 'nbrSolids', 2, 80).step(1).onChange(updateSolids);
    gui.add(controls, 'opacity', 0.0, 1.0).step(0.1).onChange(updateOpacityScale);
    gui.add(controls, 'scale', 0.1, 6).onChange(updateOpacityScale);
    gui.add(controls, 'type').options(geometries).onChange(updateType);
    gui.add(controls, 'rainbow').onChange(updateRainbow);
}

function updateSolids() {
    if (ring)
        scene.remove(ring);
    ring = createRing(solidsFnc, controls.nbrSolids, 10);
    updateOpacityScale();
    scene.add(ring);
}

function updateOpacityScale() {
    if (ring) {
        let scale = controls.scale;
        let opacity = controls.opacity; 
        for (let c of ring.children) {
            let mesh = c.children[0];
            mesh.material.opacity = opacity;
            mesh.scale.set(scale, scale, scale);
        }
    }
}

function updateType(type) {
    chooseType = type;
    solidsFnc = makeSolidsFnc();
    updateSolids();
}

function updateRainbow() {
    if (rainbow)
    rainbow = false;
    else
    rainbow = true;
    updateSolids();
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
    camera.position.set(10, 20, 10);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
}

function addToDOM() {
    var container = document.getElementById('container');
    var canvas = container.getElementsByTagName('canvas');

    if (canvas.length > 0) {
    container.removeChild(canvas[0]);
}

    container.appendChild(renderer.domElement);
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

    init();
    createScene();
    initGui();
    addToDOM();
    render();
    animate();
