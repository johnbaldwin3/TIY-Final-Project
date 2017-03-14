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

class ObservationsAddEditContainer extends React.Component {
  render() {
    return (
      <BaseLayout>
        <div className="container">
          <form className="col-sm-12">
            <div className="form-group">
              <label htmlFor="speciesName">Species Name</label>
              <input type="text" className="form-control" id="speciesName" placeholder="Species Name"/>
            </div>
            <div className="form-group">
              <label htmlFor="dateTime">Date of Observation</label>
              <input type="date" className="form-control" id="dateTime" placeholder="When did you observe it?"/>
            </div>
            <div className="form-group">
              <label htmlFor="locationFound">Location Found</label>
              <input type="text" className="form-control" id="locationFound" placeholder="Where did you find it?"/>
            </div>
            <div className="form-group">
              <label htmlFor="locationFound">Observation Notes</label>
              <textarea className="form-control" id="observationNotes" placeholder="Some details of your find..." rows="3"></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="exampleInputFile">Picture Upload</label>
              <input type="file" id="exampleInputFile"/>
              <p className="help-block">Upload your species image here.</p>
            </div>
            <div className="checkbox">
              <label>
                <input type="checkbox"/> Public?
              </label>
            </div>
            <button type="submit" className="btn btn-default">Submit</button>
          </form>
        </div>
      </BaseLayout>
    )
  }
}


module.exports = {
  ObservationsAddEditContainer
};
