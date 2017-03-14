//********************************
//Third Party Libraries
//********************************
var Backbone = require('backbone');
var _ = require('underscore');

//********************************
//Models
//********************************
var Organism = Backbone.Model.extend({
  idAttribute: 'speciesKey',
  getVernacularNames: function () {
    var vernacularNames = _.where(this.get('vernacularNames'), {language: "eng"});
    //console.log('VN', this.get('vernacularNames'));
    return _.pluck(vernacularNames, 'vernacularName').join(", ");
  },
  // getSpeciesDescription: function () {
  //   var description = _.where(this.get('descriptions'), {language: "eng"});
  //
  //   return _.pluck(descriptions)
  // },
  urlRoot: 'https://api.gbif.org/v1/species/'


});

//********************************
//Collections
//********************************
//url function to search for search term on API
var OrganismCollection = Backbone.Collection.extend({
  model: Organism,
  url: function() {
    var baseURL = 'https://api.gbif.org/v1/species/search?q=';
    var endURL = '&dataset_key=d7dddbf4-2cf0-4f39-9b2a-bb099caae36c&rank=SPECIES';
    var url = baseURL + this.searchTerm + endURL;

    return url;

  },
  parse: function(data) {
    return data.results;
  }
});

//********************************
//Exports
//********************************
module.exports = {
  Organism,
  OrganismCollection
};
