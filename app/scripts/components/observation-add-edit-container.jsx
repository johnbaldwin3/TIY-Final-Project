//********************************
//Third Party Libraries
//********************************
var React = require('react');
var EXIF = require('exif-js');
var $ = require('jquery');
var Backbone = require('backbone');
var moment = require('moment');
var loadImage = require('blueimp-load-image');

//********************************
//Models, Utilities, Layouts
//********************************
var BaseLayout = require('./layouts/baselayout.jsx').BaseLayout;
var models = require('../models/organism.js');
var ParseFile = require('../parse.js').ParseFile;
var parse = require('../parse.js').parse;
var Observation = require('../models/observations.js').Observation;
var User = require('../models/user.js').User;
//var imageOrientationFix = require('../utilities.js').imageOrientationFix;

//********************************
//Individual Observation / Add / Edit / View
//********************************
class ObservationsAddEditContainer extends React.Component {
  constructor(props){
    super(props);
    var observedSpecies = new models.Organism();
    var observation = new Observation();
    var userId = User.current().get('objectId');

    this.createNewObservation = this.createNewObservation.bind(this);
    //set the species
    observedSpecies.set('speciesKey', props.speciesKey);

    //checking to see if their is a model id being passed in
    if(this.props.id) {
      //if true, set objectId
      observation.set('objectId', this.props.id);
      //fetch this model
      observation.fetch().then(() => {
        this.setState({pic: this.state.pic})
        this.setState({observation: observation});
        //console.log('img', observation.get('pic').url);
        var observerId = observation.get('observer').objectId
          observerId != userId ? this.setState({ isOwner: false }) : null;
          //console.log(observerId, userId);
        this.forceUpdate();
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
      isOwner: true
    }

  }
  createNewObservation(data) {
   var observation = this.state.observation;
   observation.set(data);

   observation.setPointer("observer", '_User', User.current().get("objectId"));
   var urlStart = 'https://jb3-serve.herokuapp.com/users/';
   var obId = User.current().get("objectId");
   var urlEnd = '/{"observationCount":{"__op":"Increment","amount":1}}';
   var urlInc = urlStart+obId+urlEnd;
   parse.initialize();

   var user = new User(JSON.parse(localStorage.getItem('user')));
   user.unset('createdAt');
   user.unset('updatedAt');
   user.unset('sessionToken');
   user.unset('ACL');
   user.set("observationCount", {"__op":"Increment","amount":1}); user.save();




  //  put(urlStart+obId+urlEnd).then(() => {
  //    console.log('done');
  //  })
   observation.save().then(function(){
     Backbone.history.navigate('observation/', {trigger: true});
   });
 }
  render() {
    return (
        <BaseLayout>
          <DeleteModal observation={this.state.observation} />
          <div className="container">
            <ObservationForm
              action={this.createNewObservation} isOwner={this.state.isOwner} observation={this.state.observation} />
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
    this.handleObservationTime = this.handleObservationTime.bind(this);
    this.handleBackButton = this.handleBackButton.bind(this);

    //extending state to mash up with observationCollection
    this.state = $.extend({}, {
      pic: {},
      preview: null,
      observationDate: null,
      observationNotes: '',
      publicList: true,
      lat: null,
      lon: null,
      latRef: null,
      lonRef: null,
      elevationFoundMeters: null,
      elevationFoundFeet: null,
      orientation: null,
      //date: new Date(),
      //time: new Date(),
      dateAndTime: null

    }, this.props.observation.toJSON() );
  }
  componentWillReceiveProps(nextProps) {
    var newState = $.extend({}, this.state, nextProps.observation.toJSON());
    this.setState(newState);
    this.setState({observationDate: this.props.observation.get('date')});
  }
  handlePicChange(e) {
    //********************************
    //********************************
    //http://danielhindrikes.se/web/get-coordinates-from-photo-with-javascript/
    //structure for EXIF so mewhat from above reference
    //********************************
    var file = e.target.files[0];
    //imageOrientationFix(file);
    this.setState({
      pic: file,
      //name: file.name
    });


    //console.log('file', file);
    // User file reader object to display preview
    var reader = new FileReader();
    reader.onloadend = ()=>{
      var exif = EXIF.getData(file, () => {


        //console.log(file.cropper);
      // EXIF.getTag(file, "Orientation") = 1;

      var lat = EXIF.getTag(file, "GPSLatitude");
      var lon = EXIF.getTag(file, "GPSLongitude");
      //Convert coordinates to WGS84 decimal
      var latRef = EXIF.getTag(file, "GPSLatitudeRef") || "N";
      var lonRef = EXIF.getTag(file, "GPSLongitudeRef") || "W";
      lat = (lat[0] + lat[1]/60 + lat[2]/3600) * (latRef == "N" ? 1 : -1);
      lon = (lon[0] + lon[1]/60 + lon[2]/3600) * (lonRef == "W" ? -1 : 1);
      //********************************
      //********************************

      //get date and time from original photo at time of shot
      var dater = EXIF.getTag(file, "DateTimeOriginal");
      //console.log('dater', dater);
      var date = dater.substr(0,10).split(':').join('-');
      //console.log(date);
      var time = dater.substr(11,16);
      //console.log('time' , time );
      //console.log(moment(time).format('LTS'));
      var dateAndTime = date + "T" + time;

      //console.log('dateAndTime', dateAndTime );
      //get elevation data (given in meters)
      var elevation = EXIF.getTag(file, "GPSAltitude");
      //elevation converted to meters (num/denom)
      var elevationMeters = (elevation.numerator / elevation.denominator).toFixed(4);
      //elevation converted to feet
      var elevationFeet = (elevationMeters * 3.2804).toFixed(4);
      //get orientation of picture at time of photo from exif
      var orientation = EXIF.getTag(file, "Orientation");





      console.log('orientation', orientation);

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
         date: date,
         time: time,
         observationDate: date,
         dateAndTime: dateAndTime

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
    //console.log("*******", e.target.value);
    var newDate = new Date(e.target.value);

    var dateParse = {
      "__type" : "Date",
      "iso" : newDate
    }
    this.setState({observationDate: dateParse});
  }
  handleObservationTime(e) {
    console.log('time', e.target.value);
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

     var formData = $.extend({}, this.state);

     if (formData.preview) {

       // handle date
       var date = new Date(formData.date);
       var dateParse = {
         "__type": "Date",
         "iso": date
       }
       formData.observationDate = dateParse

       // handle pic
       var pic = formData.pic;

       var fileUpload = new ParseFile(pic);
       console.log("fileup", fileUpload);
       fileUpload.save({}, {
         data: pic
       }).then((response)=>{
         var imageUrl = response.url;
         formData.pic = {
           name: pic.name,
           url: imageUrl
         };
         delete formData.preview;
         this.props.action(formData);
       });
     } else {
       // handle date
       var date = new Date(formData.date);
       var dateParse = {
         "__type": "Date",
         "iso": date
       }
       formData.observationDate = dateParse;
       this.props.action(formData);
     }

   }
  handleBackButton(e) {
    //back to gallery after viewing the description
    Backbone.history.navigate('observation/gallery/', {trigger: true});
  }

  render() {
    /////IMAGE UPLOAD ISSUE WITH EDIT OF RECORD//////
    console.log('taxonTree', this.state.taxonTree.indexOf(0));
    console.log('taxonTreeType', typeof this.state.taxonTree)
    return (
      <form onSubmit={this.handleObservationSubmit} className="col-sm-12">

        {/*
        this.props.isOwner ? <div></div> : <div className="well"><h4>First Step: Upload Your Photo!</h4></div>
        */}
        {console.log('taxonTreeTypeHere', typeof this.state.taxonTree)}
        {console.log('taxonTreeHere', this.state.taxonTree.indexOf('u'))}
        <div className="well"><h4 className="photo-header">First Step: Upload Your Photo!</h4></div>
          <div className="row">
            <div className="form-group col-sm-4">
              <label htmlFor="image">Picture Upload</label>
              <input onChange={this.handlePicChange} name="image" accept=".jpeg, .jpg, .gif, .PNG" type="file" id="image" filename={this.state.image} value={this.state.image}/>
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
        <div className="well"><h4 className="form-header">Step Two: Fill in the remaining info!</h4></div>
        <div className="form-group species-input-form">
          <label htmlFor="speciesCommonName">Common Name</label>
          <input onChange={this.handleCommonName} type="text" className="form-control" id="speciesCommonName" placeholder="Species Common Name" value={this.state.commonName}/>
        </div>
        <div className="form-group species-input-form">
          <label htmlFor="speciesSciName">Scientific Name</label>
          <input onChange={this.handleScientificName} type="text" className="form-control" id="speciesSciName" placeholder="Species Scientific Name"
          value={this.state.scientificName}/>
        </div>
        <div className="form-group species-input-form">
          <label htmlFor="discovery">Originally Described By and First Description Date (example: Darwin, 1859)</label>
          <input onChange={this.handleDiscovery} type="text" className="form-control" id="discovery" placeholder="Discovering Naturalist and Date of First Description"
          value={this.state.originalDiscoveryInfo}/>
        </div>
        <div className="form-group species-input-form">
          <label htmlFor="date">Date of Observation</label>
          <input onChange={this.handleObservationDate} type="date" className="form-control" id="date" placeholder="When did you observe it?" value={this.state.observationDate}/>
        </div>
        <div className="form-group species-input-form">
          <label htmlFor="dateTime">Time of Observation</label>
          <input onChange={this.handleObservationTime} type="text" className="form-control" id="time" placeholder="What time did you observe it? (h:m:s am/pm)" value={this.state.dateAndTime ? moment(this.state.dateAndTime).format('LTS'): null} />
        </div>
        <div className="form-group species-input-form">
          <label htmlFor="locationFound">Location Found</label>
          <input onChange={this.handleLocationChange} type="text" className="form-control" id="locationFound" placeholder="Where did you find it?" value={(this.state.lat + " " + this.state.latRef ) +", "+(this.state.lon + " " + this.state.lonRef)}/>
        </div>
        <div className="form-group col-sm-6 species-input-form">
          <label htmlFor="elevationFeetFound">Elevation of Observation (Feet) </label>
          <input onChange={this.handleElevationFeetChange} type="text" className="form-control" id="elevationFeetFound" placeholder="Elevation of your find (ft)..." value={this.state.elevationFoundFeet + " feet"}/>
        </div>
        <div className="form-group col-sm-6 species-input-form">
          <label htmlFor="elevationMetersFound">Elevation of Observation (Meters)</label>
          <input onChange={this.handleElevationMetersChange} type="text" className="form-control" id="elevationMetersFound" placeholder="Elevation of your find (m)..." value={this.state.elevationFoundMeters + " meters"}/>
        </div>
        {(this.state.taxonTree.indexOf('u') != 0) ?
        <div className="form-group species-input-form">
          <label htmlFor="familyTree">Taxonimical Heirarchy (example: Kingdom - Phylum - Class - Order - Family - Genus - Species) </label> <input onChange={this.handleSpeciesTree} type="text" className="form-control" id="familyTree" placeholder="Species family tree... "
            value={ this.state.taxonTree }/>
        </div> : <div></div>}
        <div className="form-group species-input-form">
          <label htmlFor="observationNotes">Observation Notes</label>
          <textarea onChange={this.handleObservationNotes} className="form-control" id="observationNotes" placeholder="Some details of your find..." rows="3" value={this.state.observationNotes} />
        </div>
        <div className="checkbox">
          <label>
            <input onChange={this.handlePublicOrPrivate} type="checkbox" value="true"/> Public?
          </label>
        </div>
        {/***********************
          Logic to determine the button options:
          1) if user is the owner of observation, present user with the option to edit or delete
          2) if user is not the owner, present user with back button to return to Gallery
          3) if user is creating a new observation submit the record, submit button presented
          **********************
          if user wants to delete, display modal will confirm delete, then take user to gallery
          ***********************/}
        {
         this.props.isOwner ? <input type="submit" className="btn btn-success submitter-button" value={ this.props.observation.isNew() ? 'Submit Your Find' : 'Edit Your Observation'}/> : <input type="button" onClick={this.handleBackButton} className="btn btn-default back-button" value="Back"/>
        }
        {
        this.props.isOwner ? <input type="button" onClick={this.handleBackButton} className="btn btn-warning back-to-gal-button" value="Back to Gallery"/> : null
        }
        <div className="pull-right">
          {
          this.props.isOwner ? <button type="button" data-toggle="modal" data-target="#deleteModal"  className="btn btn-danger deleter-button" value="Delete Observation"><span className="glyphicon glyphicon-trash"></span></button> : null
          }
        </div>
      </form>
    )

  }
}

class DeleteModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteObservationButton = this.handleDeleteObservationButton.bind(this);

    this.state = {
      observation: this.props.observation
    }
  }
  handleDeleteObservationButton(e) {
    //alert("Are you sure?");
    //delete instance of this model
    var modelToDelete = this.props.observation;
    var url = modelToDelete.get("pic").url;
    var user = new User(JSON.parse(localStorage.getItem('user')));
    user.unset('createdAt');
    user.unset('updatedAt');
    user.unset('sessionToken');
    user.unset('ACL');
    user.set("observationCount", {"__op":"Increment","amount":-1});
    user.save();


    modelToDelete.destroy();
    this.setState({observation: this.state.observation})
    //console.log(this.props.observation);

    //navigate back to gallery after delete
    Backbone.history.navigate('observation/gallery/', {trigger: true});

  }
  render() {
    return (
      <div className="modal fade" id="deleteModal" tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-title">Delete Your Observation?</h4>
            </div>
            <div className="modal-body">
              <p className="delete-p">This change will be permanent and can not be undone, are you sure?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-warning button-cancel" data-dismiss="modal">Cancel</button>
              <button onClick={this.handleDeleteObservationButton}  type="button" data-dismiss="modal" className="btn btn-danger">Delete</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = {
  ObservationsAddEditContainer
};

//
