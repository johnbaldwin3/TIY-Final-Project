//********************************
//Third Party Libraries
//********************************
var Backbone = require('backbone');
var $ = require('jquery');

//router reference
require('./router');

//DOM Ready
$(function(){
  Backbone.history.start();

});
