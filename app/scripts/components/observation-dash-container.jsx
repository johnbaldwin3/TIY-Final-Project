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
//Observation Dashboard - Main App Screen
//********************************
class ObservationDashContainer extends React.Component {
  render() {
    return (
      <BaseLayout>
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <div className="list-group">
                <a href="#" className="list-group-item">
                  <h4 className="list-group-item-heading"> A title of observation here</h4>
                  <p className="list-group-item-text">some nature details here</p>
                </a>
                <a href="#" className="list-group-item"> <h4 className="list-group-item-heading"> A title of observation here</h4>
                  <p className="list-group-item-text">some nature details here</p>
                </a>
                <a href="#" className="list-group-item">
                  <h4 className="list-group-item-heading"> A title of observation here</h4>
                  <p className="list-group-item-text">some nature details here</p>
                </a>
                <a href="#" className="list-group-item">
                  <h4 className="list-group-item-heading"> A title of observation here</h4>
                  <p className="list-group-item-text">some nature details here</p>
                </a>
                <a href="#" className="list-group-item">
                  <h4 className="list-group-item-heading"> A title of observation here</h4>
                  <p className="list-group-item-text">some nature details here</p>
                </a>
                <a href="#" className="list-group-item">
                  <h4 className="list-group-item-heading"> A title of observation here</h4>
                  <p className="list-group-item-text">some nature details here</p>
                </a>
              </div>
            </div>
            <div className="col-sm-5">
              <img src="https://www.codeproject.com/KB/web-image/Google_map/sampleMap.JPG"/>
            </div>
            <div className="col-sm-3">
              <div className="row">
                <button className="btn btn-primary col-sm-12" type="button">UserName <span className="badge">4</span>
                </button>
              </div>
              <br/>
              <div className="row">
                <button className="btn btn-primary col-sm-12" type="button">UserName <span className="badge">4</span>
                </button>
              </div>
              <br/>
              <div className="row">
                <button className="btn btn-primary col-sm-12" type="button">UserName <span className="badge">4</span>
                </button>
              </div>
              <br/>
              <div className="row">
                <button className="btn btn-primary col-sm-12" type="button">UserName <span className="badge">4</span>
                </button>
              </div>
              <br/>
              <div className="row">
                <button className="btn btn-primary col-sm-12" type="button">UserName <span className="badge">4</span>
                </button>
              </div>
              <br/>
              <div className="row">
                <button className="btn btn-primary col-sm-12" type="button">UserName <span className="badge">4</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      </BaseLayout>
    )
  }
}


module.exports = {
  ObservationDashContainer
};
