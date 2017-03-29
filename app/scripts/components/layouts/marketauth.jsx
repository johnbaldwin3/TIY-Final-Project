var React = require('react');

//marketing and authorization screen layouts

class MarketAuthLayout extends React.Component {
  render() {

    return (

      <div className="wrapper-market">
        <nav className="navbar navbar-inverse market-nav">
          <div className="row">
            <div className="container-fluid">
              <div className="navbar">
                <div className="titler"><span id="app-title">NaturaList <span className="glyphicon glyphicon-leaf glyphicon"></span></span>
                
                </div>
              </div>
            </div>
          </div>
        </nav>

        {this.props.children}

        <div className="container-fluid">
          <div className="row">
            <div id="nav-foot-title" className="footer navbar-bottom nav-foot-title">
              <h5>&copy; 2017 NaturaList (John Baldwin)</h5>
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
