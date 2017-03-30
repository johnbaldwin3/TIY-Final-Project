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
$('.caption').hide();

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
    console.log('e', e.target.value);
    var url = "/observation/gallery/" + e.target.value + "/";
    Backbone.history.navigate(url, {trigger: true});
  }
  picClick(e) {
    //data-toggle="modal" data-toggle="#myModal"
    console.log(e.target.value);
  }
  render() {
    var obsGallery = this.props.observationCollection.map((obsPics)=> {
      var imageURL = obsPics.get("pic").url;
      return (
        <div key={obsPics.get("objectId")} className="col-sm-6 col-md-4 image-container">
          <div className="thumbnail">
            <a href={obsPics.get("pic").url}><img src={obsPics.get("pic").url} value={obsPics.get("pic").url}alt="..."/></a>
            <div className="caption">
              <h4>{obsPics.get("commonName")}</h4>
              <p><b>Observation &amp; Photo by:</b> {obsPics.get("observer").realOrNickName}</p>
              <p><button onClick={this.renderUserList} value={ obsPics.get("observer").objectId} className="btn btn-primary gal-button" role="button">{(obsPics.get("observer").realOrNickName) + "'s Other Lists"}</button> <a href={"#observation/" + obsPics.get('objectId') + '/' } className="btn btn-default obs-button" role="button"> Observation Details</a></p>
            </div>
          </div>
        </div>

      )
    });

    return(
      <div className="container">
        <div className="modal fade" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title" id="myModalLabel">Modal title</h4>
              </div>
              <div className="modal-body">

              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>
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
          <div key={obsPics.get("objectId")} className="col-sm-6 col-md-4 image-container">
            <div className="thumbnail">
              <img src={obsPics.get("pic").url} alt="..."/>
              <div className="caption">
                <h4 className="caption-title">{obsPics.get("commonName")}</h4>
                <p><b>Observation &amp; Photo by:</b> {obsPics.get("observer").realOrNickName}</p>
                <p><button onClick={this.handleBackToGallery} value={ obsPics.get("observer").objectId} className="btn btn-primary gal-button" role="button">Back to Gallery</button> <a href={"#observation/" + obsPics.get('objectId') + '/' } className="btn btn-default obs-button" role="button">Observation Details</a></p>
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





// <div key={obsPics.get("objectId")} className="image-container col-sm-6 col-md-4 ">
//   <div className="">
//     <img role="button" src={obsPics.get("pic").url} value={obsPics.get("pic").url}alt="..."/>
//     <div className="caption">
//       <h4>{obsPics.get("commonName")}</h4>
//       <p><b>Observation &amp; Photo by:</b> {obsPics.get("observer").realOrNickName}</p>
//       <p><button onClick={this.renderUserList} value={ obsPics.get("observer").objectId} className="btn btn-primary gal-button" role="button">{(obsPics.get("observer").realOrNickName) + "'s Other Lists"}</button> <a href={"#observation/" + obsPics.get('objectId') + '/' } className="btn btn-default gal-button" role="button"> Observation Details</a></p>
//     </div>
//   </div>
// </div>
//********************************
//Exports
//********************************
module.exports = {
  ObservationGalleryContainer
};
