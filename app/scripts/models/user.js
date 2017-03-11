var Backbone = require('backbone');
var $ = require('jquery');

var parse = require('../parse');


var User = Backbone.Model.extend({
  idAttribute: 'objectId',
  urlRoot: function(){
    return parse.base_api_url + '/users';
  }
}, {
  login: function(credentials, callback){
    var url = parse.base_api_url + '/login?' + $.param(credentials);
    $.get(url).then(data => {
      var newUser = new User(data);
      User.store(newUser);
      callback(newUser);
    });
  },
  signup: function(credentials){
    var newUser = new User(credentials);
    newUser.save().then(() => {
      User.store(newUser);
    });
    return newUser;
  },
  store: function(user){
    localStorage.setItem('user', JSON.stringify(user.toJSON()));
  },
  current: function(){
    var user = localStorage.getItem('user');

    // No Storage - Get Outta' Dodge
    if(!user){
      return false;
    }

    var currentUser = new User(JSON.parse(user));

    // No Token, Peace Out!
    if(!currentUser.get('sessionToken')){
      return false;
    }

    return currentUser;
  }
});

module.exports = {
  User
};
