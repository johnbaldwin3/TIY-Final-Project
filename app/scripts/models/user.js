//********************************
//Third Party Libraries
//********************************
var Backbone = require('backbone');
var $ = require('jquery');

//********************************
// Utilities
//********************************
var parse = require('../parse');

//********************************
//Models
//********************************
var User = parse.ParseModel.extend({
  idAttribute: 'objectId',
  urlRoot: 'https://jb3-serve.herokuapp.com/users'

}, {
  //login in method for existing users
  login: function(credentials, callback){
    var url = 'https://jb3-serve.herokuapp.com/login?' + $.param(credentials);

    parse.parse.initialize();

    $.get(url).then(data => {
      var newUser = new User(data);
      User.store(newUser);
      callback(newUser);
    });
    parse.parse.deinitialize();
  },
  //signup method for existing users
  signup: function(credentials, callback){
    var newUser = new User(credentials);
    newUser.save().then(() => {
      User.store(newUser);
      callback();
    });
    return newUser;
  },
  //store method for local storage
  store: function(user){
    localStorage.setItem('user', JSON.stringify(user.toJSON()));
  },
  //logout function *Thanks Andrea*
  logout: function(callback) {
    var url = 'https://jb3-serve.herokuapp.com/logout';
    parse.parse.initialize();

    $.post(url).then(data => {
      localStorage.removeItem('user');
      callback();
    });
  },
  editUser: function(callback) {
    var user = localStorage.getItem('user');

    if (!user) {
      return false
    }

    var currentUser = new User(JSON.parse(user));

    if (!currentUser.get('sessionToken')){
      return false
    }

    return currentUser.id;

    },
  //get the current user at any given time
  current: function(){
    var user = localStorage.getItem('user');
    // if no user in local storage - Exit
    if (!user) {
      return false;
    }

    var currentUser = new User(JSON.parse(user));

    // No Token, Peace Out!
    if (!currentUser.get('sessionToken')) {
      return false;
    }

    return currentUser;
  },

});

var UserCollection = parse.ParseCollection.extend({
  model: User,
  baseUrl: 'https://jb3-serve.herokuapp.com/users',
  parse: function(data) {
    return data.results;
  },
  arrangeUsers: function() {
    this.baseUrl = 'https://jb3-serve.herokuapp.com/users/?order=-observationCount'
  }

});

//********************************
//Exports
//********************************
module.exports = {
  User,
  UserCollection
};
