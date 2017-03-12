//********************************
//Third Party Libraries
//********************************
var React = require('react');

//********************************
//Models, Utilities, Layouts
//********************************
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
            <div className="col-sm-4">recent observations ehre</div>
            <div className="col-sm-5">map object here </div>
            <div className="col-sm-3">User lists/rankings here</div>
          </div>
        </div>
      </BaseLayout>
    )
  }
}


module.exports = {
  ObservationDashContainer
};
