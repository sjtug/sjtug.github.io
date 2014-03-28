var scene, camera, renderer, controls;

init();

function init(){
    //scene = new THREE.Scene();
    var WIDTH = window.innerWidth;
    var HEIGHT = window.innerHeight;

    renderer = new THREE.WebGLRenderer({'antialias':true});
    renderer.setSize(WIDTH, HEIGHT);

    document.body.appendChild(renderer.domElement);

    camera = new THREE.PerspectiveCamera(45, WIDTH/HEIGHT, 0.1, 20000);
    camera.position.set(0, 3, 50);

    window.addEventListener('resize', function() {
        var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight;
        renderer.setSize(WIDTH, HEIGHT);
        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();
    });

    var mainLight = new THREE.DirectionalLight(0xffffff, 1);
    mainLight.position.set(5,50,50);

    var loader = new THREE.SceneLoader();
    loader.load("rocket.pack.json", function(s){
        scene = s.scene;

        scene.add(camera);
        scene.add(mainLight);
        animate();
    });
    controls = new THREE.OrbitControls(camera, renderer.domElement);
}

function animate() {
    requestAnimationFrame(animate);
 
    renderer.render(scene, camera);
    controls.update();
}
 

