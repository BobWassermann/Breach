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
  var container, separation = 100, amountX = 50, amountY = 50, particles, particle;

  container = document.createElement('section');
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera( 75, this.width / this.height, 1, 10000 );
  camera.position.z = 1000;

  scene = new THREE.Scene();

  renderer = new THREE.CanvasRenderer();
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( this.width, this.height );
  container.appendChild( renderer.domElement );

  // particles

  var PI2 = Math.PI * 2;
  var material = new THREE.SpriteCanvasMaterial( {

    color: 0xCD5A5E,
    program: function ( context ) {

      context.beginPath();
      context.arc( 0, 0, 0.5, 0, PI2, true );
      context.fill();

    }

  } );

  for ( var i = 0; i < 1000; i ++ ) {

    particle = new THREE.Sprite( material );
    particle.position.x = Math.random() * 2 - 1;
    particle.position.y = Math.random() * 2 - 1;
    particle.position.z = Math.random() * 2 - 1;
    particle.position.normalize();
    particle.position.multiplyScalar( Math.random() * 10 + 450 );
    particle.scale.multiplyScalar( 2 );
    scene.add( particle );

  }

  // lines

  for (i in obj) {

    var vertexArr = [];
    var geometry = new THREE.Geometry();

    var vertex = new THREE.Vector3( Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1 );
    
    vertex.normalize();
    vertex.multiplyScalar( 450 );

    // var text = new THREEx.Text('Test');

    geometry.vertices.push( vertex );
    geometry.vertices.push( vertex.clone().multiplyScalar ( Math.random() * obj[i].records_lost/100000000 + 1) );


    var line = new THREE.Line( geometry, new THREE.LineBasicMaterial( { color: 0xCD5A5E, opacity: Math.random() } ) );
    scene.add( line);

  }


  //

  window.addEventListener( 'resize', onWindowResize, false );
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
}


function animate() {
  requestAnimationFrame( animate );
  render();
}

function render() {
  camera.position.x += ( mouseX - camera.position.x ) * .05;
  camera.position.y += ( - mouseY + 200 - camera.position.y ) * .05;
  camera.lookAt( scene.position );
  
  renderer.setClearColor( 0xF0E8D4, 1);
  renderer.render( scene, camera );
}

var mouseX = 0, mouseY = 0,

    windowHalfX = window.innerWidth / 2,
    windowHalfY = window.innerHeight / 2,

    SEPARATION = 200,
    AMOUNTX = 10,
    AMOUNTY = 10,

    camera, scene, renderer;

var data = new parseJSON('data.json');
controls = new THREE.OrbitControls(camera, renderer.domElement);

if (document.readyState) {
  setTimeout(function() {
    var ixmodel = new interactiveModel(window.innerWidth, window.innerHeight, obj.length);
    ixmodel.init();
    animate();
  }, 100);
}