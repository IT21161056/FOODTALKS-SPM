import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const Step1 = () => {

  const { handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = () => {
    // Use the `navigate` function to navigate to another route
    navigate('./orderCheckout')
  }

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="submit" value="Start now!" className="demo"/>
    </form>
  );
}

export default Step1;