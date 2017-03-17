//********************************
//Third Party Libraries
//********************************
var React = require('react');

//********************************
//Models, Utilities, Layouts
//********************************
var BaseLayout = require('./layouts/baselayout.jsx').BaseLayout;
var ObservationCollection = require('../models/observations.js').ObservationCollection;

//********************************
//Observation Gallery (Photos Gallery)
//********************************
class ObservationGalleryContainer extends React.Component {
  constructor(props) {
    super(props);
    var observationCollection = new ObservationCollection();

    //currentRecipe.set('objectId', props.id);
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
        <GalleryListings />
      </BaseLayout>
    )
  }
}

class GalleryListings extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {

    return(
      <div className="container">
            <div className="row">
              <div className="col-sm-6 col-md-4">
                <div className="thumbnail">
                  <img src="https://www.fillmurray.com/240/240" alt="..."/>
                  <div className="caption">
                    <h3>Bill Murray in his natural environment</h3>
                    <p>captured by: John B</p>
                    <p><a href="" className="btn btn-primary" role="button">See John's Other List</a> <a href="#" className="btn btn-default" role="button">Observation Details</a></p>
                  </div>
                </div>
              </div>
            </div>
        </div>
    )
  }

}


module.exports = {
  ObservationGalleryContainer
};
