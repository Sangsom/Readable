import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch, withRouter } from "react-router-dom";
import Navigation from "./Navigation";
import Posts from "./Posts";
import AddPost from "./AddPost";
import EditPost from "./EditPost";
import PostDetails from "./PostDetails";

class Root extends Component {
  render() {
    return (
      <div className="wrapper">
        <Navigation />

        <div className="content">
          <Switch>
            <Route path="/" exact component={Posts} />
            <Route path="/posts/:id" exact component={PostDetails} />
            <Route path="/add-post" exact component={AddPost} />
            <Route path="/edit-post/:id" exact component={EditPost} />
            <Route path="/:category" exact component={Posts} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </div>
    );
  }
}

const NotFound = () => {
  return <div>Not found</div>;
};

export default withRouter(connect(null)(Root));
