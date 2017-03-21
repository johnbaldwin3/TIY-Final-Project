//********************************
//Third Party Libraries
//********************************
var React = require('react');
var $ = require('jquery');
var Parse = require('parse');

//********************************
//Models, Utilities, Layouts
//********************************
var BaseLayout = require('./layouts/baselayout.jsx').BaseLayout;
var ObservationCollection = require('../models/observations.js').ObservationCollection;

var EnhancedObservationCollection = require('../models/observations.js').EnhancedObservationCollection;
//var User = require('../models/user.js').User;
var UserProfileCollection = require('../models/userProfile.js').UserProfileCollection;
//var UserProfile = require('../models/userProfile.js').UserProfile;
//********************************
//Observation Gallery (Photos Gallery)
//********************************
class ObservationGalleryContainer extends React.Component {
  constructor(props) {
    super(props);
    var observationCollection = new ObservationCollection();
    var userProfileCollection = new UserProfileCollection();
    var enhancedObservationCollection = new EnhancedObservationCollection();

    // console.log('log', observationCollection.includer('observer').then((response) => {
    //   console.log('response', response);
    // }));
    // userProfileCollection.fetch().then(() => {
    //   this.setState({userProfileCollection: userProfileCollection});
    //   this.forceUpdate();
    // });
    enhancedObservationCollection.fetch().then(() => {
      console.log('response', enhancedObservationCollection);

      this.setState({observationCollection: enhancedObservationCollection });
    });
    //currentCollection.set('objectId', props.id);
    // observationCollection.fetch('observer').then((response)=> {
    //   //console.log('response', response);
    //   this.setState({observationCollection: observationCollection});
    //   this.forceUpdate();
    //   // userProfileCollection.fetch().then(()=> {
    //   //   this.setState({userProfileCollection: userProfileCollection});
    //   //  this.setState({observationCollection: observationCollection});
    // });
      //console.log(observationCollection);

    this.state = {
      observationCollection,
      userProfileCollection
    }
  }
  render() {
    return (
      <BaseLayout>
        <GalleryListings observationCollection={this.state.observationCollection}/>
      </BaseLayout>
    )
  }
}

class GalleryListings extends React.Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   userProfileCollection: this.props.userProfileCollection
    // }
  }
  // componentWillReceiveProps(nextProps) {
  //   var newState = $.extend({}, this.state, nextProps.userProfileCollection.toJSON());
  //   this.setState(newState);
  // }

  render() {
    //console.log('upc', this.props.userProfileCollection);
    //console.log('tpoc', this.props.observationCollection);
    var obsGallery = this.props.observationCollection.map((obsPics)=> {

      return (

          <div key={obsPics.get("objectId")} className="col-sm-6 col-md-4">
            <div className="thumbnail">
              <img src={obsPics.get("pic").url} alt="..."/>
              <div className="caption">
                <h3>{obsPics.get("commonName")}</h3>
                <p>Observed By: {obsPics.get("observer").realOrNickName}</p>
                <p><a href="#" className="btn btn-primary" role="button">{"See " + (obsPics.get("observer").realOrNickName) + "'s Other Lists"}</a> <a href={"#observation/" + obsPics.get('objectId') + '/' } className="btn btn-default" role="button">Observation Details</a></p>
              </div>
            </div>
          </div>

      )

    });

    return(
      <div className="container">
        <div className="row">
          {obsGallery}
        </div>
      </div>
    )
  }

}

//********************************
//Exports
//********************************
module.exports = {
  ObservationGalleryContainer
};
