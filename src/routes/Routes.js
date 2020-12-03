/* eslint-disable react/prop-types */
import React, { useContext } from "react";

import { Switch, Route, Redirect } from "react-router-dom";
import SignIn from "../components/SignIn";
import DashBoard from "../components/Dashboard";
import AuthContext from "../context/AuthContext";

function Routes() {
  const auth = useContext(AuthContext);
  return (
    <Switch>
      <RouteRegistration path="/login" component={SignIn} auth={auth.auth} />
      <RouteProtected
        path="/dashboard"
        component={DashBoard}
        auth={auth.auth}
      />
    </Switch>
  );
}

const RouteRegistration = ({
  auth,
  component: Component,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !auth ? <Component {...props} /> : <Redirect to="/dashboard" />
      }
    />
  );
};

const RouteProtected = ({ auth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        auth ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default Routes;
