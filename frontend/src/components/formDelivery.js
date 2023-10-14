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

const formDelivery = ({
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
          <FormLabels htmlFor="name">Name : </FormLabels><br></br>
          <FormInputs
            type="text"
            id="name"
            name="name"
            onChange={handleOnChange}
            value={rest.name}
            required
            pattern="[A-Za-z\s]+"
            title="Please enter a valid name"
            onInput={(e) => handleInputValidation(e, "name")}
          /><br></br>
        </FormInputContainer>

        <FormInputContainer>
        <FormLabels htmlFor="email">Email : </FormLabels><br></br>
        <FormInputs
          type="email"
          id="email"
          name="email"
          onChange={handleOnChange}
          value={rest.email}
          required
          pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z]+\.[a-zA-Z]"
          title="Please enter a valid email address"
          onInput={(e) => handleInputValidation(e, "email")}
        /><br></br>
        </FormInputContainer>
        
        <FormInputContainer>
        <FormLabels htmlFor="area">Covering Area : </FormLabels><br></br>
        <FormInputs
          type="text"
          id="area"
          name="area"
          onChange={handleOnChange}
          value={rest.area}
          required
          pattern="[A-Za-z\s]+"
          title="Please enter a valid area"
          onInput={(e) => handleInputValidation(e, "area")}
        /><br></br>
        </FormInputContainer>

        <FormInputContainer>
        <FormLabels htmlFor="mobile">Mobile No : </FormLabels><br></br>
        <FormInputs
          type="number"
          id="mobile"
          name="mobile"
          onChange={handleOnChange}
          value={rest.mobile}
          required
          pattern="^07[0-9]{8}$"
          title="Please enter a valid 10-digit mobile number"
          onInput={(e) => handleInputValidation(e, "mobile")}
        /><br></br>
        </FormInputContainer>

        <FormInputContainer>
        <FormLabels htmlFor="status">Is present today?(Yes/No) </FormLabels><br></br>
        <FormInputs
          type="text"
          id="status"
          name="status"
          onChange={handleOnChange}
          value={rest.status}
          required
          pattern="Yes|No"
          title='Please enter either "Yes" or "No"'
          onInput={(e) => handleInputValidation(e, "status")}
        /><br></br>
        </FormInputContainer>

        {/* Repeat the same structure for other input fields */}

        <FormButton disabled={isSubmitting}>
          Submit
        </FormButton>
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
  height: 600px;
  margin-top: 20px;
`;

const FormContainer = styled('form')`
  width: 400px;
  background-color: white;
  display: flex;
  flex-direction: column;
  padding: 10px 40px;
  padding-top: auto;
  padding-bottom: 30px;
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
  width: 325px;
  border: 0.2px solid;
`;

const FormInputContainer = styled.div`
  position: relative;
`;

const FormButton = styled('button')`
  border: none;
  padding: 7px 15px;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
  background-color: rgb(238, 126, 56);
  color: white;
  font-weight: 500;
  margin-top: 20px;
  width: 325px;
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

export default formDelivery;

