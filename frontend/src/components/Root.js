import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch, withRouter } from "react-router-dom";
import Navigation from "./Navigation";
import Posts from "./Posts";
import AddPost from "./AddPost";
import EditPost from "./EditPost";
import PostDetails from "./PostDetails";

class Root extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <Navigation />

        <Switch>
          <Route path="/" exact component={Posts} />
          <Route path="/posts/:id" component={PostDetails} />
          <Route path="/add-post" component={AddPost} />
          <Route path="/edit-post/:id" component={EditPost} />
          <Route path="/:category" component={Posts} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(connect(null)(Root));
