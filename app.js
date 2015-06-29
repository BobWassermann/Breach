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
  THREE.MOUSE = {
      LEFT: 0,
      MIDDLE: 1,
      RIGHT: 2
  };

  ixmodel.scene = new THREE.Scene();
  ixmodel.camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, .1, 500 );
  ixmodel.renderer = new THREE.WebGLRenderer();

  ixmodel.renderer.setSize(window.innerWidth, window.innerHeight);

  ixmodel.camera.position.x = 0;
  ixmodel.camera.position.y = 0;
  ixmodel.camera.position.z = 400;

  ixmodel.controls = new THREE.OrbitControls(ixmodel.camera, ixmodel.renderer.domElement);

}

interactiveModel.prototype.mesh = function(size, complexity) {
  ixmodel.size = size;
  ixmodel.complexity = complexity;

  var i;
  var geometry = new THREE.SphereGeometry( ixmodel.size, ixmodel.complexity, ixmodel.complexity );
  var material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
  var random = Math.random() * 200;

  for (i in obj) {
    ixmodel.mesh = new THREE.Mesh(geometry, material);
    ixmodel.mesh.position.set(i * random, i * random, -i*100);
    ixmodel.textMesh = new THREEx.Text('Test');

    ixmodel.scene.add( ixmodel.textMesh, ixmodel.mesh );
  }
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
    ixmodel.mesh(100, 20);
    ixmodel.render();
  }, 100);
}