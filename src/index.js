import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import GamePage from "./Game";
import Create from "./Create";
import { hydrate } from "react-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <React.StrictMode>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/game/:name" component={GamePage} />
        <Route exact path="/create" component={Create} />
        {/* Add other routes as needed */}
      </Switch>
    </React.StrictMode>
  </Router>
);
