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
//Models & Collections
//********************************
var Observation = parse.ParseModel.extend({
  defaults: function() {
    return (
      {
        commonName: '',
        scientificName: '',
        originalDiscoveryInfo: '',
        //observationDate: new Date(),
        locationOfObservation: '',
        taxonTree: '',
        observationNotes: '',
        publicList: true
      }
    )
  },
  urlRoot: 'https://jb3-serve.herokuapp.com/classes/Observations/',

});
// var ObservationCollection = parse.ParseCollection.extend({
//  model: Observation,
//  baseUrl: 'https://jb3-serve.herokuapp.com/classes/Observations/',
//  renderUserObservations: function(field) {
//    this.baseUrl = 'https://jb3-serve.herokuapp.com/classes/Observations/?include=' + field;
//    return this.fetch();
//  }
// });
var ObservationCollection = parse.ParseCollection.extend({
  model: Observation,
  baseUrl: 'https://jb3-serve.herokuapp.com/classes/Observations/',
  parseWhereIncludeSetter: function(){

  },
});

var EnhancedObservationCollection = parse.ParseCollection.extend({
  model: Observation,
  baseUrl: 'https://jb3-serve.herokuapp.com/classes/Observations/',
  urlSetter: function(field) {
    //allows for dynamic search of pointer fields
    //field gets passed in on Component
    this.baseUrl = 'https://jb3-serve.herokuapp.com/classes/Observations/?include=' + field;
  },
  urlReset: function() {

    this.baseUrl = 'https://jb3-serve.herokuapp.com/classes/Observations/';

  }
})

//********************************
//Exports
//********************************
module.exports = {
  Observation,
  ObservationCollection,
  EnhancedObservationCollection
}
