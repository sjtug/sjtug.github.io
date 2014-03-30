var scene, camera, renderer, rocket, fire, mx, my;

var firescale = 1;

var rot_axis = new THREE.Vector3(0, 0, 1);
var trans_axis = new THREE.Vector3(-0.5, 0, 0.8);
var rot_lean = new THREE.Vector3(0, 1, 0);

var axis_c = new THREE.Vector3(0,0,0);
var axis_s = new THREE.Vector3(0,0,0);
var axis_h = (new THREE.Vector3(0,1,0)).applyAxisAngle(rot_axis, -0.02);
var axis_w = (new THREE.Vector3(1,0,0)).applyAxisAngle(rot_axis, -0.02);
var camera_pos = new THREE.Vector3(0, 0, 30);
var current_pos = new THREE.Vector3(0,0,0);
var delta = new THREE.Vector3(0,0,0);
var speedX = 0;
var speedY = 0;
var firel = 0.4;
var firer = 0.2;


var mx = 0;
var my = 0;
var xs = 0;

init();

function init(){
    //scene = new THREE.Scene();
    var WIDTH = 480;
    var HEIGHT = 480;

    renderer = new THREE.WebGLRenderer({'antialias':true});
    renderer.setSize(WIDTH, HEIGHT);


    camera = new THREE.PerspectiveCamera(45, WIDTH/HEIGHT, 0.1, 20000);
    camera.position = camera_pos;
    camera.lookAt(axis_c);

    var mainLight = new THREE.DirectionalLight(0xffffff, 1);
    mainLight.position.set(5,50,50);

    var loader = new THREE.SceneLoader();
    loader.load("/js/rocket.json", function(s){
      scene = s.scene;
      rocket = s.objects['Rocket'];
      fire = s.objects['Fire'];

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
        if(firel<0.7) my = 300-e.pageY;
        else {
          mx=mx*0.2+xs;
          my=300;
        }
      }


      var logo = document.getElementById('logo');
      logo.classList.add('ani');
      logo.appendChild(renderer.domElement);

      var joinLink = document.getElementById('join');
      
      joinLink.onmouseover = function(e){
        firel = 0.8;
        firer = 0.1;
        var w = document.body.clientWidth/2;
        xs = w - e.pageX;
        if (xs>80) xs=160;
        else if (xs<-80) xs=-160;
        else xs = 0;
      }
      
      joinLink.onmouseout = function(e){
        firel = 0.4;
        firer = 0.2;
      }

      animate();
    });
}


function step(camera) {
  if (mx > 1000) mx = 1000;
  else if (mx < -1000) mx = -1000;
  if (my > 1000) my = 1000
  else if (my < -1000) my = -1000;

  delta.set(-mx, my, 0).applyAxisAngle(rot_axis, -0.02).sub(current_pos);

  if (delta.x>20) delta.x=20;
  else if (delta.x<-20) delta.x=-20;
  if (delta.y>50) delta.y=50;
  else if (delta.y<-50) delta.y=-50;

  speedX += delta.x/2000;
  speedY += delta.y/8000;

  speedX *= 0.95;
  speedY *= 0.80;

  rocket.rotateOnAxis(rot_axis, speedX);
  camera.position.applyAxisAngle(axis_w, speedY);
  
  delta.x *= 0.5;

  current_pos.add(delta);

  if(firescale>=1) firescale = firel - firer*Math.random();
  else firescale = firel + firer*Math.random();
  fire.scale.z = firescale;
  
  if (firel>0.7) {
    axis_s.set(-Math.random(), -Math.random(), 0);
    axis_s.multiplyScalar(0.4);
    camera.lookAt(axis_s);
  }
  else camera.lookAt(axis_c);
}

function animate() {
  requestAnimationFrame(animate);
  step(camera);
  renderer.render(scene, camera);
}


