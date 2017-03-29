var chai = require('chai');
var expect = chai.expect;
var $ = require('jquery');

var ObservationCollection = require('../app/scripts/models/observation.js').ObservationCollection;

// ##############################################
// Model Tests
// ##############################################

describe('ObservationCollection', function(){

  describe('should return a promise', function(){
    var promise = ObservationCollection.fetch();
    expect(promise).to.respondTo('then');
  });

  it('should resolve with an array of observations', function(done){
    ObservationCollection.fetch().then(data =>{
      var observation = data[0];

      expect(observation).to.have.property('objectId');
      expect(observation).to.have.property('observer');
      expect(observation).to.have.property('observationDate');

      done();
    })
  });

});
