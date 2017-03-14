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


//********************************
//Exports
//********************************
module.exports = {
  isActive,
  activeClass
}
