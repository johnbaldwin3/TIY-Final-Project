//********************************
//Third Party Libraries
//********************************
var React = require('react');
var Backbone = require('backbone');

//********************************
//Models, Utilities
//********************************
var utility = require('../../utilities.js');
var User = require('../../models/user.js').User;

//********************************
//BaseLayout for all main app screens
//********************************

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
                <li className={utility.activeClass('observation/')}><a href="#observation/">Observation Dashboard<span className="sr-only">(current)</span></a></li>
                <li className={utility.activeClass('observation/search/')}><a href="#observation/search/">Add New Observation</a></li>
                <li className={utility.activeClass('observation/gallery/')}> <a href="#observation/gallery/">Photo Gallery</a></li>
                <li className={utility.activeClass('observation/listings/')}><a href="#observation/listings/">User Listings (users collect)</a></li>
                <li><a href="#">Rankings</a></li>
                <li><a href="#">Observation Detail</a></li>
              </ul>
              <ul className="nav navbar-nav navbar-right">
                <li className="dropdown">
                  <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{User.current().get("realOrNickName")} <span className="caret"></span></a>
                  <ul className="dropdown-menu">
                    <li><a href={"#userinfo/" + (User.current().get("objectId")) + "/" }>Your Profile</a></li>
                    <li><a href={"#observation/gallery/" + (User.current().get("objectId")) + "/"}>My Collection</a></li>
                    <li><a href="#">Something else here</a></li>
                    <li role="separator" className="divider"></li>
                    <li><a href="#">Separated link</a></li>
                  </ul>
                </li>
                <li><a  href="#logout/" type="button" className="btn btn-danger">Log Out</a></li>
              </ul>
            </div>
          </div>
        </nav>
        {this.props.children}
        <div className="container-fluid">
          <div className="row ">
            <div className="footer navbar-bottom navbar-inverse">
              <h4>&copy; 2017 App Name Here</h4>
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


//********************************
//Exports
//********************************
module.exports = {
  BaseLayout
};
