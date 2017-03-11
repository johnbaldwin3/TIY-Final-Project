var React = require('react');

//calling in marketing and authorization screen //layouts
var MarketAuthLayout = require('./layouts/marketauth.jsx').MarketAuthLayout

class MarketingContainer extends React.Component {
  render() {
    return(
      <MarketAuthLayout>
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
      </MarketAuthLayout>


    )
  }
};

module.exports = {
  MarketingContainer
};
