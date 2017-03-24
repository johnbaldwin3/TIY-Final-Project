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
    var userProfileCollection = new UserProfileCollection();
    var enhancedObservationCollection = new EnhancedObservationCollection();
   //#################################################
    var userCollection = new UserCollection();
    var userObservations = new ObservationCollection();

    // //this.handleBackToGallery = this.handleBackToGallery.bind(this);
    // userCollection.parseWhere('observer', '_User', 'vkpH6o1pep').fetch().then(()=> {
    //   console.log('responseUSERLIST', userCollection);
    // });
    // //################################################
    // this.toggleGallery = this.toggleGallery.bind(this);

    console.log('propsid', this.props.id);

    // if(this.props.id != null) {
    //   console.log('ifstatement');
    //   observationCollection.parseWhere('observer', 'Observations', this.props.id).fetch().then((response)=> {
    //     console.log('userId: ' + this.props.id + ' observations: ' + response);
    //   });


    //} else {

      enhancedObservationCollection.urlSetter('observer');
      enhancedObservationCollection.fetch().then(() => {
        console.log('response', enhancedObservationCollection);

        this.setState({observationCollection: enhancedObservationCollection});
      });

  //  }

    this.state = {
      observationCollection,
      userProfileCollection,
      showGallery: true,


    }
  }
  toggleGallery() {
   console.log('firing');
   var state = !this.state.showGallery;
   this.setState({ showGallery: state });
  }
  render() {
    return (
      <BaseLayout>
        {this.state.showGallery ? <GalleryListings toggleGallery={this.toggleGallery} observationCollection={this.state.observationCollection}/> : <UserListings toggleGallery={this.toggleGallery} userId={this.props.id} userCollection={this.state.observationCollection} /> }
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
   console.log("e", e.target.value);
   var url = "/observation/gallery/" + e.target.value + "/";
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
    userCollection.parseWhere('observer', 'Observations', 'EsxjstxjJi').fetch().then(()=> {
      console.log('responseUSERLIST', userCollection);
    });
  }
  componentWillReceiveProps(nextProps) {

  }
  handleBackToGallery(e) {
    Backbone.history.navigate('observation/gallery/', {trigger: true});
    this.props.toggleGallery();
  }
  render() {
    // var obsGallery = this.props.observationCollection.map((obsPics)=> {
    //
    //   return (
    //
    //     <div key={obsPics.get("objectId")} className="col-sm-6 col-md-4">
    //       <div className="thumbnail">
    //         <img src={obsPics.get("pic").url} alt="..."/>
    //         <div className="caption">
    //           <h4>{obsPics.get("commonName")}</h4>
    //           <p><b>Observation &amp; Photo by:</b> {obsPics.get("observer").realOrNickName}</p>
    //           <p><button onClick={this.handleBackToGallery} value={ obsPics.get("observer").objectId} className="btn btn-primary gal-button" role="button">Back to Gallery</button> <a href={"#observation/" + obsPics.get('objectId') + '/' } className="btn btn-default gal-button" role="button">Observation Details</a></p>
    //         </div>
    //       </div>
    //     </div>
    //
    //
    //   )
    //
    // });
    return(
      <div className="container">
        <div className="row">
          {"stuff here"}
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
