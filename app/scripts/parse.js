var $ = require('jquery');

var parse = {
  base_api_url: '',
  setup: function(config){
    if(config.base_api_url){
      this.base_api_url = config.base_api_url;
    }

    $.ajaxSetup({
      beforeSend: function(xhr){
        xhr.setRequestHeader("X-Parse-Application-Id", "tiygvl2017");
        xhr.setRequestHeader("X-Parse-REST-API-Key", "sleeper");

        if(config.sessionId){
          xhr.setRequestHeader("X-Parse-Session-Token", sessionId);
        }
      }
    });
  }
}

module.exports = parse;
