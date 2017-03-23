//********************************
//Third Party Libraries
//********************************
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');

//********************************
//Models, Utilities, Layouts
//********************************
var User = require('./models/user').User;

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
var ObservationLightboxContainer = require('./components/observation-lightbox.jsx').ObservationLightboxContainer;
var ObservationListContainer = require('./components/observation-user-listing.jsx').ObservationListContainer;
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
    '' : 'index',
    //login page
    'login/' : 'login',
    //logout redirect to index
    'logout/' : 'logout',
    //sign up page
    'signup/' : 'signUp',
    //new user info
    'userinfo/' : 'userInfoAddViewEdit',
    //view user info for public users
    'userinfo/:id/' : 'userInfoAddViewEdit',
    //main dashboard : recent/top obs, map, user ranks
    'observation/' : 'observationsDash',
    //edit existing user observation (if user)
    'observation/:id/edit/' : 'observationsAddEdit',
    //view all of a single user's observations
    'observation/listings/:id' : 'observationListing',

    'observation/gallery/:id/' : 'observationGallery',
    //add new user observation
    'observation/add/(:speciesKey/)' : 'observationsAddWithSpeciesKey',
    //search for exact species before creating observation
    'observation/search/' : 'observationSearch',
    //view all observation photos
    'observation/gallery/' : 'observationGallery',
    //view all rankings in filterable fashion
    'observation/rankings/' : 'observationRankings',
    //display lightbox gallery
    'observation/lightbox/' : 'observationLightbox',
    //edit observation if


    'observation/listings/' : 'observationListing',

    'observation/:id/' : 'observationsAddEdit',


},
initialize: function(){

},
execute: function(callback, args, name) {
  var user = User.current();

  //if user is not user...
  if(!user){
    //if page name is not login, signup, index
    if(['login','signUp','index'].indexOf(name) === -1){
      //then navigate to index page
      this.navigate('', {trigger: true});
      //escape loop
      return false;
    }

  } else {

    if(['login', 'signUp'].indexOf(name)!== -1){
      this.navigate('#observation/', {trigger: true});

      return false;
    }

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
logout: function() {
  User.logout(()=> {
    this.navigate('', {trigger: true})
  });
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
observationGallery: function(id) {
  ReactDOM.render(
    React.createElement(ObservationGalleryContainer, {id: id}),
    document.getElementById('app')
  )
},
observationLightbox: function() {
  ReactDOM.render(
    React.createElement(ObservationLightboxContainer),
    document.getElementById('app')
  )
},
observationListing: function(id) {
  ReactDOM.render(
    React.createElement(ObservationListContainer, {id:id}),
    document.getElementById('app')
  )
}

});


//instantiate new router
var appRouter = new AppRouter();

//********************************
//Exports
//********************************
module.exports = {
  appRouter
};
