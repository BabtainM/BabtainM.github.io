
let camera, scene, renderer;
let cameraControls;
let clock = new THREE.Clock();
let currentMesh, currentMat, geom;
let radius = 3;
let ring = new THREE.Object3D();


function createScene() {
    currentMat = new THREE.MeshLambertMaterial({color: "yellow", side: THREE.DoubleSide}); 
    let light = new THREE.PointLight(0xFFFFFF, 1.0, 1000 );
    light.position.set(0, 0, 40);
    let light2 = new THREE.PointLight(0xFFFFFF, 1.0, 1000 );
    light2.position.set(0, 0, -40);
    let ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(light);
    scene.add(light2);
    scene.add(ambientLight);
    scene.add(ring);
    updateRing();
}

function createSolidRing(r = 10, m = Math.PI / 4, nbrSolids = 50) {
    mat = new THREE.MeshLambertMaterial({transparent: true})
    let h = 2 * m / (20 - 1);
    let points = [];
    for (let i = 0; i < 20; i++) {
        let a = -m + i * h;  
        let x = r * Math.cos(a);
        let y = r * Math.sin(a);
        let g = new THREE.Vector2(x, y);
        points.push(g);
    }
    return new THREE.LatheGeometry(points, nbrSolids);
}

var controls = new function() {
    this.nbrSolids = 50;
    this.scale = 0.2;
    this.opacity = 0.5;
}

function initGui() {
    let gui = new dat.GUI();
    gui.add(controls, 'nbrSolids', 3, 50).step(0.1).onChange(updateRing);
    gui.add(controls, 'opacity', 0.0, 1.0).step(0.1).onChange(updateOpacityScale);
    gui.add(controls, 'scale', 0.1, 0.7).step(0.1).onChange(updateRing);
}

function updateRing() {
    if (currentMesh) {
        scene.remove(currentMesh);
       updateOpacityScale();
    }

    geom = createSolidRing(radius, controls.scale, controls.nbrSolids, controls.opacity);
    if (geom) {
        currentMesh = new THREE.Object3D;
        currentMesh.add(new THREE.Mesh(geom, currentMat));
        scene.add(currentMesh);
    }
}

function updateOpacityScale() {
    if (currentMesh) {
        let scale = controls.scale;
        let opacity = controls.opacity; 

        for (let c of ring.children) {
            let mesh = c.children[0];
            mesh.material.opacity = opacity;
            currentMesh.scale.set(scale, scale, scale);
        }
    }
}

function animate() {
    window.requestAnimationFrame(animate);
    render();
}

function render() {
    var delta = clock.getDelta();
    cameraControls.update(delta);
    currentMesh.color = new THREE.Color(controls.color);
    currentMesh.opacity = controls.opacity;
    renderer.render(scene, camera);
}

function init() {
    var canvasWidth = window.innerWidth;
    var canvasHeight = window.innerHeight;
    var canvasRatio = canvasWidth / canvasHeight;
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer({antialias : true});
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.setSize(canvasWidth, canvasHeight);
    renderer.setClearColor(0x000000, 1.0);
    renderer.setAnimationLoop( () => {
    renderer.render(scene, camera);
    });

    camera = new THREE.PerspectiveCamera( 40, canvasRatio, 1, 1000);
    camera.position.set(0, 10, 14);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
}

function addToDOM() {
    var container = document.getElementById('container');
    var canvas = container.getElementsByTagName('canvas');
    if (canvas.length>0) {
        container.removeChild(canvas[0]);
    }
    container.appendChild( renderer.domElement );
}

init();
createScene();
initGui();
addToDOM();
animate();
render();


