//********************************
//Third Party Libraries
//********************************
var React = require('react');
var _ = require('underscore');

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

    this.handleInputSearch = _.debounce(this.handleInputSearch, 300).bind(this);



    this.state = {
      search: '',
      results: [],
      organismCollection
    }
  }
  handleInputSearch(data) {
    var collection = this.state.organismCollection;
    collection.searchTerm = data;

      collection.fetch().done((response) => {
      this.setState({organismCollection: collection});
    });

  }
  render() {
    return (
      <BaseLayout>
        <div className="container search-page">
          <div className="row">
            <div className="getstarted col-sm-10 col-sm-offset-1 well">
              <h3>Hey, lets get started... search below for the name of what you observed. When you see the right one, click on the <u>This is the one!</u> button and you can start to fill out the details of your observation.</h3>
              <h4>If you can't find what you're looking for, it's okay! Just click the <u>Unable to Find Match</u> button to manually fill out your species form.</h4>

              <a href="#observation/add/" type="button" className="btn btn-primary pull-right">Unable to Find Match</a>
            </div>
            <div className="input-group col-sm-12 input-group-lg">

                <SpeciesInputForm handleInputSearch= {this.handleInputSearch}/>

            </div>

          </div>
          <PossibleSpeciesList availableSpecies = {this.state.organismCollection}/>
        </div>
      </BaseLayout>
    )
  }
}

class SpeciesInputForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);

    this.state = {
      search: ''
    }

  }
  handleInputChange(e) {
    this.props.handleInputSearch(e.target.value);
  }

  render() {
    return (
        <input onChange={this.handleInputChange} type="text" className="form-control" placeholder="Species you observed..."/>
    )
  }
}

class PossibleSpeciesList extends React.Component {
  constructor(props) {
    super(props);
    this.handleSpeciesClick = this.handleSpeciesClick.bind(this);

    this.state = {
     results: []
   }
  }
  handleSpeciesClick(e) {
    console.log(e.target.value);
  }
  render() {
    console.log('this', this.props.availableSpecies);
    var speciesList = this.props.availableSpecies.map((species) =>{
      //console.log('species', species);
      return (
        <tr key={species.cid} >
          <td>
            {species.get('species')}
          </td>
          <td>
            {species.getVernacularNames()}
          </td>
          <td>
            <a onClick={this.handleSpeciesClick} href={"#observation/add/"+ species.get('speciesKey')+"/"}
           type="button" className="btn">This is the one!</a>
          </td>
        </tr>
      )
    });
    return (
      <div className="row">
        <table className="table table-hover col-sm-8">
          <thead className="species-table">
            <tr href="">
              <th>Scientific Name</th>
              <th>Common Name (Vernacular Name)</th>
              <th>Found a Match?</th>
            </tr>
          </thead>
          <tbody>
              {speciesList}
          </tbody>
        </table>
      </div>
    )
  }
}

//href={"#observation/" + species.get('speciesKey')+"/edit/"}

//********************************
//Exports
//********************************
module.exports = {
  ObservationSpeciesSearchContainer
};
