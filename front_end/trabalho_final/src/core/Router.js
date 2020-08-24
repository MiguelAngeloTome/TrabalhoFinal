import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "../components/global/PrivateRoute";
import Home from '../pages/dashboard/dashboard';
import About from '../pages/about/About';
import Data from '../pages/data/Data';
import DataDetails from '../pages/data/Details';
import RegisterPage from "../pages/auth/Register";
import LoginPage from "../pages/auth/Login";
import ListaVinhas from "../pages/vinhas/ListVinhas";
import AuthContext from "../configs/authContext";
import VinhasDetails from "../pages/vinhas/VinhasDetails";
import User from "../pages/user/user";
import Alertas from "../pages/Alertas/Alertas";

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
             <PrivateRoute exact path="/data/:id" component={Data} />
             <PrivateRoute exact path="/data/details/:id" component={DataDetails} />
             <PrivateRoute exact path="/vinhas" component={ListaVinhas} />
             <PrivateRoute exact path="/vinhas/details/:id" component={VinhasDetails} />
             <PrivateRoute path="/user/" component={User} />
             <PrivateRoute exact path="/alertas/" component={Alertas} />
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