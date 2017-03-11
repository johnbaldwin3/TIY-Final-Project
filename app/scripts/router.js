//********************************
//Third Party Libraries
//********************************
var React = require('react');
var ReactDOM = require('react-dom');
var Backbone = require('backbone');


//********************************
//Controllers
//********************************
var MarketingContainer = require('./components/marketingcontainer.jsx').MarketingContainer;
var LoginContainer = require('./components/logincontainer.jsx').LoginContainer;
var SignupContainer = require('./components/signupcontainer.jsx').SignupContainer;
var UserInfoContainer = require('./components/userinfocontainer.jsx').UserInfoContainer;


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
  //view all observation photos
  'observation/gallery/':'observationGallery',
  //view all rankings in filterable fashion
  'observation/rankings/':'observationRankings'
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



});


//instantiate new router
var appRouter = new AppRouter();
//export router
module.exports = {
  appRouter
};
