import React, { useState } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthGuardRoute = ({ component: Component, ...rest }) => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const biz = useSelector((state) => state.auth.biz);
  const location = useLocation();

  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn === true && biz === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/onlyforbiz",
            }}
          />
        )
      }
    ></Route>
  );
};

export default AuthGuardRoute;
