//********************************
//Third Party Libraries
//********************************
var Backbone = require('backbone');

//********************************
//Models
//********************************
var Organism = Backbone.Model.extend({
  
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

  }
});

//********************************
//Exports
//********************************
module.exports = {
  Organism,
  OrganismCollection
};
