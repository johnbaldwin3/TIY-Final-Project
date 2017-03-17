//********************************
//Third Party Libraries
//********************************
var React = require('react');

//********************************
//Models, Utilities, Layouts
//********************************
var BaseLayout = require('./layouts/baselayout.jsx').BaseLayout;
var ObservationCollection = require('../models/observations.js').ObservationCollection;
//var User = require('../models/user.js').User;

//********************************
//Observation Gallery (Photos Gallery)
//********************************
class ObservationGalleryContainer extends React.Component {
  constructor(props) {
    super(props);
    var observationCollection = new ObservationCollection();

    //currentCollection.set('objectId', props.id);
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
    return (
      <BaseLayout>
        <GalleryListings observationCollection={this.state.observationCollection}/>
      </BaseLayout>
    )
  }
}

class GalleryListings extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    //console.log('tpoc', this.props.observationCollection);
    var obsGallery = this.props.observationCollection.map((obsPics)=> {
      //console.log('obs', obsPics);
      return (

          <div className="col-sm-6 col-md-4">
            <div className="thumbnail">
              <img src={obsPics.get("pic").url} alt="..."/>
              <div className="caption">
                <h3>{obsPics.get("commonName")}</h3>
                <p>captured by: John B</p>
                <p><a href="" className="btn btn-primary" role="button">See John's Other List</a> <a href="#" className="btn btn-default" role="button">Observation Details</a></p>
              </div>
            </div>
          </div>

      )

    });

    return(
      <div className="container">
        <div className="row">
          {obsGallery}
        </div>
      </div>
    )
  }

}


module.exports = {
  ObservationGalleryContainer
};
