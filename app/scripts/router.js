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
var ObservationsAddEditContainer = require('./components/observation-add-edit-container.jsx').ObservationsAddEditContainer;
var ObservationGalleryContainer = require('./components/observation-gallery.jsx').ObservationGalleryContainer;
var ObservationSpeciesSearchContainer = require('./components/observation-search.jsx').ObservationSpeciesSearchContainer;

//********************************
//Models and Utilities
//********************************
//var User = require('./models/user.js').User;
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
    'observation/:id/edit/' : 'observationsAddEdit',
    //view all of a single user's observations
    'observation/:id/list/' : 'observationList',
    //add new user observation
    'observation/add/(:speciesKey/)' : 'observationsAddWithSpeciesKey',
    //search for exact species before creating observation
    'observation/search/' : 'observationSearch',
    //view all observation photos
    'observation/gallery/' : 'observationGallery',
    //view all rankings in filterable fashion
    'observation/rankings/' : 'observationRankings'
},
 initialize: function(){

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
observationSearch: function() {
  ReactDOM.render(
    React.createElement(ObservationSpeciesSearchContainer),
    document.getElementById('app')
  )
},
observationsAddEdit: function(id, speciesKey) {
  ReactDOM.render(
    React.createElement(ObservationsAddEditContainer, {id: id, speciesKey: speciesKey}),
    document.getElementById('app')
  )
},
observationsAddWithSpeciesKey: function(speciesKey){
  this.observationsAddEdit(null, speciesKey);
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

//********************************
//Exports
//********************************
module.exports = {
  appRouter
};
