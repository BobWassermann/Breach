"use strict";

var obj = {};
var textArr = [];
var lightArr = [];

function parseJSON(file) {
  this.file = file;
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType('application/json');
  xobj.open('GET', file, true);
  
  xobj.onload = function() {
    obj = JSON.parse(xobj.responseText);
  }

  xobj.send();
}

function interactiveModel() {
}

interactiveModel.prototype.init = function() {

  THREE.log = function()    { console.log.apply(console, arguments) };
  THREE.warn = function()   { console.warn.apply(console, arguments) };
  THREE.error = function()  { console.error.apply(console, arguments) };

  ixmodel.scene = new THREE.Scene();
  ixmodel.scene.fog = new THREE.FogExp2( 0xcccccc, 0.00075 );
  ixmodel.camera = new THREE.PerspectiveCamera( 60, window.innerWidth/window.innerHeight, 0.1, 10000 );
  
  ixmodel.renderer = new THREE.WebGLRenderer();
  ixmodel.renderer.setClearColor( ixmodel.scene.fog.color );
  ixmodel.renderer.setSize(window.innerWidth, window.innerHeight);
  ixmodel.renderer.setPixelRatio( window.devicePixelRatio );

  ixmodel.camera.position.x = 0;
  ixmodel.camera.position.y = 0;
  ixmodel.camera.position.z = 1000;

  ixmodel.controls = new THREE.TrackballControls(ixmodel.camera);
  ixmodel.controls.rotateSpeed = 1.0;
  ixmodel.controls.zoomSpeed = 1.2;
  ixmodel.controls.panSpeed = 0.8;

  ixmodel.controls.noZoom = false;
  ixmodel.controls.noPan = false;

  ixmodel.controls.staticMoving = true;
  ixmodel.controls.dynamicDampingFactor = 0.3;

  ixmodel.controls.keys = [ 65, 83, 68 ];

}

interactiveModel.prototype.mesh = function(size, complexity) {
  ixmodel.size = size;
  ixmodel.complexity = complexity;

  var i, x, y, z;
  var geometry = new THREE.SphereGeometry( ixmodel.size, ixmodel.complexity, ixmodel.complexity );

  for (i in obj) {
  	x = ( Math.random() - 0.5 ) * 1000; y = ( Math.random() - 0.5 ) * 1000; z = ( Math.random() - 0.5 ) * 1000;
	var randomColor = Math.random() * 0xffffff;
 	var material =  new THREE.MeshLambertMaterial( { color: randomColor, shading: THREE.FlatShading } );
    ixmodel.mesh = new THREE.Mesh(geometry, material);
  	ixmodel.mesh.position.x = x;
  	ixmodel.mesh.position.y = y;
  	ixmodel.mesh.position.z = z;
    ixmodel.mesh.scale.set( (obj[i].records_lost * 0.000000075) + 1, (obj[i].records_lost * 0.000000075) + 1, (obj[i].records_lost * 0.000000075) + 1 );
    ixmodel.mesh.updateMatrix();
    ixmodel.mesh.matrixAutoUpdate = false;
	var year = (obj[i].year < 10) ? '200'+obj[i].year : '20'+obj[i].year;
    ixmodel.textMesh = new THREEx.Text(obj[i].name + ' (' + year + ')', { 
      size: 3,
      height: 1
    });
	ixmodel.textMesh.material = material;
  	ixmodel.textMesh.position.x = x;
  	ixmodel.textMesh.position.y = y - (ixmodel.mesh.scale.y / 0.05);
  	ixmodel.textMesh.position.z = z;
	
	ixmodel.textMesh.quaternion.copy( ixmodel.camera.quaternion );
	
    ixmodel.textMesh.scale.set( (obj[i].records_lost * 0.00000005) + 1, (obj[i].records_lost * 0.00000005) + 1, (obj[i].records_lost * 0.00000005) + 1 );
	
	textArr[i] = ixmodel.textMesh;
	
    ixmodel.scene.add( ixmodel.textMesh, ixmodel.mesh );
  }

  var light = new THREE.DirectionalLight( 0xffffff );
      light.position.set( 1, 1, 1 );
      ixmodel.scene.add( light );
	  lightArr[0] = light;
      light = new THREE.DirectionalLight( 0x002288 );
      light.position.set( -1, -1, -1 );
      ixmodel.scene.add( light );
	  lightArr[1] = light;
      light = new THREE.AmbientLight( 0x222222 );
      ixmodel.scene.add( light );
	  lightArr[2] = light;
}


interactiveModel.prototype.render = function() {
  requestAnimationFrame(ixmodel.render);
  ixmodel.renderer.render( ixmodel.scene, ixmodel.camera );
  ixmodel.controls.update();
  for (var i in textArr) {
  	textArr[i].quaternion.copy( ixmodel.camera.quaternion );
  }
  for (var i in lightArr) {
  	lightArr[i].quaternion.copy( ixmodel.camera.quaternion );
  	lightArr[i].position.copy( ixmodel.camera.position );
  }
  document.body.appendChild(ixmodel.renderer.domElement);
}

var data = new parseJSON('data.json');
var ixmodel;

if (document.readyState) {
  document.querySelector('h1').classList.add('active');
  setTimeout(function() {
    ixmodel = new interactiveModel();
    ixmodel.init();
    ixmodel.mesh(10, 100);
    ixmodel.render();
  }, 100);
}