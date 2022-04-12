import React, { useState } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const AuthGuardRoute = ({ component: Component, ...rest }) => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const biz = useSelector((state) => state.auth.biz);
  const location = useLocation();

  //const [fromPage, setFromPage] = useState(location.pathname);

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
              /* state: { fromPage }, */
            }}
          />
        )
      }
    ></Route>
  );
};

export default AuthGuardRoute;

/* 

 <Route
      {...rest}
      render={(props) =>
        loggedIn ? (
          biz ? (
            <Redirect to="/login" />
          ) : (
            <Redirect to="/my-cards" />
          )
        ) : (
          <Redirect to="/login" />
        )
      }
    ></Route>
  );
*/
