//********************************
//Third Party Libraries
//********************************
var React = require('react');
var Moment = require('moment');
var Backbone = require('backbone');

//********************************
//Models, Utilities, Layouts
//********************************
//call in base layout
var BaseLayout = require('./layouts/baselayout.jsx').BaseLayout;
var ObservationCollection = require('../models/observations.js').ObservationCollection;
var UserCollection = require('../models/user.js').UserCollection;
var GoogleMapContainer = require('./map.jsx').GoogleMapContainer;
var EnhancedObservationCollection = require('../models/observations.js').EnhancedObservationCollection;
var User = require('../models/user.js').User;

//********************************
//Observation Dashboard - Main App Screen
//********************************
class ObservationDashContainer extends React.Component {
  constructor(props) {
    super(props);
    var userCollection = new UserCollection();
    var observationCollection = new ObservationCollection();
    var enhancedObservationCollection = new EnhancedObservationCollection();



    console.log("here is NAME", User.current().get("realOrNickName"));
    userCollection.arrangeUsers();
    userCollection.fetch().then(() => {
      console.log('upc', userCollection);
      this.setState({userCollection: userCollection});
    });
    enhancedObservationCollection.parseInclude('observer').fetch().then(()=> {
      this.setState({observationCollection: enhancedObservationCollection, userCollection: userCollection});
      // console.log(observationCollection);
      this.forceUpdate();
    });
    //});



    this.state = {
      observationCollection,
      userCollection
    }
  }
  render() {
    var location = {
      lat: 39.124233,
      lng: -96.919273
    };

    var markers =
     this.state.observationCollection.map((obsLocations) => {
       var tree = obsLocations.get('taxonTree');
       var kingdom = tree.substr(0, tree.indexOf(" "));
       var taxons = tree.split(" --> ");
       var classOfAnimal = taxons[2];
       var speciesObserved = obsLocations.get('commonName');
       var observer = obsLocations.get('observer').realOrNickName;
       var objectGetter = obsLocations.get('objectId');
       //console.log('objId', objectGetter);
       return (
         {
           location: {
              lat: obsLocations.get('lat'),
              lng: obsLocations.get('lon')
            },
            kingdom: kingdom,
            classOfAnimal: classOfAnimal,
            speciesObserved: speciesObserved,
            observer: observer,
            objectGetter: objectGetter
         }
       )

    });

    return (
      <BaseLayout>
        <div className="container">
          <div className="row">
            <h3 className="welcomer">Welcome Back, {User.current().get("realOrNickName")}</h3>
            <ObservationListings observationCollection={this.state.observationCollection}/>

            <div className="col-sm-7" style={{height:500, background:'gray', borderTop:"3px solid #474647", borderBottom:"3px solid #474647"}}>
            <GoogleMapContainer center={location} markers={markers} />

            </div>

            <UserListings userCollection={this.state.userCollection} />


            </div>
          </div>
      </BaseLayout>
    )
  }
}

class UserListings extends React.Component {
  constructor(props) {
    super(props);
    this.handleUserInfo = this.handleUserInfo.bind(this);


  }
  handleUserInfo(e) {
    console.log('etaget', e.target.value);
    var url = "/observation/gallery/" + e.target.value + "/";
    Backbone.history.navigate(url, {trigger: true});
  }
  render() {
    //console.log('tpup', this.props.userCollection);
    var users = this.props.userCollection.map((user) => {
      //console.log('here', user);
      return (

        <li key={user.get("objectId")} className="row list-group-item user-lister">
          <a className="user-link" style={{width: "100%"}}onClick={this.handleUserInfo}  type="button" value={user.get('objectId')}>{user.get("realOrNickName") ? user.get("realOrNickName") : user.get("username")} <span className="badge">{user.get("observationCount")}</span>
          </a>

        </li>

      );
    });
    return(
      <ul className="col-sm-2 obs-users-dash list-group">
         {users}
      </ul>
    )
  }
}

class ObservationListings extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    var obsListing = this.props.observationCollection.map((obsListItem)=> {
      // obsListItem.getUserProfile(obsListItem.get('objectId'))
      return (
        <a key={obsListItem.get("objectId")} href={"#observation/" + obsListItem.get('objectId') + '/' } className="list-group-item ">
          <h4 className="list-group-item-heading obs-titler">{obsListItem.get("commonName")}</h4>
          <h5 className="list-group-item-text obs-text">{obsListItem.get("observer").realOrNickName}</h5>
          <p className="list-group-item-text obs-text">{Moment(obsListItem.get("observationDate").iso).format('LL')}</p>
          <p className="list-group-item-text obs-text">{Moment(obsListItem.get("dateAndTime")).format('LTS')}</p>
        </a>
      )
    });
    return (
      <div className="col-sm-3 obs-list-dash">
        <div className="list-group lister">
          {obsListing}
        </div>
      </div>
    )
  }
}

module.exports = {
  ObservationDashContainer
};
