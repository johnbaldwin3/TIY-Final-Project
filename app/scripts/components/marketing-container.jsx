var React = require('react');

//calling in marketing and authorization screen //layouts
var MarketAuthLayout = require('./layouts/marketauth.jsx').MarketAuthLayout;

class MarketingContainer extends React.Component {
  render() {
    return(
      <MarketAuthLayout>
        <div className="container">
          <blockquote id="eO">
            <p className="quote">"Science, its imperfections notwithstanding, is the sword in the stone that humanity finally pulled."</p>
            <footer className="block-footer">Edward O. Wilson in <cite title="Source Title">The Unity of Knowledge (1998)</cite></footer>
          </blockquote>
          <div className="jumbotron marketing-jumbo">
            <h1 id="observe-header">Observe your world!</h1>
            <h3>Put on your biologist hat and explore the world around you...</h3>
            <p>NaturaList allows you to create an account to keep track all of your species encounters in one place. Log your birding trips, record your very own herbarium here, check off lifelist species for your herpetological records, all in one place. Record data about your location, weather, experience. Upload images to each observation. Using mobile images allows the app to do a lot of work for you on observation recordings. Also you may be able to get some background information on the species you observed after each event is added. Log back in or try it out and join today!</p>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-sm-6">
              <a href="#login/" type="button" className="btn btn-primary">Log In</a>
            </div>
            <div className="col-sm-6">
              <a href="#signup/" type="button" className="btn btn-primary">Sign Up</a>
            </div>
          </div>
        </div>
      </MarketAuthLayout>


    )
  }
};

module.exports = {
  MarketingContainer
};
