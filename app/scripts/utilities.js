//********************************
//Third Party Libraries
//********************************
var $ = require('jquery');
var React = require('react');
var Backbone = require('backbone');
var EXIF = require('exif-js');

//********************************
//Utility Functions
//********************************

//checks navbar to see if the current link is active
function isActive (url) {
  return Backbone.history.fragment == url;
}

//if navbar is active, sets class to active
//changes the selected nav to be highlighted
function activeClass(url) {
  return isActive(url) ? 'active' : '';
}

function imageOrientationFix(file) {
  EXIF.getData(file,function() {
  var orientation = EXIF.getTag(this,"Orientation");
  var can = document.createElement("canvas");
  var ctx = can.getContext('2d');
  var thisImage = new Image;
  thisImage.onload = function() {
    can.width  = thisImage.width;
    can.height = thisImage.height;
    ctx.save();
    var width  = can.width;  var styleWidth  = can.style.width;
    var height = can.height; var styleHeight = can.style.height;
    if (orientation) {
      if (orientation > 4) {
        can.width  = height; can.style.width  = styleHeight;
        can.height = width;  can.style.height = styleWidth;
      }
      switch (orientation) {
      case 2: ctx.translate(width, 0);     ctx.scale(-1,1); break;
      case 3: ctx.translate(width,height); ctx.rotate(Math.PI); break;
      case 4: ctx.translate(0,height);     ctx.scale(1,-1); break;
      case 5: ctx.rotate(0.5 * Math.PI);   ctx.scale(1,-1); break;
      case 6: ctx.rotate(0.5 * Math.PI);   ctx.translate(0,-height); break;
      case 7: ctx.rotate(0.5 * Math.PI);   ctx.translate(width,-height); ctx.scale(-1,1); break;
      case 8: ctx.rotate(-0.5 * Math.PI);  ctx.translate(-width,0); break;
      }
    }

    ctx.drawImage(thisImage,0,0);
    ctx.restore();
    var dataURL = can.toDataURL();

    // at this point you can save the image away to your back-end using 'dataURL'
  }
  console.log('I ran this');
  // now trigger the onload function by setting the src to your HTML5 file object (called 'file' here)
  return thisImage.src = URL.createObjectURL(file);

});

}

//********************************
//Exports
//********************************
module.exports = {
  isActive,
  activeClass,
  imageOrientationFix
}
