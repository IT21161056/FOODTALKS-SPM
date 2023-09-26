import React from "react";
import "../pages/deliveryManagement.css";
import { MdClose } from "react-icons/md";

const handleInputValidation = (e, fieldName) => {
  const input = e.target;
  const errorSpan = document.getElementById(`${fieldName}-error`);

  if (input.checkValidity()) {
    errorSpan.style.display = "none"; // Hide the error message if input is valid
  } else {
    errorSpan.style.display = "block"; // Show the error message if input is invalid
  }
};

const formDelivery = ({
  handleSubmit,
  handleOnChange,
  handleclose,
  rest,
  isSubmitting,
}) => {
  return (
    <div className="addContainer">
      <form onSubmit={handleSubmit}>
        <div className="close-btn" onClick={handleclose}>
          <MdClose />
        </div>
        <label htmlFor="name">Name : </label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={handleOnChange}
          value={rest.name}
          required
          pattern="[A-Za-z\s]+"
          title="Please enter a valid name"
          onInput={(e) => handleInputValidation(e, "name")}
        />
        <span id="name-error">Please enter a valid name</span>

        <label htmlFor="email">Email : </label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleOnChange}
          value={rest.email}
          required
          pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]"
          title="Please enter a valid email address"
          onInput={(e) => handleInputValidation(e, "email")}
        />
        <span id="email-error">Please enter a valid email</span>

        <label htmlFor="area">Covering Area : </label>
        <input
          type="text"
          id="area"
          name="area"
          onChange={handleOnChange}
          value={rest.area}
          required
          pattern="[A-Za-z\s]+"
          title="Please enter a valid area"
          onInput={(e) => handleInputValidation(e, "area")}
        />
        <span id="area-error">Please enter a valid area</span>

        <label htmlFor="mobile">Mobile No : </label>
        <input
          type="number"
          id="mobile"
          name="mobile"
          onChange={handleOnChange}
          value={rest.mobile}
          required
          pattern="[0-9]{10}"
          title="Please enter a valid 10-digit mobile number"
          onInput={(e) => handleInputValidation(e, "mobile")}
        />
        <span id="mobile-error">
          Please enter a valid 10-digit mobile number
        </span>

        <label htmlFor="status">Is present today?(Yes/No) </label>
        <input
          type="text"
          id="status"
          name="status"
          onChange={handleOnChange}
          value={rest.status}
          required
          pattern="Yes|No"
          title='Please enter either "Yes" or "No"'
          onInput={(e) => handleInputValidation(e, "status")}
        />
        <span id="status-error">Please enter either "Yes" or "No"</span>

        <button className="btn" disabled={isSubmitting}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default formDelivery;
