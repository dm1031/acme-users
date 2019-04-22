import React, { Fragment } from "react";
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import Nav from "./Nav";
import Home from "./Home";
import Users from "./Users";

const App = () => {
  return (
    <Router>
      <Fragment>
        <h2>Acme Users</h2>
        <Route component={Nav} />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/users/:index" exact component={Users} />
          <Route path="/users/search/:searchTerm?" exact component={Users} />
          <Route
            path="/users/search/:searchTerm/:index"
            exact
            component={Users}
          />
          <Route
            path="/users/"
            exact
            render={() => <Redirect to="/users/0" />}
          />
        </Switch>
      </Fragment>
    </Router>
  );
};

export default App;
