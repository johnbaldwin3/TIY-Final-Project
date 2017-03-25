//********************************
//Third Party Libraries
//********************************
var React = require('react');
var $ = require('jquery');
var Backbone = require('backbone');

//********************************
//Models, Utilities, Layouts
//********************************
var BaseLayout = require('./layouts/baselayout.jsx').BaseLayout;
var ObservationCollection = require('../models/observations.js').ObservationCollection;
var EnhancedObservationCollection = require('../models/observations.js').EnhancedObservationCollection;
var UserProfileCollection = require('../models/userProfile.js').UserProfileCollection;
var UserCollection = require('../models/user.js').UserCollection;

//********************************
//Observation Gallery (Photos Gallery)
//********************************
class ObservationGalleryContainer extends React.Component {
  constructor(props) {
    super(props);
    var observationCollection = new ObservationCollection();
    var enhancedObservationCollection = new EnhancedObservationCollection();
    var userObservations = new ObservationCollection();

    this.toggleGallery = this.toggleGallery.bind(this);
    this.handleNewCollection = this.handleNewCollection.bind(this);
    console.log('propsid', this.props.id);

    enhancedObservationCollection.urlSetter('observer');
    enhancedObservationCollection.fetch().then(() => {
      console.log('response', enhancedObservationCollection);

      this.setState({observationCollection: enhancedObservationCollection});
    });

    this.state = {
      observationCollection,
      userObservations,
      showGallery: true,


    }
  }
  handleNewCollection(data) {
    var clickedUser = data;
    var userObservations = new ObservationCollection();

    //fetch data related to user here

    /************************************
    Need a parseInclude to also fetch the user's profile
    for display purpose on the user's collections in UserListings
    component 
    *********************************/
    userObservations.parseWhere('observer', '_User', clickedUser).fetch().then(()=> {
      this.setState({userObservations});
    });
  }
  toggleGallery() {
    var state = !this.state.showGallery;
    this.setState({ showGallery: state });
  }
  render() {
    return (
      <BaseLayout>
        {this.state.showGallery ? <GalleryListings toggleGallery={this.toggleGallery} observationCollection={this.state.observationCollection}
        action={this.handleNewCollection}/> : <UserListings toggleGallery={this.toggleGallery} userId={this.props.id} userObservations={this.state.userObservations}
         /> }
      </BaseLayout>
    )
  }
}

//********************************
//Observation Gallery Listing (Photos Gallery)
//********************************
class GalleryListings extends React.Component {
  constructor(props) {
    super(props);
    this.handleUserList = this.handleUserList.bind(this);
  }
  handleUserList(e) {
    var url = "/observation/gallery/" + e.target.value + "/";
    this.props.action(e.target.value);
    Backbone.history.navigate(url, {trigger: true});
    this.props.toggleGallery();
  }
  render() {
    var obsGallery = this.props.observationCollection.map((obsPics)=> {

      return (

          <div key={obsPics.get("objectId")} className="col-sm-6 col-md-4">
            <div className="thumbnail">
              <img src={obsPics.get("pic").url} alt="..."/>
              <div className="caption">
                <h4>{obsPics.get("commonName")}</h4>
                <p><b>Observation &amp; Photo by:</b> {obsPics.get("observer").realOrNickName}</p>
                <p><button onClick={this.handleUserList} value={ obsPics.get("observer").objectId} className="btn btn-primary gal-button" role="button">{(obsPics.get("observer").realOrNickName) + "'s Other Lists"}</button> <a href={"#observation/" + obsPics.get('objectId') + '/' } className="btn btn-default gal-button" role="button">Observation Details</a></p>
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
//User Gallery Listing (Photos Gallery)
//********************************
class UserListings extends React.Component{
  constructor(props){
    super(props);
    var userCollection = new UserCollection();
    var userObservations = new ObservationCollection();

    this.handleBackToGallery = this.handleBackToGallery.bind(this);

  }
  handleBackToGallery(e) {
    Backbone.history.navigate('observation/gallery/', {trigger: true});
    this.props.toggleGallery();
  }
  render() {
    /************************************
    Need to get User Info from pointer with include
    so that the following will display user names
    *********************************/
    var obsGallery = this.props.userObservations.map((obsPics)=> {

      return (

        <div key={obsPics.get("objectId")} className="col-sm-6 col-md-4">
          <div className="thumbnail">
            <img src={obsPics.get("pic").url} alt="..."/>
            <div className="caption">
              <h4>{obsPics.get("commonName")}</h4>
              <p><b>Observation &amp; Photo by:</b> {obsPics.get("observer").realOrNickName}</p>
              <p><button onClick={this.handleBackToGallery} value={ obsPics.get("observer").objectId} className="btn btn-primary gal-button" role="button">Back to Gallery</button> <a href={"#observation/" + obsPics.get('objectId') + '/' } className="btn btn-default gal-button" role="button">Observation Details</a></p>
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
