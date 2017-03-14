//********************************
//Third Party Libraries
//********************************
var React = require('react');

//********************************
//Models, Utilities, Layouts
//********************************
var BaseLayout = require('./layouts/baselayout.jsx').BaseLayout;
var utility = require('../utilities.js');
var models = require('../models/organism.js');
//********************************
//Find The Species You Observed
//********************************
class ObservationSpeciesSearchContainer extends React.Component {
  constructor(props) {
    super(props);
    var search = '';
    var organismCollection = new models.OrganismCollection();

    this.handleInputSearch = this.handleInputSearch.bind(this);

    this.state = {
      search: '',
      results: [],
      organismCollection
    }
  }
  handleInputSearch(data) {
    var collection = this.state.organismCollection;
    collection.searchTerm = data;

    console.log('hey', this.state.organismCollection);
    this.state.organismCollection.fetch().done((response) => {
      this.setState({results: response.results});
    });

  //  utility.searchSpecies(data).done((response)=> {
  //    var results = response.results;
  //   this.setState({results : results });
  //  });

  }
  render() {
    //console.log(this.state.results);
    return (
      <BaseLayout>
        <div className="container search-page">
          <div className="row">
            <div className="getstarted col-sm-6 col-sm-offset-3 well">
              <h3>Hey, lets get started... search below for the name of what you observed. When you see the right one, click on the link and you can start to fill out the details of your observation.</h3>
              <h4>If you can't find what you're looking for, just click the <u>Couldn't Find It</u> button to manually fill out your species form.</h4>

              <a href="#observation/add/" type="button" className="btn btn-primary">Couldn't Find It</a>
            </div>
            <div className="input-group col-sm-12 input-group-lg">

                <SpeciesInputForm handleInputSearch= {this.handleInputSearch}/>

            </div>

          </div>
          <PossibleSpeciesList availableSpecies = {this.state.results}/>
        </div>
      </BaseLayout>
    )
  }
}

class SpeciesInputForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search: ''
    }
    this.handleInputChange = this.handleInputChange.bind(this);
  }
  handleInputChange(e) {
    this.props.handleInputSearch(e.target.value);
  }
  render() {
    return (
        <input onChange={this.handleInputChange} type="text" className="form-control" placeholder="Species you observered..."/>
    )
  }
}

class PossibleSpeciesList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
     results: []
   }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ results: nextProps.availableSpecies})
  }
  render() {
    console.log('this', this.props.availableSpecies);
    var speciesList = this.props.availableSpecies.map((species) =>{
      return (
        <li key={species.key} className="list-group-item">
          {species.species}
        </li>
      )
    });
    return (
      <div className="row">
        <ul className="list-group">
          {speciesList}
        </ul>
      </div>
    )
  }
}

//********************************
//Exports
//********************************
module.exports = {
  ObservationSpeciesSearchContainer
};
