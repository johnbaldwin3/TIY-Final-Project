//********************************
//Third Party Libraries
//********************************
var React = require('react');
var GoogleMapLoader = require('react-google-maps').GoogleMapLoader;
var GoogleMap = require('react-google-maps').GoogleMap;
var Marker = require('react-google-maps').Marker;
require('react-google-maps');

//********************************
// Map Component
//********************************

//some tips for set up from the following:
//****** https://www.youtube.com/watch?v=N1J7Q1qJPQM *******

class GoogleMapContainer extends React.Component {

  render() {
    var mapContainer = <div style={{height: '100%', widht: '100%' }}></div> ;
    var markers = this.props.markers.map((venue, i) => {

      var marker = {
        position: {
          lat: venue.location.lat,
          lng: venue.location.lng
        }
      }
      return <Marker key={i} {...marker} />
    });
    return (
      <GoogleMapLoader
        containerElement = { mapContainer }
        googleMapElement = {
          <GoogleMap

            defaultZoom={5}
            defaultCenter={this.props.center}

            options={{streetViewControl: false, mapTypeControl: false}}>
            {markers}
          </GoogleMap>
        }/>
    )
  }
}


// ref = { (map) => {
//   if (this.state.map != null)
//     return
//   this.setState({
//     map: map
//   })
// }}

  //onDragEnd={this.mapMoved.bind(this)}
//********************************
//Exports
//********************************
module.exports = {
  GoogleMapContainer
}
