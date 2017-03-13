//********************************
//Third Party Libraries
//********************************
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');


//********************************
//Controllers
//********************************
var MarketingContainer = require('./components/marketing-container.jsx').MarketingContainer;
var LoginContainer = require('./components/login-container.jsx').LoginContainer;
var SignupContainer = require('./components/signup-container.jsx').SignupContainer;
var UserInfoContainer = require('./components/user-info-container.jsx').UserInfoContainer;
var ObservationDashContainer = require('./components/observation-dash-container.jsx').ObservationDashContainer;
var ObservationAddEditContainer = require('./components/observation-add-edit-container.jsx').ObservationAddEditContainer;
var ObservationGalleryContainer = require('./components/observation-gallery.jsx').ObservationGalleryContainer;
var ObservationSpeciesSearchContainer = require('./components/observation-search.jsx').ObservationSpeciesSearchContainer;

//********************************
//Models and Utilities
//********************************
var User = require('./models/user.js').User;
var parse = require('./parse').parse;

//********************************
//Backbone Router
//********************************
var AppRouter = Backbone.Router.extend({
  routes: {
  //splash marketing page
  '':'index',
  //login page
  'login/':'login',
  //sign up page
  'signup/':'signUp',
  //new user info
  'userinfo/': 'userInfoAddViewEdit',
  //view user info for public users
  'userinfo/:id/': 'userInfoAddViewEdit',
  //main dashboard : recent/top obs, map, user ranks
  'observation/' : 'observationsDash',
  //edit existing user observation (if user)
  'observation/:id/edit/':'observationsAddEdit',
  //view all of a single user's observations
  'observation/:id/list/':'observationList',
  //add new user observation
  'observation/add/':'observationAddEdit',
  //search for exact species before creating observation
  'observation/search/':'observationSearch',
  //view all observation photos
  'observation/gallery/':'observationGallery',
  //view all rankings in filterable fashion
  'observation/rankings/':'observationRankings'
},
initialize: function(){
  //Parse setup to set headers and configure API url
  parse.setup({
    base_api_url: 'https://jb3-serve.herokuapp.com'
  });
},
execute: function(callback, args, name) {
  //check to see if user is logged in
  //if user is not logged in, go to index
  var user = User.current();
  if (!user && name != 'login') {
    this.navigate('', {trigger: true});
    return false;
  }
  //if user is logged in, proceed to observation/ url
  if(user && name == 'login'){
    this.navigate('observation/', {trigger: true});
    return false;
  }

  return Backbone.Router.prototype.execute.apply(this, arguments);
  },
index: function() {
  ReactDOM.render(
    React.createElement(MarketingContainer),
    document.getElementById('app')
  )
},
login: function() {
  ReactDOM.render(
    React.createElement(LoginContainer),
    document.getElementById('app')
  )
},
signUp: function() {
  ReactDOM.render(
    React.createElement(SignupContainer),
    document.getElementById('app')
  )
},
userInfoAddViewEdit: function() {
  ReactDOM.render(
    React.createElement(UserInfoContainer),
    document.getElementById('app')
  )
},
observationsDash: function() {
  ReactDOM.render(
    React.createElement(ObservationDashContainer),
    document.getElementById('app')
  )
},
observationsAddEdit: function() {
  ReactDOM.render(
    React.createElement(ObservationAddEditContainer),
    document.getElementById('app')
  )
},
observationSearch: function() {
  ReactDOM.render(
    React.createElement(ObservationSpeciesSearchContainer),
    document.getElementById('app')
  )
},
observationGallery: function() {
  ReactDOM.render(
    React.createElement(ObservationGalleryContainer),
    document.getElementById('app')
  )
},

});


//instantiate new router
var appRouter = new AppRouter();
//export router
module.exports = {
  appRouter
};
