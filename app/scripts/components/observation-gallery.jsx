// //********************************
// //Third Party Libraries
// //********************************
//
// var React = require('react');
// var $ = require('jquery');
// var Backbone = require('backbone');
//
// //********************************
// //Models, Utilities, Layouts
// //********************************
//
// var BaseLayout = require('./layouts/baselayout.jsx').BaseLayout;
// var ObservationCollection = require('../models/observations.js').ObservationCollection;
// var UserProfileCollection = require('../models/userProfile.js').UserProfileCollection;
// var UserCollection = require('../models/user.js').UserCollection;
//
// //********************************
// //Observation Gallery (Photos Gallery)
// //********************************
//
// class ObservationGalleryContainer extends React.Component {
//   constructor(props) {
//     super(props);
//
//     var observationCollection = new ObservationCollection();
//
//     this.state = {
//       props: this.props.id,
//       observationCollection
//     }
//
//     if(props.id) {
//       observationCollection.parseWhere('observer', '_User', props.id).parseInclude('observer').fetch().then(()=> {
//       this.setState({ observationCollection });
//     });
//     } else {
//       observationCollection.parseInclude('observer').fetch().done(() => {
//         this.setState({ observationCollection })
//       });
//
//     }
//
//   }
//
//   componentWillReceiveProps(nextProps) {
//     var observationCollection = new ObservationCollection();
//
//     if(nextProps.id) {
//       this.setState({ props: nextProps.id });
//       observationCollection.parseWhere('observer', '_User', nextProps.id).parseInclude('observer').fetch().then(()=> {
//       this.setState({ observationCollection });
//     });
//     } else {
//       this.setState( { props: null });
//       observationCollection.parseInclude('observer').fetch().done(() => {
//         this.setState({ observationCollection })
//       });
//     }
//   }
//
//   render() {
//     return (
//       <BaseLayout>
//         { this.state.props ? <UserListings observationCollection={this.state.observationCollection} /> : <GalleryListings observationCollection={this.state.observationCollection} /> }
//       </BaseLayout>
//     )
//   }
// }
//
// //********************************
// //Observation Gallery Listing (Photos Gallery)
// //********************************
//
// class GalleryListings extends React.Component {
//   constructor(props) {
//     super(props);
//     this.renderUserList = this.renderUserList.bind(this);
//   }
//
//   renderUserList(e) {
//     var url = "/observation/gallery/" + e.target.value + "/";
//     Backbone.history.navigate(url, {trigger: true});
//   }
//
//   render() {
//     var obsGallery = this.props.observationCollection.map((obsPics)=> {
//       return (
//           <div key={obsPics.get("objectId")} className="col-sm-6 col-md-4">
//             <div className="thumbnail">
//               <img src={obsPics.get("pic").url} alt="..."/>
//               <div className="caption">
//                 <h4>{obsPics.get("commonName")}</h4>
//                 <p><b>Observation &amp; Photo by:</b> {obsPics.get("observer").realOrNickName}</p>
//                 <p><button onClick={this.renderUserList} value={ obsPics.get("observer").objectId} className="btn btn-primary gal-button" role="button">{(obsPics.get("observer").realOrNickName) + "'s Other Lists"}</button> <a href={"#observation/" + obsPics.get('objectId') + '/' } className="btn btn-default gal-button" role="button">Observation Details</a></p>
//               </div>
//             </div>
//           </div>
//       )
//     });
//
//     return(
//       <div className="container">
//         <div className="row">
//           {obsGallery}
//         </div>
//       </div>
//     )
//   }
// }
//
// //********************************
// //User Gallery Listing (Photos Gallery)
// //********************************
//
// class UserListings extends React.Component{
//   constructor(props){
//     super(props);
//     var userCollection = new UserCollection();
//     var userObservations = new ObservationCollection();
//
//     this.handleBackToGallery = this.handleBackToGallery.bind(this);
//
//   }
//
//   handleBackToGallery(e) {
//     Backbone.history.navigate('observation/gallery/', {trigger: true});
//   }
//
//   render() {
//     var obsGallery;
//     if( this.props.observationCollection) {
//       obsGallery = this.props.observationCollection.map((obsPics)=> {
//         console.log('obsPics', obsPics);
//         return (
//           <div key={obsPics.get("objectId")} className="col-sm-6 col-md-4">
//             <div className="thumbnail">
//               <img src={obsPics.get("pic").url} alt="..."/>
//               <div className="caption">
//                 <h4>{obsPics.get("commonName")}</h4>
//                 <p><b>Observation &amp; Photo by:</b> {obsPics.get("observer").realOrNickName}</p>
//                 <p><button onClick={this.handleBackToGallery} value={ obsPics.get("observer").objectId} className="btn btn-primary gal-button" role="button">Back to Gallery</button> <a href={"#observation/" + obsPics.get('objectId') + '/' } className="btn btn-default gal-button" role="button">Observation Details</a></p>
//               </div>
//             </div>
//           </div>
//         )
//       });
//     }
//
//     return(
//       <div className="container">
//         <div className="row">
//           {obsGallery}
//         </div>
//       </div>
//     )
//   }
// }
// //********************************
// //Exports
// //********************************
// module.exports = {
//   ObservationGalleryContainer
// };




/*****************************************************

        John's WORK BELOW

****************************************************/





//********************************
//Third Party Libraries
//********************************
var React = require('react');
var $ = require('jquery');
var Backbone = require('backbone');
var LazyLoad = require('react-lazyload').LazyLoad;


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
class ObservationGalleryContainer extends React.Component {
  constructor(props) {
    super(props);
    var observationCollection = new ObservationCollection();
    var enhancedObservationCollection = new EnhancedObservationCollection();
    var userObservations = new ObservationCollection();

    this.toggleGallery = this.toggleGallery.bind(this);
    this.handleNewCollection = this.handleNewCollection.bind(this);
    console.log('propsid', this.props.id);

   enhancedObservationCollection.urlSetter('observer');
    enhancedObservationCollection.fetch().then(() => {
      console.log('response', enhancedObservationCollection);

      this.setState({observationCollection: enhancedObservationCollection});
    });

    this.state = {
      observationCollection,
      userObservations,
      showGallery: true,
      userName: ''

    }
  }
  handleNewCollection(dataId, dataName) {
    var clickedUser = dataId;
    console.log('clickedUser', clickedUser);
    var clickedUsersName = dataName;
    this.setState({userName: clickedUsersName});
    console.log('clickedUsersName', clickedUsersName);
    var userObservations = new ObservationCollection();

    //fetch data related to user here

    /************************************
    Need a parseInclude to also fetch the user's profile
    for display purpose on the user's collections in UserListings
    component
    *********************************/
    userObservations.parseWhere('observer', '_User', clickedUser).fetch().then((data)=> {

      this.setState({userObservations});

      console.log('data', data);
    });
  }
  toggleGallery() {
    var state = !this.state.showGallery;
    this.setState({ showGallery: state });
  }
  render() {
    return (
      <BaseLayout>
        {this.state.showGallery ? <GalleryListings toggleGallery={this.toggleGallery}
        userName={this.state.userName}
        observationCollection={this.state.observationCollection}
        action={this.handleNewCollection}/> : <UserListings toggleGallery={this.toggleGallery} userId={this.props.id}
        userName={this.state.userName}
        userObservations={this.state.userObservations}
         /> }
      </BaseLayout>
    )
  }
}

//********************************
//Observation Gallery Listing (Photos Gallery)
//********************************
class GalleryListings extends React.Component {
  constructor(props) {
    super(props);
    this.handleUserList = this.handleUserList.bind(this);
  }
  handleUserList(e) {
    var etarg = e.target.value;
    var userId = etarg.substr(0, etarg.indexOf(' '));
    var userName = etarg.substr(etarg.indexOf(' ')+1);
    //var userName = etargArray[1];

    this.setState({userName: userName});

    console.log('etarg', etarg, 'userId', userId, 'userName', userName);
    var url = "/observation/gallery/" + userId + "/";
    this.props.action(userId, userName);
    Backbone.history.navigate(url, {trigger: true});
    this.props.toggleGallery();
  }
  render() {
    var obsGallery = this.props.observationCollection.map((obsPics)=> {

      //console.log("runner", obsPics.get("observer").realOrNickName);
      if(!obsPics.get("observer").realOrNickName) {
        console.log("id here", obsPics.get("objectId"));
      }

      //console.log("observer",  obsPics.get("observer").objectId);
        //console.log(this.props.userName);
      return (

          <div key={obsPics.get("objectId")} className="col-sm-6 col-md-4">
            <div className="thumbnail">
              <img src={obsPics.get("pic").url} alt="..."/>
              <div className="caption">
                <h4>{obsPics.get("commonName")}</h4>
                <p><b>Observation &amp; Photo by:</b> {obsPics.get("observer").realOrNickName}</p>
                <p>
                  <button onClick={this.handleUserList} value={obsPics.get("observer").objectId + " " + obsPics.get("observer").realOrNickName} className="btn btn-primary gal-button" role="button">{(obsPics.get("observer").realOrNickName) + "'s Other Lists"}</button>
                  <a href={"#observation/" + obsPics.get('objectId') + "/" } role="button" className="btn btn-default gal-button">
                    Observation Details
                  </a>
                </p>
              </div>
            </div>
          </div>

      )

    });

    return(
      <div className="container">

        <div className="row">

            {obsGallery}


        </div>
      </div>
    )
  }

}

//********************************
//User Gallery Listing (Photos Gallery)
//********************************
class UserListings extends React.Component{
  constructor(props){
    super(props);
    var userCollection = new UserCollection();
    var userObservations = new ObservationCollection();

    this.handleBackToGallery = this.handleBackToGallery.bind(this);

  }
  handleBackToGallery(e) {
    Backbone.history.navigate('observation/gallery/', {trigger: true});
    this.props.toggleGallery();
  }
  render() {
    /************************************
    Need to get User Info from pointer with include
    so that the following will display user names
    *********************************/
    var obsGallery = this.props.userObservations.map((obsPics)=> {
      console.log('propsName', this.props.userName);
      return (

        <div key={obsPics.get("objectId")} className="col-sm-6 col-md-4">
          <div className="thumbnail">
            <img src={obsPics.get("pic").url} alt="..."/>
            <div className="caption">
              <h4>{obsPics.get("commonName")}</h4>
              <p><b>Observation &amp; Photo by:</b> {this.props.userName}</p>
              <p><button onClick={this.handleBackToGallery} value={ obsPics.get("observer").objectId} className="btn btn-primary gal-button" role="button">Back to Gallery</button> <a href={"#observation/" + obsPics.get('objectId') + '/' } className="btn btn-default gal-button" role="button">Observation Details</a></p>
            </div>
          </div>
        </div>


      )

    });
    return(
      <div className="container">
        <h3>{(this.props.userName)+"'s"+" "+"Observations"}</h3>
        <div className="row">
          {obsGallery}
        </div>
      </div>
    )
    }

    }

//********************************
//Exports
//********************************
module.exports = {
  ObservationGalleryContainer
};





/*****************************************************

        MADY's WORK BELOW

****************************************************/


// //********************************
// //Third Party Libraries
// //********************************
// var React = require('react');
// var $ = require('jquery');
// var Backbone = require('backbone');
//
// //********************************
// //Models, Utilities, Layouts
// //********************************
// var BaseLayout = require('./layouts/baselayout.jsx').BaseLayout;
// var ObservationCollection = require('../models/observations.js').ObservationCollection;
// var EnhancedObservationCollection = require('../models/observations.js').EnhancedObservationCollection;
// var UserProfileCollection = require('../models/userProfile.js').UserProfileCollection;
// var UserCollection = require('../models/user.js').UserCollection;
//
// //********************************
// //Observation Gallery (Photos Gallery)
// //********************************
// class ObservationGalleryContainer extends React.Component {
//   constructor(props) {
//     super(props);
//
//     var observationCollection = new ObservationCollection();
//
//     this.state = {
//       props: this.props.id,
//       observationCollection
//     }
//
//     if(props.id) {
//       observationCollection.parseWhere('observer', '_User', props.id).fetch().then(()=> {
//       this.setState({ observationCollection });
//     });
//     } else {
//       observationCollection.fetch().done(() => {
//         this.setState({ observationCollection })
//       });
//     }
//   }
//
//   componentWillReceiveProps(nextProps) {
//     var observationCollection = this.state.observationCollection;
//
//     if(nextProps.id) {
//       this.setState({ props: nextProps.id });
//       observationCollection.parseWhere('observer', '_User', nextProps.id).fetch().then(()=> {
//       this.setState({ observationCollection });
//     });
//     } else {
//       this.setState( { props: null });
//       observationCollection.fetch().done(() => {
//         this.setState({ observationCollection })
//       });
//     }
//   }
//
//   render() {
//     return (
//       <BaseLayout>
//        { this.state.props ? <UserListings observationCollection={this.state.observationCollection} /> : <GalleryListings observationCollection={this.state.observationCollection} /> }
//      </BaseLayout>
//     )
//   }
// }
//
// //********************************
// //Observation Gallery Listing (Photos Gallery)
// //********************************
// class GalleryListings extends React.Component {
//   constructor(props) {
//     super(props);
//
//     this.renderUserList = this.renderUserList.bind(this);
//   }
//
//   renderUserList(e) {
//     var url = "/observation/gallery/" + e.target.value + "/";
//     Backbone.history.navigate(url, {trigger: true});
//   }
//
//   render() {
//     var obsGallery = this.props.observationCollection.map((obsPics)=> {
//       return (
//           <div key={obsPics.get("objectId")} className="col-sm-6 col-md-4">
//             <div className="thumbnail">
//               <img src={obsPics.get("pic").url} alt="..."/>
//               <div className="caption">
//                 <h4>{obsPics.get("commonName")}</h4>
//                 <p><b>Observation &amp; Photo by:</b> {obsPics.get("observer").realOrNickName}</p>
//                 <p><button onClick={this.renderUserList} value={ obsPics.get("observer").objectId} className="btn btn-primary gal-button" role="button">{(obsPics.get("observer").realOrNickName) + "'s Other Lists"}</button> <a href={"#observation/" + obsPics.get('objectId') + '/' } className="btn btn-default gal-button" role="button">Observation Details</a></p>
//               </div>
//             </div>
//           </div>
//       )
//     });
//
//     return(
//       <div className="container">
//         <div className="row">
//           {obsGallery}
//         </div>
//       </div>
//     )
//   }
// }
//
// //********************************
// //User Gallery Listing (Photos Gallery)
// //********************************
// class UserListings extends React.Component{
//   constructor(props){
//     super(props);
//     var userCollection = new UserCollection();
//     var userObservations = new ObservationCollection();
//
//     this.handleBackToGallery = this.handleBackToGallery.bind(this);
//
//   }
//   handleBackToGallery(e) {
//     Backbone.history.navigate('observation/gallery/', {trigger: true});
//     //this.props.toggleGallery();
//   }
//
//   componentWillReceiveProps(nextProps) {
//     console.log('nextProps', nextProps);
//   }
//
//   render() {
//     /************************************
//     Need to get User Info from pointer with include
//     so that the following will display user names
//     *********************************/
//     var obsGallery;
//     if( this.props.observationCollection) {
//       obsGallery = this.props.observationCollection.map((obsPics)=> {
//
//         return (
//
//           <div key={obsPics.get("objectId")} className="col-sm-6 col-md-4">
//             <div className="thumbnail">
//               <img src={obsPics.get("pic").url} alt="..."/>
//               <div className="caption">
//                 <h4>{obsPics.get("commonName")}</h4>
//                 <p><b>Observation &amp; Photo by:</b> {obsPics.get("observer").realOrNickName}</p>
//                 <p><button onClick={this.handleBackToGallery} value={ obsPics.get("observer").objectId} className="btn btn-primary gal-button" role="button">Back to Gallery</button> <a href={"#observation/" + obsPics.get('objectId') + '/' } className="btn btn-default gal-button" role="button">Observation Details</a></p>
//               </div>
//             </div>
//           </div>
//
//
//         )
//
//       });
//     }
//
//     return(
//       <div className="container">
//         <div className="row">
//           {obsGallery}
//         </div>
//       </div>
//     )
//     }
//
//     }
// //********************************
// //Exports
// //********************************
// module.exports = {
//   ObservationGalleryContainer
// };
