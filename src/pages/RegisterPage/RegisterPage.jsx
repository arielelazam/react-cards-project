import Joi from "joi-browser";
import axios from "axios";
import { useState } from "react";
import registerSchema from "../../validation/register.validation";
import { useHistory } from "react-router-dom";
import "./RegisterPage.css";

const RegisterPage = () => {
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [biz, setBiz] = useState(false);
  const [nameError, setNameError] = useState([]);
  const [emailError, setEmailError] = useState([]);
  const [passwordError, setPasswordError] = useState([]);

  const handleName = (event) => {
    setName(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleBiz = (event) => {
    setBiz(event.target.checked);
  };
  const handleRegister = (event) => {
    event.preventDefault();

    const validatedValue = Joi.validate(
      { name, email, password, biz },
      registerSchema,
      {
        abortEarly: false,
      }
    );

    const { error } = validatedValue;

    if (error) {
      let newNameErr = [];
      let newEmailErr = [];
      let newPasswordErr = [];
      error.details.forEach((item) => {
        const errMsg = item.message;
        const errSrc = item.path[0];

        if (errSrc === "name") {
          newNameErr = [...newNameErr, errMsg];
        }
        if (errSrc === "email") {
          newEmailErr = [...newEmailErr, errMsg];
        }
        if (errSrc === "password") {
          newPasswordErr = [...newPasswordErr, errMsg];
        }
      });

      setNameError(newNameErr);
      setEmailError(newEmailErr);
      setPasswordError(newPasswordErr);
    } else {
      axios
        .post("/users/register", { name, email, password, biz })
        .then((res) => {
          history.push("/login", { email, password });
        })
        .catch((err) => {
          if (err.response) {
            alert("Email already exist");
          }
        });
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <div className="form-group row register-row">
        <label
          htmlFor="inputEmail3"
          className="register-input col-sm-1 col-form-label "
        >
          Name:
        </label>
        <div className="col-sm-3">
          <input
            type="text"
            className="form-control register-form-control"
            id="inputEmail3"
            placeholder="Name"
            value={name}
            onChange={handleName}
          />
          {nameError.map((item, idx) => {
            return (
              <ul key={idx}>
                <li className="errMsg" key={idx}>
                  *{item}.
                </li>
              </ul>
            );
          })}
        </div>
      </div>

      <div className="form-group row register-row">
        <label
          htmlFor="inputEmail3"
          className="register-inputs col-sm-1 col-form-label"
        >
          Email:
        </label>
        <div className="col-sm-3">
          <input
            type="text"
            className="form-control register-form-control"
            id="inputEmail4"
            placeholder="Email"
            value={email}
            onChange={handleEmail}
          />
          {emailError.map((item, idx) => {
            return (
              <ul key={idx}>
                <li className="errMsg" key={idx}>
                  *{item}.
                </li>
              </ul>
            );
          })}
        </div>
      </div>

      <div className="form-group row register-row">
        <label
          htmlFor="inputEmail3"
          className="register-input col-sm-1 col-form-label"
        >
          Password:
        </label>
        <div className="col-sm-3">
          <input
            type="password"
            className="form-control register-form-control"
            id="inputEmail5"
            placeholder="Password"
            value={password}
            onChange={handlePassword}
          />
          {passwordError.map((item, idx) => {
            return (
              <ul key={idx}>
                <li className="errMsg" key={idx}>
                  *{item}.
                </li>
              </ul>
            );
          })}
        </div>
      </div>

      <fieldset className="form-group form-row">
        <div className="row">
          <div className="col-sm-10">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="gridRadios1"
                onChange={handleBiz}
              />
              <label className="form-check-label" htmlFor="gridRadios1">
                Business Account
              </label>
            </div>
          </div>
        </div>
      </fieldset>
      <div className="form-group row"></div>
      <div className="form-group row">
        <div className="col-sm-10">
          <button type="submit" className="btn btn-primary">
            Register!
          </button>
        </div>
      </div>
    </form>
  );
};

export default RegisterPage;
