var React = require('react');


class UserInfoContainer extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-8 col-sm-offset-2 well">
            <h2>Thanks for signing up __username__!</h2>
            <p>Feel free to add to your profile below, or click "No Thanks" to come back later and do it.</p>
          </div>
        </div>
          <div className="row">
            <div className="col-sm-10 col-sm-offset-1">
            <form>
              <div className="form-group col-sm-6">
                <label htmlFor="photoinput">Profile Photo or Avatar</label>
                <input type="file" className="form-control" id="photoinput" placeholder="PhotoDragDropHere"/>
              </div>
              <div className="form-group col-sm-6">
                <label htmlFor="userName">Your Real Name</label>
                <input type="text" className="form-control" id="userName" placeholder="Your Name Here"/>
              </div>
              <div className="row">

                <div className="form-group col-sm-6 col-sm-offset-6">
                  <label htmlFor="birthday">Your Birthday (optional)</label>
                  <input type="date" className="form-control" id="birthday"/>
                </div>
              </div>

                <div className="form-group col-sm-12">
                  <label htmlFor="personalBio">Your Bio Information (optional)</label>
                  <textarea id="personalBio" className="form-control" placeholder="Your Personal Bio" rows="3"></textarea>
                </div>

              <div className="form-group col-sm-12">
                <label htmlFor="personalInterests">What kind of organisms do you like to find?</label>
                <textarea id="personalInterests" className="form-control" placeholder="Your Interests" rows="3"></textarea>
                <p className="help-block">(Example: "Mammals, Reptiles, and Fish"... or something more specific such as "I like to observe hummingbird migrations")</p>
              </div>
              <button type="submit" className="btn btn-success">Submit User Info</button>
              <button type="submit" className="btn btn-danger"> No Thanks!</button>
            </form>

          </div>
        </div>
      </div>
    )
  }
}

module.exports = {
  UserInfoContainer
};
