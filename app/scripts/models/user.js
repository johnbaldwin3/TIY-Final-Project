//********************************
//Third Party Libraries
//********************************
var Backbone = require('backbone');
var $ = require('jquery');

//********************************
// Utilities
//********************************
var parse = require('../parse').parse;

//********************************
//Models
//********************************
var User = Backbone.Model.extend({
  idAttribute: 'objectId',
  urlRoot: function(){
    return parse.base_api_url + '/users';
  }
}, {
  //login in method for existing users
  login: function(credentials, callback){
    var url = parse.base_api_url + '/login?' + $.param(credentials);
    $.get(url).then(data => {
      var newUser = new User(data);
      User.store(newUser);
      callback(newUser);
    });
  },
  //signup method for existing users
  signup: function(credentials){
    var newUser = new User(credentials);
    newUser.save().then(() => {
      User.store(newUser);
    });
    return newUser;
  },
  //store method for local storage
  store: function(user){
    localStorage.setItem('user', JSON.stringify(user.toJSON()));
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
  }
});

//********************************
//Exports
//********************************
module.exports = {
  User
};
