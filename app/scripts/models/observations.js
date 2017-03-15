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
var Observation = parse.ParseModel.extend({
  urlRoot: 'https://jb3-serve.herokuapp.com/classes/Observations/'
});

var ObservationCollection = parse.ParseCollection.extend({
  model: Observation,
  baseUrl: 'https://jb3-serve.herokuapp.com/classes/Observations/'
});

//********************************
//Exports
//********************************
module.exports = {
  Observation,
  ObservationCollection
}
