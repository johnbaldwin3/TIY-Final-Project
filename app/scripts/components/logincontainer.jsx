//********************************
//Third Party Libraries
//********************************
var React = require('react');
var Backbone = require('backbone');

//********************************
//Models, Utilities, Layouts
//********************************
var User = require('../models/user').User;
//call in market/authorize layout
var MarketAuthLayout = require('./layouts/marketauth.jsx').MarketAuthLayout;

//********************************
//Existing User Login Container
//********************************
class LoginContainer extends React.Component {
  constructor(props){
    super(props);

    //bind this
    this.loginUser = this.loginUser.bind(this);

    this.state = {
      username: '',
      password: ''
    }
  }
  loginUser(creds) {
    User.login(creds, function(user) {
      Backbone.history.navigate('observation/', {trigger: true});
    });
  }
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
              <LoginForm action={this.loginUser} />
            </div>
          </div>
        </div>

      </MarketAuthLayout>
    )
  }

}

//********************************
//Existing User Login Form
//********************************
class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    //binding this to handlers
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      username: '',
      password: ''
    }
  }
  handleEmailChange(e){
    this.setState({username: e.target.value});
  }
  handlePasswordChange(e){
    this.setState({password: e.target.value});
  }
  handleSubmit(e){
    e.preventDefault();
    //set the state with user and pass
    this.props.action(this.state);
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit}className="form-horizontal">
        <div className="form-group">
          <label htmlFor="inputEmail3" className="col-sm-2 control-label">Email</label>
          <div className="col-sm-10">
            <input onChange={this.handleEmailChange} type="email" className="form-control" id="inputEmail3" placeholder="Email"/>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputPassword" className="col-sm-2 control-label">Password</label>
          <div className="col-sm-10">
            <input onChange={this.handlePasswordChange} type="password" className="form-control" id="inputPassword" placeholder="Password"/>
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
    )
  }
}


module.exports = {
  LoginContainer
};
