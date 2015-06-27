"use strict";

function parseJSON(file) {
  this.file = file;
  var xobj = new XMLHttpRequest();
  xobj.overrideMimeType('application/json');
  xobj.open('GET', file, true);
  
  xobj.onload = function() {
    var response = window.JSON.parse(xobj.responseText);
    var output = response.map(function(val, key) {
      obj[val.name] = val.year;
      delete obj[val.name].name;
    });
    for (var i in response) {
      counter++;
    }
    return counter;
  }

  xobj.send();
}

var counter = 0;
var obj = {};
var data = new parseJSON('data.json');