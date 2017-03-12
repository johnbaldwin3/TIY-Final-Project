//********************************
//Third Party Libraries
//********************************
var React = require('react');

//********************************
//Models, Utilities, Layouts
//********************************
var BaseLayout = require('./layouts/baselayout.jsx').BaseLayout;

//********************************
//Individual Observation / Add / Edit / View
//********************************

class ObservationAddEditContainer extends React.Component {
  render() {
    return (
      <BaseLayout>
        <div className="container">
          <div className="row">
            <div className="col-sm-3">
              
            </div>
            <div className="col-sm-3">map object here </div>
            <div className="col-sm-3">User lists or rankings here</div>
          </div>
        </div>
      </BaseLayout>
    )
  }
}


module.exports = {
  ObservationAddEditContainer
};
