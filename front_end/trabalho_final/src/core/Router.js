import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavbarComponent from "../components/global/Navbar";
import PrivateRoute from "../components/global/PrivateRoute";

import Home from '../pages/home/Home';
import About from '../pages/about/About';
import Data from '../pages/data/Data';
import DataDetails from '../pages/data/Details';
import LoginPage from "../pages/auth/Login";
import RegisterPage from "../pages/auth/Register";


export default class RouterComponent extends React.Component {
  render() {
    return (
      <Router>
        <NavbarComponent />
        <Switch>

          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/about" component={About} />

          <PrivateRoute exact path="/data" component={Data} />
          <PrivateRoute exact path="/data/details/:id" component={DataDetails} />
          <Route path="*" component={Home} />


        </Switch>
      </Router>
    );
  }
}