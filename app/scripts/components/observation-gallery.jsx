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
var UserProfileCollection = require('../models/userProfile.js').UserProfileCollection;
var UserCollection = require('../models/user.js').UserCollection;

//********************************
//Observation Gallery (Photos Gallery)
//********************************
class ObservationGalleryContainer extends React.Component {
  constructor(props) {
    super(props);

    var observationCollection = new ObservationCollection();

    this.state = {
      props: this.props.id,
      observationCollection
    }

    if(props.id) {
      observationCollection.parseWhere('observer', '_User', props.id).parseInclude('observer').fetch().then(()=> {
      this.setState({ observationCollection });

    });
    } else {
      observationCollection.parseInclude('observer').fetch().done(() => {
        this.setState({ observationCollection })
      });

  }
}
  componentWillReceiveProps(nextProps) {
    var observationCollection = new ObservationCollection();

    if(nextProps.id) {
      this.setState({ props: nextProps.id });
      observationCollection.parseWhere('observer', '_User', nextProps.id).parseInclude('observer').fetch().then(()=> {
      this.setState({ observationCollection });
    });
    } else {
      this.setState( { props: null });
      observationCollection.whereClause = {};
      observationCollection.parseInclude('observer').fetch().done(() => {
        this.setState({ observationCollection })
      });
    }
  }

  render() {
    return (
      <BaseLayout>
        { this.state.props ? <UserListings observationCollection={this.state.observationCollection} /> : <GalleryListings observationCollection={this.state.observationCollection} /> }
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
    this.renderUserList = this.renderUserList.bind(this);
  }

  renderUserList(e) {
    var url = "/observation/gallery/" + e.target.value + "/";
    Backbone.history.navigate(url, {trigger: true});
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
                <p><button onClick={this.renderUserList} value={ obsPics.get("observer").objectId} className="btn btn-primary gal-button" role="button">{(obsPics.get("observer").realOrNickName) + "'s Other Lists"}</button> <a href={"#observation/" + obsPics.get('objectId') + '/' } className="btn btn-default gal-button" role="button"> Observation Details</a></p>
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
  }

  render() {
    var obsGallery;
    if( this.props.observationCollection) {
      obsGallery = this.props.observationCollection.map((obsPics)=> {
        console.log('obsPics');
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
    }

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
