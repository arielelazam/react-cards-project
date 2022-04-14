import Joi from "joi-browser";
import axios from "axios";
import { useState } from "react";
import createCardSchema from "../../validation/createCard.validation";
import { useHistory } from "react-router-dom";
import "./CreateCardPage.css";

const CreateCardPage = () => {
  const history = useHistory();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [nameError, setNameError] = useState([]);
  const [descriptionError, setDescriptionError] = useState([]);
  const [addressError, setAddressError] = useState([]);
  const [phoneError, setPhoneError] = useState([]);

  const sended = true;

  const handleName = (event) => {
    setName(event.target.value);
  };
  const handleDescription = (event) => {
    setDescription(event.target.value);
  };
  const handleAddress = (event) => {
    setAddress(event.target.value);
  };
  const handlePhone = (event) => {
    setPhone(event.target.value);
  };

  const handleCreateCard = (event) => {
    event.preventDefault();

    const validatedValue = Joi.validate(
      { name, description, address, phone },
      createCardSchema,
      {
        abortEarly: false,
      }
    );

    const { error } = validatedValue;

    if (error) {
      let newNameErr = [];
      let newDescriptionErr = [];
      let newAddressErr = [];
      let newPhoneErr = [];
      error.details.forEach((item) => {
        const errMsg = item.message;
        const errSrc = item.path[0];

        if (errSrc === "name") {
          newNameErr = [...newNameErr, errMsg];
        }
        if (errSrc === "description") {
          newDescriptionErr = [...newDescriptionErr, errMsg];
        }
        if (errSrc === "address") {
          newAddressErr = [...newAddressErr, errMsg];
        }
        if (errSrc === "phone") {
          newPhoneErr = [...newPhoneErr, errMsg];
        }

        setNameError(newNameErr);
        setDescriptionError(newDescriptionErr);
        setAddressError(newAddressErr);
        setPhoneError(newPhoneErr);
      });
    } else {
      axios
        .post("/cards/createnewcard", {
          name,
          description,
          address,
          phone,
        })
        .then(history.push("/cardinfo", { sended }))
        .catch((err) => {
          alert(err);
        });
    }
  };

  return (
    <form onSubmit={handleCreateCard}>
      <div className="form-row">
        <div className="form-group col-md-6 create-row">
          <label htmlFor="inputEmail4">Name:</label>
          <input
            type="tel"
            className="form-control"
            id="inputEmail4"
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

        <div className="form-group col-md-6 create-row">
          <label htmlFor="inputPassword4">Description:</label>
          <input
            type="text"
            className="form-control"
            id="inputPassword4"
            placeholder="Description"
            value={description}
            onChange={handleDescription}
          />
          {descriptionError.map((item, idx) => {
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

      <div className="form-group col-md-6 create-row">
        <label htmlFor="inputEmail4">Address:</label>
        <input
          type="text"
          className="form-control"
          id="inputEmail4"
          placeholder="Address"
          value={address}
          onChange={handleAddress}
        />
        {addressError.map((item, idx) => {
          return (
            <ul key={idx}>
              <li className="errMsg" key={idx}>
                *{item}.
              </li>
            </ul>
          );
        })}
      </div>

      <div className="form-group col-md-6 create-row">
        <label htmlFor="inputEmail4">Phone:</label>
        <input
          type="text"
          className="form-control"
          id="inputEmail4"
          placeholder="Phone"
          value={phone}
          onChange={handlePhone}
        />
        {phoneError.map((item, idx) => {
          return (
            <ul key={idx}>
              <li className="errMsg" key={idx}>
                *{item}.
              </li>
            </ul>
          );
        })}
      </div>

      <button type="submit" className="btn btn-primary">
        Create Card!
      </button>
    </form>
  );
};

export default CreateCardPage;
