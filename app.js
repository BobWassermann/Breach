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

function interactiveModel(width, height, amount) {
  this.width = width;
  this.height = height;
  this.amount = amount;
}

interactiveModel.prototype.init = function() {

  THREE.log = function()    { console.log.apply(console, arguments) };
  THREE.warn = function()   { console.warn.apply(console, arguments) };
  THREE.error = function()  { console.error.apply(console, arguments) };

  ixmodel.scene = new THREE.Scene();
  ixmodel.scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );
  ixmodel.camera = new THREE.PerspectiveCamera( 60, window.innerWidth/window.innerHeight, 1, 1000 );
  ixmodel.renderer = new THREE.WebGLRenderer();

  ixmodel.renderer.setSize(window.innerWidth, window.innerHeight);

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

  ixmodel.controls.addEventListener( 'change', ixmodel.render );

}

interactiveModel.prototype.mesh = function(size, complexity) {
  ixmodel.size = size;
  ixmodel.complexity = complexity;

  var i;
  var geometry = new THREE.SphereGeometry( ixmodel.size, ixmodel.complexity, ixmodel.complexity );
  var material = new THREE.MeshBasicMaterial({ color: 0xffffff });

  for (i in obj) {
    var random = (Math.random() - 0.5) * 1000;
    ixmodel.mesh = new THREE.Mesh(geometry, material);
    ixmodel.mesh.position.set(random, random, random);
    ixmodel.mesh.updateMatrix();
    ixmodel.mesh.matrixAutoUpdate = false;
    ixmodel.textMesh = new THREEx.Text(obj[i].name);
    ixmodel.textMesh.position.set(random, random * 2, random);

    ixmodel.titleTextMesh = new THREEx.Text('BREACH', { size: 10, height: 5 });
    ixmodel.titleTextMesh.position.set(0, 0, 50);

    ixmodel.scene.add( ixmodel.textMesh, ixmodel.mesh, ixmodel.titleTextMesh );
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
  ixmodel.renderer.setClearColor( 0x000000, 1 );
  document.body.appendChild(ixmodel.renderer.domElement);
}

var data = new parseJSON('data.json');
var ixmodel;

if (document.readyState) {
  setTimeout(function() {
    ixmodel = new interactiveModel(window.innerWidth, window.innerHeight, obj.length);
    ixmodel.init();
    ixmodel.mesh(10, 20);
    ixmodel.render();
  }, 100);
}