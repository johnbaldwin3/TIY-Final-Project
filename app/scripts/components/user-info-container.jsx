//********************************
//Third Party Libraries
//********************************
var React = require('react');
var User = require('../models/user.js').User;

//********************************
//Models, Utilities, Layouts
//********************************
var ParseFile = require('../parse.js').ParseFile;
var BaseLayout = require('./layouts/baselayout.jsx').BaseLayout;
var UserProfile = require('../models/userProfile.js').UserProfile;

//********************************
//Individual Observation / Add / Edit / View
//********************************
class UserInfoContainer extends React.Component {
  constructor(props) {
    super(props);
    var userProfile = new UserProfile();
    var currentUser = User.current();
    
    this.state = {
      userProfile: userProfile,
      currentUser: currentUser
    }
  }
  createUserProfile(data) {
    console.log('data', data);
    this.state.userProfile.create(data, {success: () => {
      this.setState({userProfile: this.state})
    }})
  }
  render() {

    return (
      <BaseLayout>
      <div className="container">
        <div className="row">
          <div className="col-sm-8 col-sm-offset-2 well">
            <h2>Thanks for signing up, {this.state.currentUser.get("username")} !</h2>
            <p>Feel free to add to your profile below, or click "No Thanks" to come back later and do it.</p>
          </div>
        </div>
          <div className="row">
            <div className="col-sm-10 col-sm-offset-1">

            <UserProfileForm userProfile={this.state.userProfile} action={this.createUserProfile} />

          </div>
        </div>
      </div>
      </BaseLayout>
    )
  }
}

class UserProfileForm extends React.Component {
  constructor(props) {
    super(props);

    this.handlePicChange = this.handlePicChange.bind(this);
    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handleBirthdayChange = this.handleBirthdayChange.bind(this);
    this.handleUserBioInfo = this.handleUserBioInfo.bind(this);
    this.handleUserSpeciesInterests = this.handleUserSpeciesInterests.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {

    }

  }
  componentWillReceiveProps(nextProps) {

  }
  handlePicChange(e) {
    var file = e.target.files[0];
    this.setState({pic: file});
    console.log('file', file);
    // User file reader object to display preview
    var reader = new FileReader();
    reader.onloadend = ()=>{
      this.setState({preview: reader.result});
    }
    reader.readAsDataURL(file);
  }
  handleUserNameChange(e){
    this.setState({realOrNickName: e.target.value});
  }
  handleBirthdayChange(e) {
    var newDate = new Date(e.target.value);
    this.setState({birthday: newDate.iso});
  }
  handleUserBioInfo(e) {
    console.log(e.target.value);
    this.setState({bioInfo: e.target.value});
  }
  handleUserSpeciesInterests(e) {
    this.setState({speciesInterests: e.target.value});
  }
  handleSubmit(e) {
    e.preventDefault();

    this.props.action(this.state);
  }
  render() {
    return(
      <form onSubmit={this.handleSubmit}>
        <div className="form-group col-sm-6">
          <div className="media-right">
            <div className="sizer">
              <img className="media-object" src={this.state.preview} />
              <p className="help-block">Image preview</p>
            </div>
          </div>
          <label htmlFor="photoinput">Profile Photo or Avatar</label>
          <input onChange={this.handlePicChange} type="file" className="form-control" id="photoinput" placeholder="PhotoDragDropHere"/>
        </div>
        <div className="form-group col-sm-6">
          <label htmlFor="userName">Your Nickname or Real Name</label>
          <input  onChange={this.handleUserName} type="text" className="form-control" id="userName" placeholder="Your Name Here"/>
        </div>
        <div className="row">

          <div className="form-group col-sm-6 col-sm-offset-6">
            <label htmlFor="birthday">Your Birthday (optional)</label>
            <input onChange={this.handleBirthdayChange} type="date" className="form-control" id="birthday"/>
          </div>
        </div>

          <div className="form-group col-sm-12">
            <label htmlFor="personalBio">Your Bio Information (optional)</label>
            <textarea onChange={this.handleUserBioInfo} id="personalBio" className="form-control" placeholder="Your Personal Bio" rows="3"></textarea>
          </div>

        <div className="form-group col-sm-12">
          <label htmlFor="personalInterests">What kind of organisms do you like to find?</label>
          <textarea onChange={this.handleUserSpeciesInterests} id="personalInterests" className="form-control" placeholder="Your Interests" rows="3"></textarea>
          <p className="help-block">(Example: "Mammals, Reptiles, and Fish"... or something more specific such as "I like to observe hummingbird migrations")</p>
        </div>
        <button type="submit" className="btn btn-success">Submit User Info</button>
        <a type="button" href="#observation/" className="btn btn-danger"> No Thanks!</a>
      </form>
    )
  }
}

module.exports = {
  UserInfoContainer
};
