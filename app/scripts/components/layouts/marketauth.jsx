//********************************
//Third Party Libraries
//********************************
var React = require('react');
var moment = require('moment');

//marketing and authorization screen layouts

class MarketAuthLayout extends React.Component {
  render() {

    return (

      <div className="wrapper wrapper-market">
        <div className="titler market-nav">
          <span id="app-title">NaturaList <span className="glyphicon glyphicon-leaf glyphicon"></span></span>
        </div>

        {this.props.children}

        <div className="container-fluid">
          <div className="row">
            <div id="nav-foot-title" className="footer navbar-bottom nav-foot-title">
              <h5>&copy; {moment().format('YYYY')} NaturaList</h5>
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
