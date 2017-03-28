//********************************
//Third Party Libraries
//********************************
var React = require('react');
var GoogleMapLoader = require('react-google-maps').GoogleMapLoader;
var GoogleMap = require('react-google-maps').GoogleMap;
var Marker = require('react-google-maps').Marker;
var MarkerClusterer = require('react-google-maps/lib/addons/MarkerClusterer');
require('react-google-maps');
var InfoWindow = require('react-google-maps').InfoWindow;
//********************************
// Map Component
//********************************


//some tips for set up from the following:
//****** https://www.youtube.com/watch?v=N1J7Q1qJPQM *******

class GoogleMapContainer extends React.Component {
  constructor(props){
    super(props);

    this.iconChooser = this.iconChooser.bind(this);
    this.handleMarkerClick = this.handleMarkerClick.bind(this);
  }
  componentWillReceiveProps(nextProps) {

  }
  handleMarkerClick(e) {
    //console.log(e);
  }
  iconChooser(kingdom, classOf) {
    //pics icon based on type of observed species
    if(kingdom == 'Animalia') {

      if(classOf == 'Mammalia') {

        return './images/tiger-2.png';

      } else if (classOf == 'Insecta') {

        return './images/butterfly-2.png';

      } else if (classOf == 'Aves') {

        return './images/duck-export.png';

      } else if (classOf == 'Reptilia') {

        return './images/snakes.png';

      } else if (classOf == 'Actinopterygii') {

        return './images/fish.png';

      } else if (classOf == 'Arachnida') {

        return './images/spider.png';

      } else if (classOf == 'Amphibia') {

        return './images/frog-2.png';

      } else {

        return './images/bear.png';

      }

      return './images/frog-2.png';

    } else if (kingdom == 'Plantae') {

      return './images/flowers.png';

    } else if (kingdom == 'Fungi') {

      return './images/mushroom.png';

    } else if (kingdom == 'Archaea' || kingdom == 'Bacteria') {

      return './images/bacteria.png'

    } else {

      return './images/frog-2.png'

    }

  }
  render() {
    var mapContainer = <div style={{height: '100%', width: '100%' }}></div> ;
    var markers = this.props.markers.map((venue, i) => {
      //console.log('venObj', venue.objectGetter);
      var marker = {
        position: {
          lat: venue.location.lat,
          lng: venue.location.lng
        }
      }

      return <Marker key={i} animation={2} onClick={this.handleMarkerClick} value={venue.objectGetter} icon={this.iconChooser(venue.kingdom, venue.classOfAnimal)}{...marker} >
          <InfoWindow>
            {'<b>'+venue.speciesObserved+'</b>' + '<br/>' + venue.observer}

          </InfoWindow>
      </Marker>
    });

    return (
      <GoogleMapLoader
        containerElement = { mapContainer }
        googleMapElement = {
          <GoogleMap

            defaultZoom={4}
            defaultCenter={this.props.center}

            options={{streetViewControl: false, mapTypeControl: true}}>
            <MarkerClusterer>
              {markers}
            </MarkerClusterer>

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
