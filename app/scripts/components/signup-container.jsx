//********************************
//Third Party Libraries
//********************************
var React = require('react');
var Backbone = require('backbone');

//********************************
//Models and Utilities
//********************************
var User = require('../models/user').User;
//call in market/authorize layout
var MarketAuthLayout = require('./layouts/marketauth.jsx').MarketAuthLayout;

//********************************
//Existing User Login Container
//********************************
class SignupContainer extends React.Component {
  constructor(props) {
    super(props);

    //bind this
    //this.signUpUser = this.signUpUser.bind(this);
    this.createUserAccount = this.createUserAccount.bind(this);
  }
  createUserAccount(creds) {
    var user = User.signup(creds, function(){
      Backbone.history.navigate('userinfo/', {trigger: true});
    });

  }
  render() {
    return (
      <MarketAuthLayout>
        <div className="container">
          <div className="row">
            <div className="col-sm-8 col-sm-offset-2 text-center well">
              <h3>Ready to Explore Your World? Sign up here!</h3>
              <p>You'll be able to add more user details inside.</p>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-8 col-sm-offset-2">
              <SignUpForm action={this.createUserAccount}/>
            </div>
          </div>
        </div>

      </MarketAuthLayout>
    )
  }

}

class SignUpForm extends React.Component {
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
            <button type="submit" className="btn btn-success">Let's Do This!</button>
            <div className="pull-right">
              <a href="#" type="button" className="btn btn-danger">Not quite ready?</a>
            </div>
          </div>
        </div>
      </form>
    )
  }
}


module.exports = {
  SignupContainer
};
