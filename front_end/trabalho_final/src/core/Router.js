import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavbarComponent from "../components/global/Navbar";
import PrivateRoute from "../components/global/PrivateRoute";

import Home from '../pages/dashboard/dashboard';
import About from '../pages/about/About';
import Data from '../pages/data/Data';
import DataDetails from '../pages/data/Details';
import RegisterPage from "../pages/auth/Register";
import LoginPage from "../pages/auth/Login";
import AuthContext from "../configs/authContext";

export default class RouterComponent extends React.Component {
  static contextType = AuthContext;
  render() {
    const { user} = this.context;
    return (
      <Router>
         {/*user && (
          <NavbarComponent />
         )*/}
          {user ? ( 
             <Switch>

            <Route exact path="/about" component={About} />
             <PrivateRoute exact path="/data" component={Data} />
             <PrivateRoute exact path="/data/details/:id" component={DataDetails} />
            <Route path="*" component={Home} />
            </Switch>
          ):(
            <Switch>
            <Route exact path="/register" component={RegisterPage} />
            <Route path="*" component={LoginPage} />
            </Switch>
          )}
          


      
      </Router>
    );
  }
}