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
    var observationCollection = new ObservationCollection();
    var userProfileCollection = new UserProfileCollection();
    var enhancedObservationCollection = new EnhancedObservationCollection();
    var userCollection = new UserCollection();

    userCollection.fetch().then((response)=> {
      console.log('resp ', response);
      this.setState({userCollection: userCollection});
    })

    if(this.props.id) {
      //if true, set objectId
      console.log('tpid', this.props.id);
      userProfileCollection.set('objectId', this.props.id);

    } else {

      enhancedObservationCollection.urlSetter('observer');
      enhancedObservationCollection.fetch().then(() => {
        console.log('response', enhancedObservationCollection);

        this.setState({observationCollection: enhancedObservationCollection});
      });

    }

    this.state = {
      observationCollection,
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

// <UserListings observationCollection={this.state.observationCollection}/>
class UserListings extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {

    var obsList = this.props.observationCollection.map((obsPics)=> {

      return (
        <a href="#" className="list-group-item">
          <img className="media-object" src={obsPics.get("pic").url} alt="..."/>
        </a>

      )

    });

    return(
      <div className="container">
        <div className="list-group">
          {obsList}
          <div>hello, i work</div>
        </div>
      </div>
    )
  }

}

class UserNameList extends React.Component {
  constructor(props) {
    super(props);

  }
  render() {
    var users = this.props.userCollection.map((user)=>{

      return (
        <tr key={user.cid}>
          <td>{user.get("realOrNickName")}</td>
          <td>Arbitrary Number right now</td>
          <td><button>Click To See User's List</button></td>
        </tr>
      )


    })

    return (
      <div className="container">
        <div className="col-sm-6 col-sm-offset-3">
          <table className="table table-hover">
            <thead>
              <tr>
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
