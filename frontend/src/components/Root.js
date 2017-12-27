import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch, withRouter } from "react-router-dom";
import Navigation from "./Navigation";
import Posts from "./Posts";

class Root extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <Navigation />

        <Switch>
          <Route path="/" exact component={Posts} />
          <Route path="/:category" component={Posts} />
          <Route component={() => <div>No Match</div>} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect(null)(Root));
