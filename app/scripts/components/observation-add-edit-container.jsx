//********************************
//Third Party Libraries
//********************************
var React = require('react');

//********************************
//Models, Utilities, Layouts
//********************************
var BaseLayout = require('./layouts/baselayout.jsx').BaseLayout;
var models = require('../models/organism.js');
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
      observedSpecies: observedSpecies
    }

  }
  render() {
    console.log('os', this.state.observedSpecies);
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

    this.state = {
      observedSpecies: this.props.observedSpecies
    }
  }
    // componentWillReceiveProps(nextProps) {
    //   console.log('nextProps', nextProps);
    //   this.setState({observedSpecies: nextProps.observedSpecies});
    // }
  render() {
    var kingdom = this.props.observedSpecies.get('kingdom');
    var phylum = this.props.observedSpecies.get('phylum');
    var classOf = this.props.observedSpecies.get('class');
    var order = this.props.observedSpecies.get('order');
    var family = this.props.observedSpecies.get('family');
    var genus = this.props.observedSpecies.get('genus');
    var speciesNameToSplit = this.props.observedSpecies.get('species');
    //var species = speciesNameToSplit.split(" ");
    return (
      <form className="col-sm-12">
        <div className="form-group">
          <label htmlFor="exampleInputFile">Picture Upload</label>
          <input type="file" id="exampleInputFile"/>
          <p className="help-block">Upload your species image here.</p>
        </div>
        <div className="form-group">
          <label htmlFor="speciesCommonName">Common Name</label>
          <input type="text" className="form-control" id="speciesCommonName" placeholder="Species Common Name" value={this.props.observedSpecies.get('vernacularName')}/>
        </div>
        <div className="form-group">
          <label htmlFor="speciesSciName">Scientific Name</label>
          <input type="text" className="form-control" id="speciesSciName" placeholder="Species Scientific Name"
          value={this.props.observedSpecies.get('canonicalName')}/>
        </div>
        <div className="form-group">
          <label htmlFor="discovery">Originally Described By and First Description Date (example: Darwin, 1859)</label>
          <input type="text" className="form-control" id="discovery" placeholder="Discovering Naturalist and Date of First Description"
          value={this.props.observedSpecies.get('authorship')}/>
        </div>
        <div className="form-group">
          <label htmlFor="dateTime">Date of Observation</label>
          <input type="date" className="form-control" id="dateTime" placeholder="When did you observe it?"/>
        </div>
        <div className="form-group">
          <label htmlFor="locationFound">Location Found</label>
          <input type="text" className="form-control" id="locationFound" placeholder="Where did you find it?" />
        </div>
        <div className="form-group">
          <label htmlFor="familyTree">Taxonimical Heirarchy (example: Kingdom - Phylum - Class - Order - Genus - Species) </label>
          <input type="text" className="form-control" id="familyTree" placeholder="Species family tree... "
            value={kingdom+' --> '+ phylum + ' --> '+ classOf + ' --> '+ order + ' --> '+ genus + ' --> '+ speciesNameToSplit }/>
        </div>
        <div className="form-group">
          <label htmlFor="locationFound">Observation Notes</label>
          <textarea className="form-control" id="observationNotes" placeholder="Some details of your find..." rows="3"></textarea>
        </div>


        <div className="checkbox">
          <label>
            <input type="checkbox"/> Public?
          </label>
        </div>
        <button type="submit" className="btn btn-default">Submit</button>
      </form>
    )

  }
}

module.exports = {
  ObservationsAddEditContainer
};
