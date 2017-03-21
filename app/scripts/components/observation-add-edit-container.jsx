//********************************
//Third Party Libraries
//********************************
var React = require('react');
var EXIF = require('exif-js');
var $ = require('jquery');
var Backbone = require('backbone');
var moment = require('moment');

//********************************
//Models, Utilities, Layouts
//********************************
var BaseLayout = require('./layouts/baselayout.jsx').BaseLayout;
var models = require('../models/organism.js');
var ParseFile = require('../parse.js').ParseFile;
var Observation = require('../models/observations.js').Observation;
var User = require('../models/user.js').User;

//********************************
//Individual Observation / Add / Edit / View
//********************************
class ObservationsAddEditContainer extends React.Component {
  constructor(props){
    super(props);
    var observedSpecies = new models.Organism();
    var observation = new Observation();

    this.createNewObservation = this.createNewObservation.bind(this);

    observedSpecies.set('speciesKey', props.speciesKey);
//hey if this comp - if this,props.id
    if(this.props.id) {
      observation.set('objectId', this.props.id);

      observation.fetch().then(() => {
        this.setState({pic: this.state.pic})
        this.setState({observation: observation});
      });
    } else {

      observedSpecies.fetch().then(() => {
      observation.set({

        commonName: observedSpecies.get("vernacularName"),
        scientificName: observedSpecies.get("canonicalName"),
        originalDiscoveryInfo: observedSpecies.get("authorship"),
        taxonTree: observedSpecies.getTaxonTree(),
        observationUser: User.current()
      });
      this.setState({observation: observation});

    });
  }
    this.state = {
      observation: observation,

    }

  }
  createNewObservation(data) {
    var observation = this.state.observation;
    observation.set(data);
    observation.setPointer("observer", '_User', User.current().get("objectId"));

    observation.save().then(function(){
     Backbone.history.navigate('observation/', {trigger: true});

    });
  }
  render() {
    return (
        <BaseLayout>
          <div className="container">
            <ObservationForm action={this.createNewObservation} observation={this.state.observation} />
          </div>
        </BaseLayout>
      )
    }
  }

class ObservationForm extends React.Component{
  constructor(props){
    super(props);

    //binding this for methods
    this.handlePicChange = this.handlePicChange.bind(this);
    this.handleCommonName = this.handleCommonName.bind(this);
    this.handleScientificName = this.handleScientificName.bind(this);
    this.handleDiscovery = this.handleDiscovery.bind(this);
    this.handleObservationDate = this.handleObservationDate.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSpeciesTree = this.handleSpeciesTree.bind(this);
    this.handlePublicOrPrivate = this.handlePublicOrPrivate.bind(this);
    this.handleObservationNotes = this.handleObservationNotes.bind(this);
    this.handleObservationSubmit = this.handleObservationSubmit.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);

    //extending state to mash up with observationCollection
    this.state = $.extend({}, {
      pic: {},
      preview: null,
      observationDate: new Date(),
      observationNotes: '',
      publicList: true,
      lat: null,
      lon: null,
      latRef: null,
      lonRef: null,
      elevationFoundMeters: null,
      elevationFoundFeet: null,

    }, this.props.observation.toJSON() );
  }
  componentWillReceiveProps(nextProps) {
    var newState = $.extend({}, this.state, nextProps.observation.toJSON());
    this.setState(newState);
  }
  // componentDidMount() {
  //   console.log('picture', this.state.pic);
  // }
  handlePicChange(e) {
    //********************************
    //********************************
    //http://danielhindrikes.se/web/get-coordinates-from-photo-with-javascript/
    //structure for EXIF so mewhat from above reference
    //********************************
    var file = e.target.files[0];
    this.setState({
      pic: file,
      //name: file.name
    });
    console.log('file', file);
    // User file reader object to display preview
    var reader = new FileReader();
    reader.onloadend = ()=>{
      var exif = EXIF.getData(file, () => {
      var lat = EXIF.getTag(file, "GPSLatitude");
      var lon = EXIF.getTag(file, "GPSLongitude");
      //Convert coordinates to WGS84 decimal
      var latRef = EXIF.getTag(file, "GPSLatitudeRef") || "N";
      var lonRef = EXIF.getTag(file, "GPSLongitudeRef") || "W";
      lat = (lat[0] + lat[1]/60 + lat[2]/3600) * (latRef == "N" ? 1 : -1);
      lon = (lon[0] + lon[1]/60 + lon[2]/3600) * (lonRef == "W" ? -1 : 1);
      //********************************
      //********************************

      //get elevation data (given in meters)
      var elevation = EXIF.getTag(file, "GPSAltitude");
      //elevation converted to meters (num/denom)
      var elevationMeters = (elevation.numerator / elevation.denominator).toFixed(4) ;
      //elevation converted to feet
      var elevationFeet = (elevationMeters * 3.2804).toFixed(4);
      //set state of picture exif data
      this.setState(
       {
        locationOfObservation : {
          "__type": "GeoPoint",
          "latitude": lat,
          "longitude": lon
        },
         lat: lat,
         lon: lon,
         latRef: latRef,
         lonRef: lonRef,
         elevationFoundFeet: elevationFeet,
         elevationFoundMeters: elevationMeters,

       }
     );
     return this;
    });
    this.setState({preview: reader.result});
    }
    reader.readAsDataURL(file);
  }
  handleCommonName(e) {
    this.setState({commonName: e.target.value});
  }
  handleScientificName(e) {
    this.setState({scientificName: e.target.value});
  }
  handleDiscovery(e) {
    this.setState({originalDiscoveryInfo: e.target.value});
  }
  handleObservationDate(e) {
    var newDate = new Date(e.target.value);

    var dateParse = {
      "__type" : "Date",
      "iso" : newDate
    }
    this.setState({observationDate: dateParse});
  }
  handleLocationChange(e) {
   this.setState({locationOfObservation: e.target.value});
  }
  handleElevationFeetChange(e) {
    this.setState({elevationFoundFeet: e.target.value});
  }
  handleElevationMetersChange(e) {
    this.setState({elevationFoundMetersFound: e.target.value});
  }
  handleSpeciesTree(e) {
    this.setState({taxonTree: e.target.value});
  }
  handleObservationNotes(e) {
    this.setState({observationNotes: e.target.value});
  }
  handlePublicOrPrivate(e) {
    var pubOrPriv = e.target.value;
     if(pubOrPriv == "true") {
      this.setState({publicList: true});
    } else {
      this.setState({publicList: false});
    }
    //console.log("true?", typeof pubOrPriv);

  }
  handleObservationSubmit(e) {
    e.preventDefault();
    // 1. we need to upload the image
    var pic = this.state.pic;
    var fileUpload = new ParseFile(pic);
    console.log('fu', fileUpload);
    fileUpload.save({}, {
      data: pic
    }).then((response)=>{
      var imageUrl = response.url;
      var formData = $.extend({}, this.state);
      formData.pic = {
        name: pic.name,
        url: imageUrl
      };
      delete formData.preview;
    this.props.action(formData)
    });
  }

  render() {
    console.log('date', moment(this.state.observationDate.iso).format("L"));
    return (
      <form onSubmit={this.handleObservationSubmit} className="col-sm-12">
        <div className="well"><h4>First Step: Upload Your Photo!</h4></div>
        <div className="row">
          <div className="form-group col-sm-4">
            <label htmlFor="image">Picture Upload</label>
            <input onChange={this.handlePicChange} name="image" type="file" id="image" filename={this.state.image} value={this.state.image}/>
            <p className="help-block">Upload your species image here.</p>
          </div>
          <div className="media col-sm-5">
            <div className="media-right">
              <div className="sizer">
                <img className="media-object" src={this.state.preview ? this.state.preview : this.state.pic.url } />
                <p className="help-block">{this.state.pic.name ? this.state.pic.name : "Image preview"}</p>
              </div>
            </div>
          </div>

        </div>
        <div className="well"><h4>Step Two: Fill in the remaining info!</h4></div>
        <div className="form-group">
          <label htmlFor="speciesCommonName">Common Name</label>
          <input onChange={this.handleCommonName} type="text" className="form-control" id="speciesCommonName" placeholder="Species Common Name" value={this.state.commonName}/>
        </div>
        <div className="form-group">
          <label htmlFor="speciesSciName">Scientific Name</label>
          <input onChange={this.handleScientificName} type="text" className="form-control" id="speciesSciName" placeholder="Species Scientific Name"
          value={this.state.scientificName}/>
        </div>
        <div className="form-group">
          <label htmlFor="discovery">Originally Described By and First Description Date (example: Darwin, 1859)</label>
          <input onChange={this.handleDiscovery} type="text" className="form-control" id="discovery" placeholder="Discovering Naturalist and Date of First Description"
          value={this.state.originalDiscoveryInfo}/>
        </div>
        <div className="form-group">
          <label htmlFor="dateTime">Date of Observation</label>
          <input onChange={this.handleObservationDate} type="date" className="form-control" id="dateTime" placeholder="When did you observe it?" value={moment(this.state.observationDate.iso).format("YYYY-MM-DD")}/>
        </div>
        <div className="form-group">
          <label htmlFor="locationFound">Location Found</label>
          <input onChange={this.handleLocationChange} type="text" className="form-control" id="locationFound" placeholder="Where did you find it?" value={(this.state.lat + " " + this.state.latRef ) +", "+(this.state.lon + " " + this.state.lonRef)}/>
        </div>
        <div className="form-group col-sm-6">
          <label htmlFor="elevationFeetFound">Elevation of Observation (Feet) </label>
          <input onChange={this.handleElevationFeetChange} type="text" className="form-control" id="elevationFeetFound" placeholder="Elevation of your find (ft)..." value={this.state.elevationFoundFeet + " feet"}/>
        </div>
        <div className="form-group col-sm-6">
          <label htmlFor="elevationMetersFound">Elevation of Observation (Meters)</label>
          <input onChange={this.handleElevationMetersChange} type="text" className="form-control" id="elevationMetersFound" placeholder="Elevation of your find (m)..." value={this.state.elevationFoundMeters + " meters"}/>
        </div>
        <div className="form-group">
          <label htmlFor="familyTree">Taxonimical Heirarchy (example: Kingdom - Phylum - Class - Order - Genus - Species) </label>
          <input onChange={this.handleSpeciesTree} type="text" className="form-control" id="familyTree" placeholder="Species family tree... "
            value={ this.state.taxonTree }/>
        </div>
        <div className="form-group">
          <label htmlFor="observationNotes">Observation Notes</label>
          <textarea onChange={this.handleObservationNotes} className="form-control" id="observationNotes" placeholder="Some details of your find..." rows="3" value={this.state.observationNotes} />
        </div>


        <div className="checkbox">
          <label>
            <input onChange={this.handlePublicOrPrivate} type="checkbox" value="true"/> Public?
          </label>
        </div>
        <input type="submit" className="btn btn-default" value="Submit Your Find"/>
      </form>
    )

  }
}

module.exports = {
  ObservationsAddEditContainer
};
