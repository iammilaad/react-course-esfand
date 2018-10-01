import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";
import { connect } from "react-redux";
import App from "layouts/dashboardLayout/App";
import asyncComponent from "utils/helpers/AsyncFunc";
import * as constants from 'utils/globalRedux/user/constants';

const RestrictedRoute = ({ component: Component, isLoggedIn, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/signin",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);
const PublicRoutes = ({ history, isLoggedIn }) => {
    console.log("hey",history)
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route
          exact
          path={"/"}
          component={asyncComponent(() => import("pages/auth/signin/signIn"))}
        />
        <Route
          exact
          path={"/404"}
          component={asyncComponent(() => import("pages/errors/404"))}
        />
        <Route
          exact
          path={"/500"}
          component={asyncComponent(() => import("pages/errors/500"))}
        />
        <Route
          exact
          path={"/signin"}
          component={asyncComponent(() => import("pages/auth/signin/signIn"))}
        />
        <Route
          exact
          path={"/signup"}
          component={asyncComponent(() => import("pages/auth/signup/signUp"))}
        />
        <Route
          exact
          path={"/forgot-password"}
          component={asyncComponent(() => import("pages/auth/forgotPassword/forgotPassword"))}
        />
        <Route
          exact
          path={"/reset-password"}
          component={asyncComponent(() => import("pages/auth/resetPassword/resetPassword"))}
        />

        <RestrictedRoute
          path="/dashboard"
          component={App}
          isLoggedIn={isLoggedIn}
        />
        <Route
          path="*"
          component={asyncComponent(() => import("pages/errors/404"))}
        />
      </Switch>
    </ConnectedRouter>
  );
};

export default connect(state => ({
    isLoggedIn: state.getIn([constants.USER,"token"], null) !== null
}))(PublicRoutes);
