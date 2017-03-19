//********************************
//Third Party Libraries
//********************************
var React = require('react');

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
      lat: 34.8526000,
      lng: -82.3940000
    };
    var markers = [
      {
        location: {
           lat: 34.8526000,
           lng: -82.3940000
         }
      }
    ]
    return (
      <BaseLayout>
        <div className="container">
          <div className="row">
            <ObservationListings observationCollection={this.state.observationCollection}/>

            <div className="col-sm-7" style={{height:400, background:'gray'}}>

            <GoogleMapContainer center={location} markers={markers}/>

            </div>

            <div className="col-sm-2">
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

class ObservationMapListing extends React.Component {
  constructor(props){
    super(props);

    // this.state = {
    //   zoom: 10,
    //
    // }
  }
  render() {
    return(
      <div
        defaultCenter={this.props.center}
        defaultZoom={this.props.zoom}>

        <img src="https://www.codeproject.com/KB/web-image/Google_map/sampleMap.JPG"/>

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

      return (
        <a key={obsListItem.get("objectId")} href="#observation/" className="list-group-item">
          <h4 className="list-group-item-heading">{obsListItem.get("commonName")}</h4>
          <p className="list-group-item-text">usernamehere</p>
          <p className="list-group-item-text">{obsListItem.get("observationDate").iso}</p>
        </a>
      )
    });
    return (
      <div className="col-sm-3">
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
