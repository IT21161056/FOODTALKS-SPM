import React from "react";
import "../pages/deliveryManagement.css";
import { MdClose } from "react-icons/md";
import styled from 'styled-components'

const handleInputValidation = (e, fieldName) => {
  const input = e.target;
  const errorSpan = document.getElementById(`${fieldName}-error`);

  if (input.checkValidity()) {
    errorSpan.style.display = "none"; // Hide the error message if input is valid
  } else {
    errorSpan.style.display = "block"; // Show the error message if input is invalid
  }
};

const formDeliveryStatus = ({
  handleSubmit,
  handleOnChange,
  handleclose,
  rest,
  isSubmitting,
}) => {
  return (
    <AddContainer>
      <FormContainer onSubmit={handleSubmit}>
        <CloseButton onClick={handleclose}>
          <MdClose />
        </CloseButton>

        <FormInputContainer>
          <FormLabels htmlFor="userId">User ID : </FormLabels>
          <br></br>
          <FormInputs
            type="text"
            id="userId"
            name="userId"
            onChange={handleOnChange}
            value={rest.userId}
            required
            onInput={(e) => handleInputValidation(e, "userId")}
          />
          <br></br>
        </FormInputContainer>

        <FormInputContainer>
          <FormLabels htmlFor="orderId">Order ID : </FormLabels>
          <br></br>
          <FormInputs
            type="email"
            id="orderId"
            name="orderId"
            onChange={handleOnChange}
            value={rest.orderId}
            required
            onInput={(e) => handleInputValidation(e, "eorderId")}
          />
          <br></br>
        </FormInputContainer>

        <FormInputContainer>
          <FormLabels htmlFor="cusname">Customer Name : </FormLabels>
          <br></br>
          <FormInputs
            type="text"
            id="cusname"
            name="cusname"
            onChange={handleOnChange}
            value={rest.cusname}
            required
            onInput={(e) => handleInputValidation(e, "cusname")}
          />
          <br></br>
        </FormInputContainer>

        <FormInputContainer>
          <FormLabels htmlFor="state">Delivery Status</FormLabels>
          <br />
          <FormInputs
            as="select"
            id="state"
            name="state"
            onChange={handleOnChange}
            value={rest.state}
            required
          >
            <option value="">Select the delivery state</option>
            <option value="Ready to delivery">Ready to delivery</option>
            <option value="Deliver in progress">Deliver in progress</option>
            <option value="Received">Received</option>
          </FormInputs>
          <br />
        </FormInputContainer>

        <FormButton disabled={isSubmitting}>Submit</FormButton>
      </FormContainer>
    </AddContainer>
  );
};

const AddContainer = styled('div')`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.2);
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled('form')`
  width: 400px;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 50px 40px;
  padding-top: auto;
  padding-bottom: 10px;
  padding-right: 5px;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
`;

const FormLabels = styled('label')`
  font-size: 1rem;
`;

const FormInputs = styled('input')`
  font-size: 1rem;
  padding: 5px 15px;
  margin-right: 5px;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const FormInputContainer = styled.div`
  position: relative;

  /* Default border color for invalid input */
  border-color: red;

  /* Change border color to green when input is valid */
  input:valid + & {
    border-color: green;
  }

  /* Hide the error message when the input is valid */
  input:valid + span {
    display: none;
  }

  input:invalid + span::after {
    content: attr(title); /* Display the custom error message */
    color: red;
    display: block;
    font-size: 12px; /* Adjust font size as needed */
    margin-top: 4px;
  }
`;

const FormButton = styled('button')`
  border: none;
  padding: 7px 15px;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
  background-color: royalblue;
  color: white;
  font-weight: 500;
  margin-top: 20px;
`;

const CloseButton = styled('div')`
  margin-left: auto;
  font-size: 1.2rem;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  border-radius: 20px;
  border: 1px solid #000;
  cursor: pointer;
`;

export default formDeliveryStatus;