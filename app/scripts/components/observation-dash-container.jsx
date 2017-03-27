//********************************
//Third Party Libraries
//********************************
var React = require('react');
var Moment = require('moment');

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
    userCollection.fetch().then(() => {
      console.log('upc', userCollection);
      this.setState({userCollection: userCollection});
    });
    //then(() => {
    enhancedObservationCollection.fetch().then(()=> {
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
       //console.log('taxons', taxons);
       var classOfAnimal = taxons[2];
       console.log('classOfAnimal', classOfAnimal );
       return (
         {
           location: {
              lat: obsLocations.get('lat'),
              lng: obsLocations.get('lon')
            },
            kingdom: kingdom,
            classOfAnimal: classOfAnimal
         }
       )

    });

    return (
      <BaseLayout>
        <div className="container">
          <div className="row">
            <h3>Welcome Back {User.current().get("realOrNickName")}</h3>
            <ObservationListings observationCollection={this.state.observationCollection}/>

            <div className="col-sm-7" style={{height:600, background:'gray'}}>

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



  }
  render() {
    //console.log('tpup', this.props.userCollection);
    var users = this.props.userCollection.map((user) => {
      //console.log('here', user);
      return (
        <div key={user.get("objectId")} className="row">
          <a type="button" className="btn btn-primary col-sm-12" type="button">{user.get("realOrNickName")} <span className="badge">4</span>
          </a>
        </div>

      );
    });
    return(
      <div className="col-sm-2 obs-users-dash">
         {users}
      </div>
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
        <a key={obsListItem.get("objectId")} href={"#observation/" + obsListItem.get('objectId') + '/' } className="list-group-item">
          <h4 className="list-group-item-heading">{obsListItem.get("commonName")}</h4>
          <p className="list-group-item-text">{obsListItem.get("observer").realOrNickName}</p>
          <p className="list-group-item-text">{Moment(obsListItem.get("observationDate").iso).format('LL')}</p>
        </a>
      )
    });
    return (
      <div className="col-sm-3 obs-list-dash">
        <div className="list-group">
          {obsListing}
        </div>
      </div>
    )
  }
}

module.exports = {
  ObservationDashContainer
};
