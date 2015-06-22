"use strict";

THREE.log = function()    { console.log.apply(console, arguments) };
THREE.warn = function()   { console.warn.apply(console, arguments) };
THREE.error = function()  { console.error.apply(console, arguments) };
THREE.MOUSE = {
    LEFT: 0,
    MIDDLE: 1,
    RIGHT: 2
};

var GetJSON = function (file) {

  function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType('application/json');
    xobj.open('GET', file, true);
    xobj.onreadystatechange = function() {
      if (xobj.readyState == 4 && xobj.status == '200') { callback(xobj.responseText) }
    };
    xobj.send(null);
  }

  function init() {
    loadJSON(function(response) {
      var actual_JSON = JSON.parse(response), i;
      var counter = 0;
      for (i in actual_JSON) {
        counter++;
        var name = actual_JSON[i].name;
        var year = actual_JSON[i].year;
        var recl = actual_JSON[i].records_lost;

        year += 2004;

        var meshSize = window.innerWidth / 150;
        var complexity = recl/1000000;
        // var complexity = 10;

        var geometry = new THREE.SphereGeometry( meshSize, complexity, complexity ); // size, complexity-x, complexity-y
        var material = new THREE.MeshBasicMaterial({ color: 0xdddddd, wireframe: true });

        var mesh = new THREE.Mesh(geometry, material);
        var breakRow = 8;

        if (counter < breakRow) {
          mesh.position.set(counter*30, 0, 0);
        } else if (counter > breakRow && counter < breakRow*2) {
          mesh.position.set((counter-breakRow)*30, -15, breakRow*2);
        } else if (counter > breakRow*2 && counter < breakRow*3) {
          mesh.position.set((counter-breakRow*2)*30, -30, breakRow*4);
        } else if (counter > breakRow*3 && counter < breakRow*4) {
          mesh.position.set((counter-breakRow*3)*30, -40, breakRow*6);
        }

        // experimental
        // if (counter % breakRow === breakRow) {
          // mesh.position.set(counter*30, 0, 0);
        // }
        // experimental  
        
        scene.add(mesh);

        var markup = '<div><p>' + name + '</p><p>' + year + '</p></div>';

        document.getElementById('content').innerHTML += markup;
      }
    });
  }
  init();
}

// Three js setup

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 45, window.innerWidth/window.innerHeight, .1, 500 );
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.x = 110;
camera.position.y = -30;
camera.position.z = 140;

var controls = new THREE.OrbitControls(camera, renderer.domElement);


function render() {
  requestAnimationFrame( render );
  renderer.render( scene, camera );
  controls.update();
}
render();

// Paint
var dataset = new GetJSON('data.json');
document.body.appendChild(renderer.domElement);