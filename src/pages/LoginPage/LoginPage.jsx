import "./LoginPage.css";

import { useState, useRef, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Joi from "joi-browser";
import { useHistory } from "react-router-dom";
import loginSchema from "../../validation/login.validation";
import { authActions } from "../../store/auth";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailRef = useRef(null);
  const history = useHistory();
  const location = useLocation("");

  const dispatch = useDispatch();

  useEffect(() => {
    emailRef.current.focus();
  }, [emailRef]);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleOnSubmit = (event) => {
    if (event) {
      event.preventDefault();
    }

    const validatedValue = Joi.validate({ email, password }, loginSchema, {
      abortEarly: false,
    });

    const { error } = validatedValue;

    if (error) {
      dispatch(authActions.logout());
      toast.error("Email and/or password incorrect");
    } else {
      axios
        .post("/users/login", {
          email,
          password,
        })
        .then((res) => {
          dispatch(authActions.login());
          localStorage.setItem("token", res.data.token);
          const token = res.data.token;
          const decoded = jwt_decode(token);
          const isBiz = decoded.biz;

          if (isBiz === true) {
            dispatch(authActions.updateBiz());
            history.push("/cardinfo");
          } else {
            history.push("/home");

            dispatch(authActions.cancelBiz());
          }
        })
        .catch((err) => {
          if (err.response) {
            toast.error("Email and/or password incorrect");
          }
          localStorage.clear();
          dispatch(authActions.logout());
        });
    }
  };

  const memoizedCallback = useCallback(() => {
    if (location.state) {
      if (location.state.email && location.state.password) {
        if (!email || !password) {
          setEmail(location.state.email);
          setPassword(location.state.password);
        } else {
          handleOnSubmit();
        }
      }
    }
  }, [location.state, handleOnSubmit, email, password]);

  useEffect(() => {
    memoizedCallback();
  }, [location.state, memoizedCallback]);

  return (
    <form className="my-login-form" onSubmit={handleOnSubmit}>
      <label className="my-label" htmlFor="email">
        Email:
      </label>
      <br />
      <input
        type="email"
        id="email"
        value={email}
        ref={emailRef}
        onChange={handleEmailChange}
      ></input>
      <br /> <br />
      <label htmlFor="password">Password:</label>
      <br />
      <input
        type="password"
        id="password"
        value={password}
        onChange={handlePasswordChange}
      ></input>
      <br />
      <br />
      <button>login</button>
    </form>
  );
};

export default LoginPage;
