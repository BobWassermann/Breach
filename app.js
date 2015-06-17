"use strict";

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
      for (i in actual_JSON) {
        var name = actual_JSON[i].name;
        var year = actual_JSON[i].year;
        var recl = actual_JSON[i].records_lost;

        year += 2004;

        var markup = '<div><p>' + name + '</p><p>' + year + '</p></div>'

        document.getElementById('content').innerHTML += markup;
      }
    });
  }
  init();
}


var dataset = new GetJSON('data.json');