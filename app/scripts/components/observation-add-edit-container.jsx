//********************************
//Third Party Libraries
//********************************
var React = require('react');
var EXIF = require('exif-js');
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
     observedSpecies.set('speciesKey', props.speciesKey);
     //console.log('props.speciesKey', props.speciesKey);


    observedSpecies.fetch().then(() => {
      this.setState({observedSpecies: observedSpecies});
      console.log('observedSpecies', observedSpecies);
    });

    this.state = {
      observedSpecies: observedSpecies,
      // pic: null,
      // preview: null,
      // commonName: '',
      // scientificName: '',
      // originalDiscoveryInfo: '',
      // observationDate: new Date(),
      // locationOfObservation: '',
      // taxonTree: '',
      // observationNotes: '',
      // publicList: true

    }

  }
  render() {
    //console.log('os', this.state.observedSpecies);
    return (
        <BaseLayout>
          <div className="container">
            <ObservationForm observedSpecies={this.state.observedSpecies} />
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

    this.state = {
      observedSpecies: this.props.observedSpecies,
      pic: null,
      preview: null,
      commonName: this.props.observedSpecies.get('vernacularName'),
      scientificName: this.props.observedSpecies.get('canonicalName'),
      originalDiscoveryInfo: this.props.observedSpecies.get('authorship'),
      observationDate: new Date(),
      locationOfObservation: '',
      taxonTree: '',
      observationNotes: '',
      publicList: true

    }
  }
  handlePicChange(e) {
    var file = e.target.files[0];
    this.setState({pic: file});
    console.log(file);
    // User file reader object to display preview
    var reader = new FileReader();
    reader.onloadend = ()=>{
      ////////

      var exif = EXIF.getData(file, function() {
      //  return EXIF.getTag(this, "Orientation");
      return this;
      });

      console.log('exif', exif);

     var lat = exif.GPSLatitude;
     var lon = exif.GPSLongitude;

     //Convert coordinates to WGS84 decimal
     var latRef = exif.GPSLatitudeRef || "N";
     var lonRef = exif.GPSLongitudeRef || "W";
     lat = (lat[0] + lat[1]/60 + lat[2]/3600) * (latRef == "N" ? 1 : -1);
     lon = (lon[0] + lon[1]/60 + lon[2]/3600) * (lonRef == "W" ? -1 : 1);

     console.log('lat,long', lat, lon, latRef);

      //////////
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
    console.log('datetype',typeof newDate);
    console.log('date',newDate);
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
    this.setState({publicList: e.target.value});
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

      var observation = new Observation();
      observation.set({
        commonName: this.state.commonName,
        scientificName: this.state.scientificName,
        originalDiscoveryInfo: this.state.originalDiscoveryInfo,
        observationDate: this.state.observationDate,
        locationOfObservation: this.state.locationOfObservation,
        taxonTree: this.state.taxonTree,
        observationNotes: this.state.observationNotes,
        publicList: this.state.publicList,

      });

      observation.save().then(function(){
        console.log('observation', observation);
        // Backbone.history.navigate('detail/', {trigger: true});
      });
    });

  }
  render() {
    var kingdom = this.props.observedSpecies.get('kingdom');
    var phylum = this.props.observedSpecies.get('phylum');
    var classOf = this.props.observedSpecies.get('class');
    var order = this.props.observedSpecies.get('order');
    var family = this.props.observedSpecies.get('family');
    var genus = this.props.observedSpecies.get('genus');
    var speciesNameToSplit = this.props.observedSpecies.get('species');
    // var speciesName = speciesNameToSplit
    // var species = speciesName[0];
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
          <input onChange={this.handleCommonName} type="text" className="form-control" id="speciesCommonName" placeholder="Species Common Name" value={this.props.observedSpecies.get('vernacularName')}/>
        </div>
        <div className="form-group">
          <label htmlFor="speciesSciName">Scientific Name</label>
          <input onChange={this.handleScientificName} type="text" className="form-control" id="speciesSciName" placeholder="Species Scientific Name"
          value={this.props.observedSpecies.get('canonicalName')}/>
        </div>
        <div className="form-group">
          <label htmlFor="discovery">Originally Described By and First Description Date (example: Darwin, 1859)</label>
          <input onChange={this.handleDiscovery} type="text" className="form-control" id="discovery" placeholder="Discovering Naturalist and Date of First Description"
          value={this.props.observedSpecies.get('authorship')}/>
        </div>
        <div className="form-group">
          <label htmlFor="dateTime">Date of Observation</label>
          <input onChange={this.handleObservationDate} type="date" className="form-control" id="dateTime" placeholder="When did you observe it?"/>
        </div>
        <div className="form-group">
          <label htmlFor="locationFound">Location Found</label>
          <input onChange={this.handleLocationChange} type="text" className="form-control" id="locationFound" placeholder="Where did you find it?" />
        </div>
        <div className="form-group">
          <label htmlFor="familyTree">Taxonimical Heirarchy (example: Kingdom - Phylum - Class - Order - Genus - Species) </label>
          <input onChange={this.handleSpeciesTree} type="text" className="form-control" id="familyTree" placeholder="Species family tree... "
            value={(this.props.observedSpecies) ? (kingdom+' --> '+ phylum + ' --> '+ classOf + ' --> '+ order + ' --> '+ genus + ' --> '+ speciesNameToSplit) : null }/>
        </div>
        <div className="form-group">
          <label htmlFor="locationFound">Observation Notes</label>
          <textarea onChange={this.handleObservationNotes} className="form-control" id="observationNotes" placeholder="Some details of your find..." rows="3" />
        </div>


        <div className="checkbox">
          <label>
            <input onChange={this.handlePublicOrPrivate} type="checkbox" value={true}/> Public?
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
