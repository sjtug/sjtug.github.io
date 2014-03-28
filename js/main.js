var scene, camera, renderer, rocket, fire, mx, my;

init();

function init(){
    //scene = new THREE.Scene();
    var WIDTH = 480;
    var HEIGHT = 480;

    renderer = new THREE.WebGLRenderer({'antialias':true});
    renderer.setSize(WIDTH, HEIGHT);


    camera = new THREE.PerspectiveCamera(45, WIDTH/HEIGHT, 0.1, 20000);
    camera.position.set(0, 0, 30);
    camera.lookAt(new THREE.Vector3(0,0,0))

    var mainLight = new THREE.DirectionalLight(0xffffff, 1);
    mainLight.position.set(5,50,50);

    var loader = new THREE.SceneLoader();
    loader.load("/js/rocket.json", function(s){
      scene = s.scene;
      rocket = s.objects['Rocket'];
      fire = s.objects['Fire'];

      rot_axis = new THREE.Vector3(0, 0, 1);
      trans_axis = new THREE.Vector3(-0.5, 0, 0.8);
      rot_lean = new THREE.Vector3(0, 1, 0);

      rocket.rotateOnAxis(rot_axis, 1.508);
      rocket.translateOnAxis(trans_axis, -2)
      rocket.rotateOnAxis(rot_lean, -0.63);

      fire.rotateOnAxis(rot_axis, 1.508);
      fire.translateOnAxis(trans_axis, -2)
      fire.rotateOnAxis(rot_lean, -0.63);

      scene.add(camera);
      scene.add(mainLight);

      document.body.onmousemove = function(e){
        var w = document.body.clientWidth/2;
        mx = w-e.pageX;
        my = 300-e.pageY;
      }

      mx = 0
      my = 0

      var logo = document.getElementById('logo');
      logo.classList.add('ani');
      logo.appendChild(renderer.domElement);
      animate();
    });
}

var firescale = 1;
var axis_w = new THREE.Vector3(0,1,0);
var axis_h = new THREE.Vector3(1,0,0);
var axis_c = new THREE.Vector3(0,0,0);

function animate() {
  requestAnimationFrame(animate);
  if(firescale>=1) firescale = 0.8 - 0.1*Math.random();
  else firescale = 0.8 + 0.2*Math.random();
  fire.scale.z = firescale;

  wa = mx/1000*1.3;
  ha = my/1000*1.3;

  camera.position = (new THREE.Vector3(0,0,30)).applyAxisAngle(axis_w, wa);
  camera.position.applyAxisAngle(axis_h, ha);
  camera.lookAt(axis_c)

  renderer.render(scene, camera);
}


