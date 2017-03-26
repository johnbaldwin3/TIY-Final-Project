// //********************************
// //Third Party Libraries
// //********************************
// var $ = require('jquery');
// var Backbone = require('backbone');
//
// var parse = {
//   serverURL: '',
//   initialize: function(config){
//     config = config || {};
//
//     if(config.serverURL){
//       this.serverURL = config.serverURL;
//     }
//
//     $.ajaxSetup({
//       beforeSend: function(xhr){
//         xhr.setRequestHeader("X-Parse-Application-Id", "tiygvl2017");
//         xhr.setRequestHeader("X-Parse-REST-API-Key", "sleeper");
//
//         if(config.sessionId){
//           xhr.setRequestHeader("X-Parse-Session-Token", config.sessionId);
//         }
//       }
//     });
//   },
//   deinitialize: function(){
//     $.ajaxSetup({
//       beforeSend: function(xhr){
//         xhr.setRequestHeader("X-Parse-Application-Id", null);
//         xhr.setRequestHeader("X-Parse-REST-API-Key", null);
//         xhr.setRequestHeader("X-Parse-Session-Token", null);
//       }
//     });
//   }
// }
//
// var ParseModel = Backbone.Model.extend({
//   idAttribute: 'objectId',
//   sync: function(){
//     var User = require('./models/user').User;
//     var user = User.current();
//
//     if(user){
//       parse.initialize({sessionId: user.get('sessionToken')});
//     }else{
//       parse.initialize();
//     }
//
//     var xhr = Backbone.Model.prototype.sync.apply(this, arguments);
//
//     parse.deinitialize();
//
//     return xhr;
//   },
//   save: function(key, val, options){
//     delete this.attributes.createdAt;
//     delete this.attributes.updatedAt;
//
//     return Backbone.Model.prototype.save.apply(this, arguments);
//   },
//   setPointer: function(field, parseClass, objectId){
//     var pointerObject = {
//       "__type": "Pointer",
//       "className": parseClass,
//       "objectId": objectId
//     };
//
//     this.set(field, pointerObject);
//
//     return this;
//   }
// });
//
// var ParseCollection = Backbone.Collection.extend({
//   whereClause: {}, includeClause: 0,
//   parseWhere: function(field, value, objectId){
//     // If an objectId is passed in then we are building a pointer where
//     if(objectId){
//       value = {
//         field: field,
//         className: value,
//         objectId: objectId,
//         '__type': 'Pointer'
//       };
//     }
//
//     this.whereClause[field] = value;
//
//     return this;
//   },
//
//   parseInclude: function(string) {
//     this.includeClause = string;
//     return this;
//   },
//
//   url: function(){
//     var url = this.baseUrl;
//
//     if(Object.keys(this.whereClause).length > 0 && this.includeClause.length > 0) {
//       url += '?where=' + JSON.stringify(this.whereClause) + '&include=' + this.includeClause;
//       this.whereClause = {};
//       this.includeClause = 0;
//     } else if (Object.keys(this.whereClause).length > 0) {
//       url += '?where=' + JSON.stringify(this.whereClause);
//       this.whereClause = {};
//     } else if (this.includeClause.length > 0) {
//       url += '?include=' + this.includeClause;
//       this.includeClause = null;
//     }
//
//     return url;
//   },
//   parse: function(data){
//     return data.results;
//   },
//   sync: function(){
//     var User = require('./models/user').User;
//     var user = User.current();
//
//     if(user){
//       parse.initialize({sessionId: user.get('sessionToken')});
//     }else{
//       parse.initialize();
//     }
//
//     var xhr = Backbone.Collection.prototype.sync.apply(this, arguments);
//
//     parse.deinitialize();
//
//     return xhr;
//   },
// });
//
// var ParseFile = ParseModel.extend({
//   urlRoot: function(){
//     return 'https://jb3-serve.herokuapp.com/files/' + this.get('name');
//   }
// });
//
// //********************************
// //Exports
// //********************************
// module.exports = {
//   parse,
//   ParseModel,
//   ParseCollection,
//   ParseFile
// };
//
//
//



/*****************************************************

        John's WORK BELOW

****************************************************/




//********************************
//Third Party Libraries
//********************************
var $ = require('jquery');
var Backbone = require('backbone');

var parse = {
  serverURL: '',
  initialize: function(config){
    config = config || {};

    if(config.serverURL){
      this.serverURL = config.serverURL;
    }

    $.ajaxSetup({
      beforeSend: function(xhr){
        xhr.setRequestHeader("X-Parse-Application-Id", "tiygvl2017");
        xhr.setRequestHeader("X-Parse-REST-API-Key", "sleeper");

        if(config.sessionId){
          xhr.setRequestHeader("X-Parse-Session-Token", config.sessionId);
        }
      }
    });
  },
  deinitialize: function(){
    $.ajaxSetup({
      beforeSend: function(xhr){
        xhr.setRequestHeader("X-Parse-Application-Id", null);
        xhr.setRequestHeader("X-Parse-REST-API-Key", null);
        xhr.setRequestHeader("X-Parse-Session-Token", null);
      }
    });
  }
}

var ParseModel = Backbone.Model.extend({
  idAttribute: 'objectId',
  sync: function(){
    var User = require('./models/user').User;
    var user = User.current();

    if(user){
      parse.initialize({sessionId: user.get('sessionToken')});
    }else{
      parse.initialize();
    }

    var xhr = Backbone.Model.prototype.sync.apply(this, arguments);

    parse.deinitialize();

    return xhr;
  },
  save: function(key, val, options){
    delete this.attributes.createdAt;
    delete this.attributes.updatedAt;

    return Backbone.Model.prototype.save.apply(this, arguments);
  },
  setPointer: function(field, parseClass, objectId){
    var pointerObject = {
      "__type": "Pointer",
      "className": parseClass,
      "objectId": objectId
    };

    this.set(field, pointerObject);

    return this;
  }
});

var ParseCollection = Backbone.Collection.extend({
  whereClause: {},
  includeClause: {},
  parseWhere: function(field, value, objectId){
    // If an objectId is passed in then we are building a pointer where
    if(objectId){
      value = {
        '__type': 'Pointer',
        className: value,
        objectId: objectId,

      };
    }

    this.whereClause[field] = value;
    console.log('parseWhere', this.whereClause);
    return this;
  },
  parseInclude: function(field, value, objectId) {
    if(objectId) {
      value = {
        '__type': 'Pointer',
        className: value,
        objectId: objectId,

      };
   }
   this.includeClause[field] = value;
   return this;
  },
  parseWhereInclude: function() {

  },
  url: function(){
   var url = this.baseUrl;

   if(Object.keys(this.whereClause).length > 0 && Object.keys(this.includeClause).length > 0){
     url +=  '?include=' + JSON.stringify(this.includeClause) + '&where=' + JSON.stringify(this.whereClause);
     this.whereClause = {};
     this.includeClause = {};
     console.log('fireme1', url);
   } else if(Object.keys(this.whereClause).length > 0) {
       url += '?where=' + JSON.stringify(this.whereClause);
       this.whereClause = {};
       console.log('fireme2', url);
   } else if(Object.keys(this.whereClause).length == 0 && Object.keys(this.includeClause).length > 0) {
     url += '?include=' + JSON.stringify(this.includeClause);
     this.includeClause = {};
     console.log('fireme3', url);
   }

   return url;
  },

  parse: function(data){
    return data.results;
  },
  sync: function(){
    var User = require('./models/user').User;
    var user = User.current();

    if(user){
      parse.initialize({sessionId: user.get('sessionToken')});
    }else{
      parse.initialize();
    }

    var xhr = Backbone.Collection.prototype.sync.apply(this, arguments);

    parse.deinitialize();

    return xhr;
  },

});

var ParseFile = ParseModel.extend({
  urlRoot: function(){
    return 'https://jb3-serve.herokuapp.com/files/' + this.get('name');
  }
});

//********************************
//Exports
//********************************
module.exports = {
  parse,
  ParseModel,
  ParseCollection,
  ParseFile
};
