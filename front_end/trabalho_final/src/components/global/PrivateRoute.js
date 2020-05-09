import React from "react";
import AuthContext from "../../configs/authContext";
import { Route, Redirect } from "react-router-dom";

export default class PrivateRoute extends React.Component {
  static contextType = AuthContext;
  render() {
    const { component: Component, /*roles*/ ...rest } = this.props;
    const { user } = this.context;
    return (
      <Route
        {...rest}
        render={(props) =>
          user /*&& roles.some((r) => r === user.role)*/ ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    );
  }
}