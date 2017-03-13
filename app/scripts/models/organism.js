//********************************
//Third Party Libraries
//********************************
var Backbone = require('backbone');

//********************************
//URL Function
//********************************
var baseURL = 'http://api.gbif.org/v1/species/search?q='


//********************************
//Models
//********************************

var Organism = Backbone.Model.extend({
  defaults: function() {
    return {

    }
  },


});


//var Collection = new OrganismCollection();
//Collection.searchTerm = .....
//collection.fetch().done....
var OrganismCollection = Backbone.Collection.extend({
model: Organism,

url: function() {
  var baseURL = 'https://api.gbif.org/v1/species/search?q=';
  var endURL = '&dataset_key=d7dddbf4-2cf0-4f39-9b2a-bb099caae36c&rank=SPECIES';
  var url = baseURL + this.searchTerm + endURL;
  return url;
  // return  $.ajax({
  //   url : url,
  //   dataType: 'json'
  // });
}
});

module.exports = {
  Organism,
  OrganismCollection
}
