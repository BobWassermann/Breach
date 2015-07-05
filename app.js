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

function modal(trigger, type) {
  this.trigger = trigger;
  this.type = type;
  if (this.type === 'about') {
    document.querySelector(this.trigger).addEventListener('click', function(e){
      e.preventDefault();
      document.body.innerHTML += '<div class="modal"><div class="container"><i class="close">x</i><h2>About</h2><article><p>Ever wondered how many data breaches took place in the last years? Hold on, wait, even better… Ever wondered how much data got stolen from big companies in the past years?</p><p>It’s a universe of data. And hey, let me tell you that story by, well, creating a universe.</p></article></div></div>';
    });
  } else if (this.type === 'faq') {
    document.querySelector(this.trigger).addEventListener('click', function(e){
      e.preventDefault();
      document.body.innerHTML += '<div class="modal"><div class="container"><i class="close">x</i><h2>FAQ</h2><article><dl><dt>I’m super hyped about this thing, but it just doesn’t load</dt><dd>Damn. This could be few things. Are you on the latest Chrome or Safari? Do you have a pretty computer or new iPhone? If so, just refresh the page, the randomizer just went crazy. If not, I’m extremely sorry, I can’t make this thing compatible with your machine.</dd><dt>How is this made?</dt><dd>Three.js and some Javascript superpowers.</dd><dt>What font is it your using?</dt>  <dd>Inconsolata, you can get it for free on Google Webfonts<dd><dt>All your CSS is inline in your header, what are you? An animal?</dt><dd>I really, really have to. Performance thingies.</dd></dl></article></div></div>';
    });
  }
  // document.querySelector('i.close').addEventListener('click', function(){ document.body.removeChild(document.querySelector('.modal')) });
}

interactiveModel.prototype.init = function() {

  THREE.log = function()    { console.log.apply(console, arguments) };
  THREE.warn = function()   { console.warn.apply(console, arguments) };
  THREE.error = function()  { console.error.apply(console, arguments) };

  ixmodel.scene = new THREE.Scene();
  //ixmodel.scene.fog = new THREE.FogExp2( 0xcccccc, 0.00075 );
  ixmodel.camera = new THREE.PerspectiveCamera( 60, window.innerWidth/window.innerHeight, 0.1, 10000 );
  
  ixmodel.renderer = new THREE.WebGLRenderer();
  ixmodel.renderer.setClearColor( 0xcccccc ); //ixmodel.scene.fog.color );
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
	var randomColor = Math.random() * 0x932B2F;
 	var material =  new THREE.MeshPhongMaterial( { color: randomColor, shading: THREE.FlatShading, shininess: 180 } );
    ixmodel.mesh = new THREE.Mesh(geometry, material);
  	ixmodel.mesh.position.x = x;
  	ixmodel.mesh.position.y = y;
  	ixmodel.mesh.position.z = z;
    ixmodel.mesh.scale.set( (obj[i].records_lost * 0.000000075) + 1, (obj[i].records_lost * 0.000000075) + 1, (obj[i].records_lost * 0.000000075) + 1 );
    ixmodel.mesh.updateMatrix();
    ixmodel.mesh.matrixAutoUpdate = false;
	var year = (obj[i].year < 10) ? '200'+obj[i].year : '20'+obj[i].year;
	var text = new String(obj[i].name + ' (' + year + ')');
    ixmodel.textMesh = new THREEx.Text(text, { 
      size: 3,
      height: 0.2,
      font: 'inconsolata'
    });
	ixmodel.textMesh.material = material;
  	ixmodel.textMesh.position.x = x;
  	ixmodel.textMesh.position.y = y - (ixmodel.mesh.scale.y / 0.07);
  	ixmodel.textMesh.position.z = z;
	
	ixmodel.textMesh.quaternion.copy( ixmodel.camera.quaternion );
	
    ixmodel.textMesh.scale.set( (obj[i].records_lost * 0.00000005) + 1, (obj[i].records_lost * 0.00000005) + 1, (obj[i].records_lost * 0.00000005) + 1 );
	
	textArr.push(ixmodel.textMesh);
	
	var text2 = new String('Records lost: '+obj[i].records_lost);
    ixmodel.textMesh2 = new THREEx.Text(text2, { 
      size: 3,
      height: 0.2,
      font: 'inconsolata'
    });
	ixmodel.textMesh2.material = material;
  	ixmodel.textMesh2.position.x = ixmodel.textMesh.position.x;
  	ixmodel.textMesh2.position.y = ixmodel.textMesh.position.y - (ixmodel.textMesh.scale.y / 0.19);
  	ixmodel.textMesh2.position.z = ixmodel.textMesh.position.z;
	
	ixmodel.textMesh2.quaternion.copy( ixmodel.camera.quaternion );
	
    ixmodel.textMesh2.scale.set( (obj[i].records_lost * 0.000000025) + 1, (obj[i].records_lost * 0.000000025) + 1, (obj[i].records_lost * 0.000000025) + 1 );
	textArr.push(ixmodel.textMesh2);
	
    ixmodel.scene.add( ixmodel.textMesh, ixmodel.textMesh2, ixmodel.mesh );
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
      if(i === 1){
      lightArr[i].quaternion.copy( ixmodel.camera.quaternion * -1 );
      lightArr[i].position.copy( ixmodel.camera.position * -1 );
    } else {
      lightArr[i].quaternion.copy( ixmodel.camera.quaternion );
      lightArr[i].position.copy( ixmodel.camera.position );
    }
  }
  document.body.appendChild(ixmodel.renderer.domElement);
}

var data = new parseJSON('data.json');
var ixmodel;
var aboutModal = new modal('nav ul li:nth-child(1)', 'about');
var faqModal = new modal('nav ul li:nth-child(2)', 'faq');

if (document.readyState) {
  document.querySelector('h1').classList.add('active');
  setTimeout(function() {
    ixmodel = new interactiveModel();
    ixmodel.init();
    ixmodel.mesh(10, 100);
    ixmodel.render();
  }, 100);
}