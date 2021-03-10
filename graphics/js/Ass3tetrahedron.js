let camera, scene, renderer;
let cameraControls;
let clock = new THREE.Clock();
let snowflake, currentGeom;
let len = 1;
let mat;
let tetrahedronGeom,j16, j88;

function createScene() {
    let nbrLevels = controls.nbrLevels;
    let color = new THREE.Color(controls.color);
    let opacity = controls.opacity;
    let matArgs = {color: color, transparent: true, opacity: opacity, side: THREE.DoubleSide};
    mat = new THREE.MeshLambertMaterial(matArgs);
    tetrahedronGeom = new THREE.TetrahedronGeometry(len);
    j16 = generalGeometry(J16, 0.75 * len);
    j88 = generalGeometry(J88, 0.75 * len);
    currentGeom = tetrahedronGeom;
    snowflake = makeSnowflake(nbrLevels, 0.5, currentGeom);
    let light = new THREE.PointLight(0xFFFFFF, 1.0, 1000 );
    light.position.set(0, 100, 200);
    let light2 = new THREE.PointLight(0xFFFFFF, 0.4, 1000 );
    light2.position.set(60, 100, -200);
    let ambientLight = new THREE.AmbientLight(0x111111);
    scene.add(light);
    scene.add(light2);
    scene.add(ambientLight);
    scene.add(snowflake);
    
}

function makeSnowflake(level, scale, geom) {
    if (level === 0) {
        return new THREE.Mesh(geom, mat);
    } else {
        let root = new THREE.Object3D();
        root.scale.set(scale, scale, scale);
        let tf = (1 - scale) / scale;
        for (let v of geom.vertices) {
            let root2 = new THREE.Object3D();
            let v2 = v.clone().multiplyScalar(tf);
            root2.position.set(v2.x, v2.y, v2.z);
            root2.add(makeSnowflake(level-1, scale, geom));
            root.add(root2);
        }
        return root;
    }
}

TruncatedOctahedron = {
"name":"Truncated Octahedron",
"category":["Archimedean Solid"],
"vertex":[[0,0,1.054093],[0.6324555,0,0.843274],[-0.421637,0.4714045,0.843274],[-0.07027284,-0.6285394,0.843274],[0.843274,0.4714045,0.421637],[0.5621827,-0.6285394,0.6324555],[-0.9135469,0.3142697,0.421637],[-0.2108185,0.942809,0.421637],[-0.5621827,-0.7856742,0.421637],[0.9838197,0.3142697,-0.2108185],[0.421637,0.942809,0.2108185],[0.7027284,-0.7856742,0],[-0.7027284,0.7856742,0],[-0.9838197,-0.3142697,0.2108185],[-0.421637,-0.942809,-0.2108185],[0.5621827,0.7856742,-0.421637],[0.9135469,-0.3142697,-0.421637],[0.2108185,-0.942809,-0.421637],[-0.5621827,0.6285394,-0.6324555],[-0.843274,-0.4714045,-0.421637],[0.07027284,0.6285394,-0.843274],[0.421637,-0.4714045,-0.843274],[-0.6324555,0,-0.843274],[0,0,-1.054093]],
"edge":[[0,3],[3,5],[5,1],[1,0],[2,7],[7,12],[12,6],[6,2],[4,9],[9,15],[15,10],[10,4],[8,13],[13,19],[19,14],[14,8],[11,17],[17,21],[21,16],[16,11],[18,20],[20,23],[23,22],[22,18],[1,4],[10,7],[2,0],[6,13],[8,3],[5,11],[16,9],[14,17],[12,18],[22,19],[15,20],[21,23]],
"face":[[0,3,5,1],[2,7,12,6],[4,9,15,10],[8,13,19,14],[11,17,21,16],[18,20,23,22],[0,1,4,10,7,2],[0,2,6,13,8,3],[1,5,11,16,9,4],[3,8,14,17,11,5],[6,12,18,22,19,13],[7,10,15,20,18,12],[9,16,21,23,20,15],[14,19,22,23,21,17]]
};

J16 = {
"name":"Elongated Pentagonal Dipyramid (J16)",
"category":["Johnson Solid"],
"vertex":[[-0.931836,0.219976,-0.264632],[-0.636706,0.318353,0.692816],[-0.613483,-0.735083,-0.264632],[-0.326545,0.979634,0],[-0.318353,-0.636706,0.692816],[-0.159176,0.477529,-0.856368],[0.159176,-0.477529,-0.856368],[0.318353,0.636706,0.692816],[0.326545,-0.979634,0],[0.613482,0.735082,-0.264632],[0.636706,-0.318353,0.692816],[0.931835,-0.219977,-0.264632]],
"edge":[[10,11],[11,9],[9,7],[7,10],[10,8],[8,11],[9,3],[3,7],[11,6],[6,5],[5,9],[8,6],[5,3],[6,2],[2,0],[0,5],[8,2],[0,3],[2,4],[4,1],[1,0],[8,4],[1,3],[4,10],[7,1]],
"face":[[11,10,8],[7,9,3],[6,11,8],[9,5,3],[2,6,8],[5,0,3],[4,2,8],[0,1,3],[10,4,8],[1,7,3],[10,11,9,7],[11,6,5,9],[6,2,0,5],[2,4,1,0],[4,10,7,1]]
};

J88 = {
"name":"Sphenomegacorona (J88)",
"category":["Johnson Solid"],
"vertex":[[-0.710639,-0.297668,-0.15267],[-0.651151,-0.105949,0.829841],[-0.621335,0.64788,0.169179],[-0.614162,-1.052419,0.500527],[-0.166396,0.361269,-0.677289],[-0.002058,-0.993534,-0.291612],[0.165944,0.471894,0.764865],[0.225836,-0.507426,0.555374],[0.279224,1.020494,-0.066987],[0.542185,-0.334598,-0.816231],[0.770079,0.151511,0.030755],[0.782476,0.638548,-0.845752]],
"edge":[[7,5],[5,9],[9,10],[10,7],[6,7],[10,6],[3,7],[7,1],[1,3],[3,5],[10,11],[11,8],[8,10],[9,11],[6,1],[8,6],[4,9],[5,0],[0,4],[2,4],[0,2],[11,4],[4,8],[0,3],[1,0],[8,2],[2,6],[2,1]],
"face":[[6,7,10],[3,7,1],[3,5,7],[10,11,8],[10,9,11],[1,7,6],[6,10,8],[2,4,0],[11,4,8],[11,9,4],[0,3,1],[0,5,3],[8,2,6],[8,4,2],[2,1,6],[2,0,1],[7,5,9,10],[4,9,5,0]]
};

function generalGeometry(data, scale = 1) {
    let vertex = data.vertex;
    let face = data.face;
    let geom = new THREE.Geometry();
    let vertices = [];
    for (let i = 0; i < vertex.length; i++)
        vertices.push(new THREE.Vector3(...vertex[i]).multiplyScalar(scale));
    let faces = [];
    var faceIndex = 0;
    for (var faceNum = 0; faceNum < face.length; faceNum++) {
        for (var i = 0; i < face[faceNum].length - 2; i++) {
            faces[faceIndex] = new THREE.Face3(face[faceNum][0], data.face[faceNum][i+1], data.face[faceNum][i+2] );
            faceIndex++;
        }
    }

    geom.vertices = vertices;
    geom.faces = faces;
    geom.computeFaceNormals();
    return geom;
}

var controls = new function() {
    this.nbrLevels = 6;
    this.scale = 0.5;
    this.shape = 'Tetrahedron';
    this.opacity = 1.0;
    this.color = 'red';
}

function initGui() {
    var gui = new dat.GUI();
    gui.add(controls, 'nbrLevels', 0, 6).name('level').step(1).onChange(update);
    gui.add(controls, 'opacity', 0.0, 1.0).step(0.1);
    let objectTypes =  [ 'Tetrahedron'];
}

function update() {
    if (snowflake)
        scene.remove(snowflake);
    switch (controls.shape) {
        case 'Tetrahedron':     currentGeom = tetrahedronGeom;
                                break;
    }
    snowflake = makeSnowflake(controls.nbrLevels, controls.scale, currentGeom, len); 
    scene.add(snowflake);
}

function render() {
    var delta = clock.getDelta();
    cameraControls.update(delta);
    mat.color = new THREE.Color(controls.color);
    mat.opacity = controls.opacity;
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
    renderer.setAnimationLoop(function () {
        render();
    });

    camera = new THREE.PerspectiveCamera(50, canvasRatio, 1, 1000);
    camera.position.set(2, -3, 2 );
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