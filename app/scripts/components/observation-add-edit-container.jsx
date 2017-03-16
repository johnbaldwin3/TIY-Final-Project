//********************************
//Third Party Libraries
//********************************
var React = require('react');
var EXIF = require('exif-js');
var $ = require('jquery');

//********************************
//Models, Utilities, Layouts
//********************************
var BaseLayout = require('./layouts/baselayout.jsx').BaseLayout;
var models = require('../models/organism.js');
var ParseFile = require('../parse.js').ParseFile;
var Observation = require('../models/observations.js').Observation;

//********************************
//Individual Observation / Add / Edit / View
//********************************
class ObservationsAddEditContainer extends React.Component {
  constructor(props){
    super(props);
    var observedSpecies = new models.Organism();
    var observation = new Observation();
    observedSpecies.set('speciesKey', props.speciesKey);
//hey if this comp - if this,props.id
    observedSpecies.fetch().then(() => {
      observation.set({
        commonName: observedSpecies.get("vernacularName"),
        scientificName: observedSpecies.get("canonicalName"),
        originalDiscoveryInfo: observedSpecies.get("authorship"),
        taxonTree: observedSpecies.getTaxonTree()
      });

      this.setState({observation: observation});
      //console.log('observedSpecies', observedSpecies);

    });

    this.state = {
      observation: observation,

    }

  }
  createNewObservation(data) {
    var pic = this.state.pic;
    var fileUpload = new ParseFile(pic);
    console.log('fu', fileUpload);
    fileUpload.save({}, {
      data: pic
    }).then((response)=>{
      var imageUrl = response.url;

      console.log('observation1', observation);
      observation.save().then(function(){
        console.log('observation', observation);
        // Backbone.history.navigate('detail/', {trigger: true});
      });
    });
  }
  render() {
    //console.log('os', this.state.observedSpecies);
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
    console.log('props', this.props.observedSpecies);

    //binding this for methods
    this.handlePicChange = this.handlePicChange.bind(this);
    this.handleCommonName = this.handleCommonName.bind(this);
    this.handleScientificName = this.handleScientificName.bind(this);
    this.handleDiscovery = this.handleDiscovery.bind(this);
    this.handleObservationDate = this.handleObservationDate.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSpeciesTree = this.handleSpeciesTree.bind(this);
    this.handlePublicOrPrivate = this.handlePublicOrPrivate.bind(this);
    this.handleObservationSubmit = this.handleObservationSubmit.bind(this);

    this.state = $.extend({}, {

      pic: null,
      preview: null,
      observationDate: new Date(),
      observationNotes: '',
      publicList: true,
      lat: null,
      lon: null,
      latRef: null,
      lonRef: null

    }, this.props.observation.toJSON() );
  }
  componentWillReceiveProps(nextProps) {
    var newState = $.extend({}, this.state, nextProps.observation.toJSON());

    this.setState(newState);
  }
  handlePicChange(e) {
    var file = e.target.files[0];
    this.setState({pic: file});
    console.log('file', file);
    // User file reader object to display preview
    var reader = new FileReader();
    reader.onloadend = ()=>{
    //********************************
    //http://danielhindrikes.se/web/get-coordinates-from-photo-with-javascript/
    //structure for EXIF so mewhat from above reference
    //********************************
      var exif = EXIF.getData(file, () => {
      var lat = EXIF.getTag(file, "GPSLatitude");
      //console.log('lat', lat);
      var lon = EXIF.getTag(file, "GPSLongitude");
      //console.log('lon', lon);

      //Convert coordinates to WGS84 decimal
      var latRef = EXIF.getTag(file, "GPSLatitudeRef") || "N";
      var lonRef = EXIF.getTag(file, "GPSLongitudeRef") || "W";

      lat = (lat[0] + lat[1]/60 + lat[2]/3600) * (latRef == "N" ? 1 : -1);
      lon = (lon[0] + lon[1]/60 + lon[2]/3600) * (lonRef == "W" ? -1 : 1);

      this.setState(
       {
         lat: lat,
         lon: lon,
         latRef: latRef,
         lonRef: lonRef
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
    //console.log('datetype',typeof newDate);
    //console.log('date',newDate);
    this.setState({observationDate: newDate.iso});
  }
  handleLocationChange(e) {
    this.setState({locationOfObservation: e.target.value});
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
    this.props.action(this.state)

  }
  render() {

    return (
      <form onSubmit={this.handleObservationSubmit} className="col-sm-10">
        <div className="row">
          <div className="form-group col-sm-4">
            <label htmlFor="exampleInputFile">Picture Upload</label>
            <input onChange={this.handlePicChange} type="file" id="exampleInputFile"/>
            <p className="help-block">Upload your species image here.</p>
          </div>
          <div className="media col-sm-5">
            <div className="media-right">
              <div className="sizer">
                <img className="media-object" src={this.state.preview} />
                <p className="help-block">Image preview</p>
              </div>
            </div>
          </div>

        </div>
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
          value={this.state.authorship}/>
        </div>
        <div className="form-group">
          <label htmlFor="dateTime">Date of Observation</label>
          <input onChange={this.handleObservationDate} type="date" className="form-control" id="dateTime" placeholder="When did you observe it?"/>
        </div>
        <div className="form-group">
          <label htmlFor="locationFound">Location Found</label>
          <input onChange={this.handleLocationChange} type="text" className="form-control" id="locationFound" placeholder="Where did you find it?" value={(this.state.lat + " " + this.state.latRef ) +", "+(this.state.lon + " " + this.state.lonRef)}/>
        </div>
        <div className="form-group">
          <label htmlFor="familyTree">Taxonimical Heirarchy (example: Kingdom - Phylum - Class - Order - Genus - Species) </label>
          <input onChange={this.handleSpeciesTree} type="text" className="form-control" id="familyTree" placeholder="Species family tree... "
            value={ this.state.taxonTree }/>
        </div>
        <div className="form-group">
          <label htmlFor="locationFound">Observation Notes</label>
          <textarea onChange={this.handleObservationNotes} className="form-control" id="observationNotes" placeholder="Some details of your find..." rows="3" />
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
