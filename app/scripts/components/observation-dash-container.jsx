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
var UserProfileCollection = require('../models/userProfile.js').UserProfileCollection;
var GoogleMapContainer = require('./map.jsx').GoogleMapContainer;

//********************************
//Observation Dashboard - Main App Screen
//********************************
class ObservationDashContainer extends React.Component {
  constructor(props) {
    super(props);

    var observationCollection = new ObservationCollection();

    observationCollection.fetch().then(()=> {
      this.setState({observationCollection: observationCollection});
      console.log(observationCollection);
      this.forceUpdate();
    });

    this.state = {
      observationCollection
    }
  }
  render() {
    var location = {
      lat: 39.124233,
      lng: -96.919273
    };
    var markers =
     this.state.observationCollection.map((obsLocations) => {

       return (
         {
           location: {
              lat: obsLocations.get('lat'),
              lng: obsLocations.get('lon')
            }
         }
       )

    });

    return (
      <BaseLayout>
        <div className="container">
          <div className="row">
            <ObservationListings observationCollection={this.state.observationCollection}/>

            <div className="col-sm-7" style={{height:600, background:'gray'}}>

            <GoogleMapContainer center={location} markers={markers}/>

            </div>

            <div className="col-sm-2 obs-users-dash">
              <div className="row">
                <button className="btn btn-primary col-sm-12" type="button">UserName <span className="badge">4</span>
                </button>
              </div>
              <br/>
              <div className="row">
                <button className="btn btn-primary col-sm-12" type="button">UserName <span className="badge">4</span>
                </button>
              </div>
              <br/>
              <div className="row">
                <button className="btn btn-primary col-sm-12" type="button">UserName <span className="badge">4</span>
                </button>
              </div>
              <br/>
              <div className="row">
                <button className="btn btn-primary col-sm-12" type="button">UserName <span className="badge">4</span>
                </button>
              </div>
              <br/>
              <div className="row">
                <button className="btn btn-primary col-sm-12" type="button">UserName <span className="badge">4</span>
                </button>
              </div>
              <br/>
              <div className="row">
                <button className="btn btn-primary col-sm-12" type="button">UserName <span className="badge">4</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </BaseLayout>
    )
  }
}

// class ObservationMapListing extends React.Component {
//   constructor(props){
//     super(props);
//
//     // this.state = {
//     //   zoom: 10,
//     //
//     // }
//   }
//   render() {
//     return(
//       <div
//         defaultCenter={this.props.center}
//         defaultZoom={this.props.zoom}>
//
//         <img src="https://www.codeproject.com/KB/web-image/Google_map/sampleMap.JPG"/>
//
//       </div>
//
//     )
//   }
// }

class ObservationListings extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    var obsListing = this.props.observationCollection.map((obsListItem)=> {
      // obsListItem.getUserProfile(obsListItem.get('objectId'))
      return (
        <a key={obsListItem.get("objectId")} href="#observation/" className="list-group-item">
          <h4 className="list-group-item-heading">{obsListItem.get("commonName")}</h4>
          <p className="list-group-item-text">usernamehere</p>
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
