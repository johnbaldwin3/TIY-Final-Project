//********************************
//Third Party Libraries
//********************************
var React = require('react');

//********************************
//Models, Utilities, Layouts
//********************************
//call in base layout
var BaseLayout = require('./layouts/baselayout.jsx').BaseLayout;

//********************************
//Observation Gallery (Photos Gallery)
//********************************

class ObservationGalleryContainer extends React.Component {
  render() {
    return (
      <BaseLayout>
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
                <div className="col-sm-6 col-md-4">
                  <div className="thumbnail">
                    <img src="https://www.fillmurray.com/241/241" alt="..."/>
                    <div className="caption">
                      <h3>Another Murray</h3>
                      <p>Observer: JB3</p>
                      <p><a href="" className="btn btn-primary" role="button">See John's Other List</a> <a href="#" className="btn btn-default" role="button">Observation Details</a></p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6 col-md-4">
                  <div className="thumbnail">
                    <img src="https://www.fillmurray.com/243/243" alt="..."/>
                    <div className="caption">
                      <h3>Wild Murray insitu</h3>
                      <p>documented by: Juan</p>
                      <p><a href="" className="btn btn-primary" role="button">See John's Other List</a> <a href="#" className="btn btn-default" role="button">Observation Details</a></p>
                    </div>
                  </div>
                </div>
              </div>
          </div>
      </BaseLayout>
    )
  }
}


module.exports = {
  ObservationGalleryContainer
};
