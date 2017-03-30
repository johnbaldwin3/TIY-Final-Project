//********************************
//Third Party Libraries
//********************************
var React = require('react');
var Masonry = require('react-masonry-component');
var LazyLoad = require('react-lazyload');

//********************************
//Models, Utilities, Layouts
//********************************
var BaseLayout = require('./layouts/baselayout.jsx').BaseLayout;
var ObservationCollection = require('../models/observations.js').ObservationCollection;
var EnhancedObservationCollection = require('../models/observations.js').EnhancedObservationCollection;
var UserProfileCollection = require('../models/userProfile.js').UserProfileCollection;
var masonryOptions = {
transitionDuration: 0,
columnWidth: 200,

};

//********************************
//Observation LightBox (True Photo Gallery)
//********************************

class ObservationLightboxContainer extends React.Component {
  constructor(props){
    super(props);
    var observationCollection = new ObservationCollection();
    var enhancedObservationCollection = new EnhancedObservationCollection();

    enhancedObservationCollection.urlSetter('observer');
    enhancedObservationCollection.fetch().then(() => {
      //console.log('response', enhancedObservationCollection);

      this.setState({observationCollection: enhancedObservationCollection });
    });

    this.state = {
      observationCollection
    }
  }

  render() {
    var observationImagesArray = [];
    var childElements = this.state.observationCollection.map((image) => {

      return (
        //console.log('image', image.get("pic").url)
        //observationImagesArray.push({src: image.get("pic").url})
        <div key={image.get("objectId")} className="image-element-class">

          <img className="masonry-img" src={image.get("pic").url} />

        </div>
      )
    });

    return (

      <BaseLayout>
        <div className="container">
          <Masonry
            className={'my-gallery-class'}
            elementType={'div'}
            options={masonryOptions}
            disableImagesLoaded={false}
            updateOnEachImageLoad={false} >
                {childElements}
          </Masonry>
        </div>
      </BaseLayout>
    )
  }
}

// class LightboxComponent extends React.Component {
//   constructor(props){
//     super(props);
// onClose={this.closeLightbox}
//
//   }
//   render() {
//     return(
//       <Lightbox
//     )
//   }
// }

module.exports = {
  ObservationLightboxContainer
}
