import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

const App = () => (
  <Switch>
    <Route
      exact
      path="/"
      render={() => "Hello from react delivered by Rust"}
    />
    <Route
      exact
      path="/about"
      render={() => "You are on the about page"}
    />
  </Switch>
);

export default App;
