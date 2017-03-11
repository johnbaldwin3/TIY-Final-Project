var React = require('react');


class MarketingContainer extends React.Component {
  render() {
    return(
      <div className="wrapper">
        <nav className="navbar navbar-default">
          <div className="row">
            <div className="container-fluid">
              <div className="navbar">
                <a className="navbar-brand" href="#">
                  <img alt="Brand" src="https://unsplash.it/40"/>
                </a>
              </div>
            </div>
          </div>
        </nav>
        <div className="container">
          <div className="jumbotron">
            <h1>Final Project</h1>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <a type="button" className="btn btn-primary">Log In</a>
            </div>
            <div className="col-sm-6">
              <a type="button" className="btn btn-primary">Sign Up</a>
            </div>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="footer navbar-fixed-bottom">
              <h3>Footer info here</h3>
            </div>
          </div>
        </div>
      </div>
    )
  }
};

module.exports = {
  MarketingContainer
};
