var React = require('react');

//marketing and authorization screen layouts

class MarketAuthLayout extends React.Component {
  render() {

    return (

      <div className="wrapper">
        <nav className="navbar navbar-default">
          <div className="row">
            <div className="container-fluid">
              <div className="navbar">
                <div className="titler"><span>nature app name here</span> <span className="glyphicon glyphicon-leaf glyphicon"></span>

                </div>
              </div>
            </div>
          </div>
        </nav>

        {this.props.children}

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



}

module.exports = {
  MarketAuthLayout
}
