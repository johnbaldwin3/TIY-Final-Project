var React = require('react');

//marketing and authorization screen layouts

class MarketAuthLayout extends React.Component {
  render() {

    return (

      <div className="wrapper-market">
        <nav className="navbar navbar-default">
          <div className="row">
            <div className="container-fluid">
              <div className="navbar">
                <div className="titler"><a href="#"><span>nature app name here</span> <span className="glyphicon glyphicon-leaf glyphicon"></span>
                </a>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {this.props.children}

        <div className="container-fluid">
          <div className="row">
            <div className="footer navbar-bottom">
              <h5>&copy; 2017 App Name Here</h5>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
//-fixed
module.exports = {
  MarketAuthLayout
}
