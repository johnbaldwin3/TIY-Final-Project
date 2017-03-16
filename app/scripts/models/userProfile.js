//********************************
//Third Party Libraries
//********************************
var Backbone = require('backbone');

//********************************
// Utilities
//********************************
var parse = require('../parse');


//********************************
//Models & Collections
//********************************
var UserProfile = parse.ParseModel.extend({
  defaults: function() {
    return (
      {
        pic: null,
        realOrNickName: '',
        bioInfo: '',
        speciesInterests: '',
        birthday: new Date(),

      }
    )
  },
  urlRoot: 'https://jb3-serve.herokuapp.com/classes/UserProfiles/'
});


//********************************
//Exports
//********************************
module.exports = {
  UserProfile
};
