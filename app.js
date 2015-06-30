"use strict";

var obj = {};

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
  ixmodel.scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );
<<<<<<< HEAD
  ixmodel.camera = new THREE.PerspectiveCamera( 60, window.innerWidth/window.innerHeight, .1, 2000 );
=======
  ixmodel.camera = new THREE.PerspectiveCamera( 60, window.innerWidth/window.innerHeight, 0.1, 3000 );
  
>>>>>>> origin/multiple
  ixmodel.renderer = new THREE.WebGLRenderer();
  ixmodel.renderer.setClearColor( ixmodel.scene.fog.color );
  ixmodel.renderer.setSize(window.innerWidth, window.innerHeight);
  ixmodel.renderer.setPixelRatio( window.devicePixelRatio );

  ixmodel.camera.position.x = 0;
  ixmodel.camera.position.y = 0;
  ixmodel.camera.position.z = 500;

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

  var i;
  var geometry = new THREE.SphereGeometry( ixmodel.size, ixmodel.complexity, ixmodel.complexity );
  var material =  new THREE.MeshLambertMaterial( { color:0xffffff, shading: THREE.FlatShading } );

  for (i in obj) {
    ixmodel.mesh = new THREE.Mesh(geometry, material);
	ixmodel.mesh.position.x = ( Math.random() - 0.5 ) * 1000;
	ixmodel.mesh.position.y = ( Math.random() - 0.5 ) * 1000;
	ixmodel.mesh.position.z = ( Math.random() - 0.5 ) * 1000;
    ixmodel.mesh.updateMatrix();
    ixmodel.mesh.matrixAutoUpdate = false;
    ixmodel.textMesh = new THREEx.Text(obj[i].name);
<<<<<<< HEAD
	
	ixmodel.textMesh.position.x = ( Math.random() - 0.5 ) * 1000;
	ixmodel.textMesh.position.y = ( Math.random() - 0.5 ) * 1000;
	ixmodel.textMesh.position.z = ( Math.random() - 0.5 ) * 1000;

    ixmodel.titleTextMesh = new THREEx.Text('BREACH', { size: 10, height: 5 });
    ixmodel.titleTextMesh.position.set(0, 0, 50);
=======
    ixmodel.textMesh.position.set(random, random, random);
>>>>>>> origin/multiple

    ixmodel.scene.add( ixmodel.textMesh, ixmodel.mesh );
  }

  var light = new THREE.DirectionalLight( 0xffffff );
      light.position.set( 1, 1, 1 );
      ixmodel.scene.add( light );

      light = new THREE.DirectionalLight( 0x002288 );
      light.position.set( -1, -1, -1 );
      ixmodel.scene.add( light );

      light = new THREE.AmbientLight( 0x222222 );
      ixmodel.scene.add( light );

}


interactiveModel.prototype.render = function() {
  requestAnimationFrame(ixmodel.render);
  ixmodel.renderer.render( ixmodel.scene, ixmodel.camera );
  ixmodel.controls.update();
  document.body.appendChild(ixmodel.renderer.domElement);
}

var data = new parseJSON('data.json');
var ixmodel;

if (document.readyState) {
  setTimeout(function() {
    ixmodel = new interactiveModel();
    ixmodel.init();
    ixmodel.mesh(10, 100);
    ixmodel.render();
  }, 100);
}