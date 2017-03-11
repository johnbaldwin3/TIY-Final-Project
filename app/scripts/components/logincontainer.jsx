var React = require('react');


//call in mark/authoriz layout
var MarketAuthLayout = require('./layouts/marketauth.jsx').MarketAuthLayout;

class LoginContainer extends React.Component {
  render() {
    return (
      <MarketAuthLayout>
        <div className="container">
          <div className="row">
            <div className="col-sm-8 col-sm-offset-2 text-center well">
              <h3>Glad to have you back! Log in here!</h3>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-8 col-sm-offset-2">
              <form className="form-horizontal">
                <div className="form-group">
                  <label htmlFor="inputEmail3" className="col-sm-2 control-label">Email</label>
                  <div className="col-sm-10">
                    <input type="email" className="form-control" id="inputEmail3" placeholder="Email"/>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="inputPassword3" className="col-sm-2 control-label">Password</label>
                  <div className="col-sm-10">
                    <input type="password" className="form-control" id="inputPassword3" placeholder="Password"/>
                  </div>
                </div>
                <div className="form-group">
                  <div className="col-sm-offset-2 col-sm-10">
                    <button type="submit" className="btn btn-success">Login</button>
                    <div className="pull-right">
                      <a href="#" type="button" className="btn btn-danger">Cancel</a>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

      </MarketAuthLayout>
    )
  }

}


module.exports = {
  LoginContainer
};
