//********************************
//Third Party Libraries
//********************************
var React = require('react');
var Backbone = require('backbone');

//********************************
//Utilities
//********************************
//var utility = require('../utilities');

class BaseLayout extends React.Component {
  render() {
    return(

      <div className="wrapper">
        <nav className="navbar navbar-inverse">
          <div className="container-fluid">
            <div className="navbar-header">
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">NatureApp name <span className="glyphicon glyphicon-leaf glyphicon"></span></a>
            </div>
            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
              <ul className="nav navbar-nav">
                <li className={activeClass('observation/')}><a href="#observation/">Observation Dashboard<span className="sr-only">(current)</span></a></li>
                <li><a href="#">All Listed Observations</a></li>
                <li className={activeClass('observation/gallery/')}> <a href="#observation/gallery/">Photo Gallery</a></li>
                <li><a href="#">User Listings (users collect)</a></li>
                <li><a href="#">Rankings</a></li>
                <li><a href="#">Observation Detail</a></li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li><a type="button" className="btn btn-danger" href="#">Log Out</a></li>
              </ul>
            </div>
          </div>
        </nav>
        {this.props.children}
        <div className="container-fluid">
          <div className="row ">
            <div className="footer navbar-fixed-bottom navbar-inverse">
              <span>&copy; 2017 App Name Here</span>
              <ul className="nav navbar-nav navbar-right">
                <li><a href="#">Back to Top</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function isActive (url) {
  return Backbone.history.fragment == url;
}

function activeClass(url) {
  return isActive(url) ? 'active' : '';
}

module.exports = {
  BaseLayout
};
