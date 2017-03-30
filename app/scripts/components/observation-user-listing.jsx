//********************************
//Third Party Libraries
//********************************
var React = require('react');
var $ = require('jquery');
//var Parse = require('parse');

//********************************
//Models, Utilities, Layouts
//********************************
var BaseLayout = require('./layouts/baselayout.jsx').BaseLayout;
var ObservationCollection = require('../models/observations.js').ObservationCollection;
var EnhancedObservationCollection = require('../models/observations.js').EnhancedObservationCollection;
var UserProfileCollection = require('../models/userProfile.js').UserProfileCollection;
var UserCollection = require('../models/user.js').UserCollection;

//********************************
//Observation Gallery (Photos Gallery)
//********************************
class ObservationListContainer extends React.Component {
  constructor(props) {
    super(props);
    var userCollection = new UserCollection();

    userCollection.arrangeUsers();
    userCollection.fetch().then((response)=> {
      this.setState({userCollection: userCollection});
    })


    this.state = {
      userCollection
    }
  }
  render() {
    return (
      <BaseLayout>

        <UserNameList userCollection={this.state.userCollection}/>

      </BaseLayout>
    )
  }
}


class UserNameList extends React.Component {
  constructor(props) {
    super(props);
    var userCollection = new UserCollection();

    this.state ={
      userCollection
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({userCollection: nextProps.userCollection});
  }
  handleUserClick(e) {
    console.log(e.target.value);
  }
  render() {
    var users = this.props.userCollection.map((user)=>{
      //console.log(user.get('pic'));

      if(user.get('pic') != undefined) {
        var userPic = user.get('pic').url;

      } else {
        var userPic = "https://images.pexels.com/photos/112640/pexels-photo-112640.jpeg?h=350&auto=compress&cs=tinysrgb";

      }

      return (


        <tr onClick={this.handleUserClick} type="button" key={user.cid} value={user.get("objectId")}>
          <td><img className="avatar" src={userPic} style={{height:40, width:40, borderRadius:50}}/></td>
          <td>{(user.get("realOrNickName"))? user.get("realOrNickName") : user.get('username') }</td>
          <td>{user.get("observationCount")}</td>
          <td>Click To See User's List</td>
        </tr>

      )


    })

    return (
      <div className="container">
        <div className="col-sm-6 col-sm-offset-3">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Avatar</th>
                <th>User Name</th>
                <th># of Observations</th>
                <th>Check Out Collection</th>
              </tr>
            </thead>
            <tbody>
              {users}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

// <div key={obsPics.get("objectId")} className="col-sm-6 col-md-4">
//   <div className="thumbnail">
//     <img src={obsPics.get("pic").url} alt="..."/>
//     <div className="caption">
//       <h4>{obsPics.get("commonName")}</h4>
//       <p><b>Observation &amp; Photo by:</b> {obsPics.get("observer").realOrNickName}</p>
//       <p><a href={"#observation/gallery/" + (obsPics.get("observer").objectId) + "/"} className="btn btn-primary gal-button" role="button">{(obsPics.get("observer").realOrNickName) + "'s Other Lists"}</a> <a href={"#observation/" + obsPics.get('objectId') + '/' } className="btn btn-default gal-button" role="button">Observation Details</a></p>
//     </div>
//   </div>
// </div>

//********************************
//Exports
//********************************
module.exports = {
  ObservationListContainer
};
