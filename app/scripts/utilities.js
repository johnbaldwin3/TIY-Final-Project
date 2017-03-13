//********************************
//Third Party Libraries
//********************************
var $ = require('jquery');
var React = require('react');
var Backbone = require('backbone');

//********************************
//Utility Functions
//********************************

//checks navbar to see if the current link is active
function isActive (url) {
  return Backbone.history.fragment == url;
}

//if navbar is active, sets class to active
//changes the selected nav to be highlighted
function activeClass(url) {
  return isActive(url) ? 'active' : '';
}

//temporary function to get species list
//that matches user search terms
function searchSpecies(search) {
  var baseURL = 'https://api.gbif.org/v1/species/search?q=';
  var endURL = '&dataset_key=d7dddbf4-2cf0-4f39-9b2a-bb099caae36c&rank=SPECIES';
  var searchOrganism = search;
  var url = baseURL + searchOrganism + endURL;
  //return the ajax promise
  return  $.ajax({
    url : url,
    dataType: 'json'
  });
}

module.exports = {
  isActive,
  activeClass,
  searchSpecies
}
