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
        observationDate: new Date(),
        locationOfObservation: '',
        taxonTree: '',
        observationNotes: '',
        publicList: true
      }
    )
  },
  urlRoot: 'https://jb3-serve.herokuapp.com/classes/Observations/',
  getUserProfile: function(objectId) {
    var url = 'https://jb3-serve.herokuapp.com/users/' + objectId;
    parse.parse.initialize();
    /////////////////////////////
    $.get('https://jb3-serve.herokuapp.com/classes/Observations/?include=observer').then(response =>{

    console.log('here', response);
    
  });
    /////////////////////////////
  //   var name = $.get().done((results) => {
  //     console.log('ronn', results.realOrNickName);
  //       return results.realOrNickName;
  //     });
  //  return name;
  /////////////////////////////
  },
  // parse: function(data) {
  //   return data.results;
  // }

});

var ObservationCollection = parse.ParseCollection.extend({
  model: Observation,
  baseUrl: 'https://jb3-serve.herokuapp.com/classes/Observations/',
  parse: function(data) {
    return data.results;
  }

});

//********************************
//Exports
//********************************
module.exports = {
  Observation,
  ObservationCollection
}
