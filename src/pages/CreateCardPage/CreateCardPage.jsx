import Joi from "joi-browser";
import axios from "axios";
import { useState } from "react";
import createCardSchema from "../../validation/createCard.validation";
import { useHistory, useLocation } from "react-router-dom";
import "./CreateCardPage.css";

const CreateCardPage = () => {
  const history = useHistory();
  const location = useLocation();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [nameError, setNameError] = useState(null);
  const [descriptionError, setDescriptionError] = useState(null);
  const [addressError, setAddressError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);

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
    console.log(validatedValue);

    if (error) {
      error.details.forEach((item) => {
        const errMsg = item.message;
        const errSrc = item.path[0];
        console.log(errSrc);
        if (errSrc === "name") {
          setNameError("*" + errMsg + ".");
        }
        if (errSrc === "description") {
          setDescriptionError("*" + errMsg + ".");
        }
        if (errSrc === "address") {
          setAddressError("*" + errMsg + ".");
        }
        if (errSrc === "phone") {
          setPhoneError("*" + errMsg + ".");
        }
      });
      /* if (error) {
      alert(error); */
    } else {
      axios
        .post("/cards/createnewcard", {
          name,
          description,
          address,
          phone,
        })
        .then(history.push("cardinfo"))
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
          <span value={nameError} className="create-err">
            {nameError}
          </span>
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
          <span value={descriptionError} className="create-err">
            {descriptionError}
          </span>
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
        <span value={addressError} className="create-err">
          {addressError}
        </span>
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
        <span value={phoneError} className="create-err">
          {phoneError}
        </span>
      </div>

      <button type="submit" className="btn btn-primary">
        Create Card!
      </button>
    </form>
  );
};

export default CreateCardPage;
