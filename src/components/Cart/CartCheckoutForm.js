import { useContext } from "react";
import CartContext from "../store/Cart-context";
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";
import classes from "./CartCheckoutForm.module.css";
import useHttp from "../../hooks/use-http";
import useInput from "../../hooks/use-input";

const nameValidator = (name) => {
  return name.trim() !== "";
};

const emailValidator = (email) => {
  return email.includes("@");
};

const CartCheckoutForm = (props) => {
  const cartContext = useContext(CartContext);

  const {
    value: name,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameOnChangeHanlder,
    inputBlurHandler: nameBlurHanlder,
    reset: nameReset,
  } = useInput(nameValidator);

  const {
    value: lastname,
    isValid: lastnameIsValid,
    hasError: lastnameHasError,
    valueChangeHandler: lastnameOnChangeHanlder,
    inputBlurHandler: lastnameBlurHanlder,
    reset: lastnameReset,
  } = useInput(nameValidator);

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailOnChangeHanlder,
    inputBlurHandler: emailBlurHanlder,
    reset: emailReset,
  } = useInput(emailValidator);

  let formIsValid = false;

  if (nameIsValid && lastnameIsValid && emailIsValid) {
    formIsValid = true;
  }
  const { isLoading, error, sendRequest } = useHttp();
  const submitOrderHanlder = (event) => {
    event.preventDefault();

    sendRequest(
      {
        url: "https://react-http-6513c-default-rtdb.firebaseio.com/Orders.json",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: {
          name,
          lastname,
          email,
          items: cartContext.items,
          totalAmount: cartContext.totalAmount,
        },
      },
      () => {
        nameReset();
        lastnameReset();
        emailReset();
        props.hideCartHanlder();
        cartContext.clearCart();
      }
    );
  };

  return (
    <form className={classes["form--checkout"]} onSubmit={submitOrderHanlder}>
      <Input
        label="Name"
        className={classes["input__checkout"]}
        input={{
          id: "name",
          type: "text",
          onChange: nameOnChangeHanlder,
          onBlur: nameBlurHanlder,
          value: name,
        }}
      />
      {nameHasError && <p>Enter a valid name.</p>}
      <Input
        label="Last Name"
        className={classes["input__checkout"]}
        input={{
          id: "lastname",
          type: "text",
          onChange: lastnameOnChangeHanlder,
          onBlur: lastnameBlurHanlder,
          value: lastname,
        }}
      />
      {lastnameHasError && <p>Enter a valid last name.</p>}
      <Input
        label="Email"
        className={classes["input__checkout"]}
        input={{
          id: "email",
          type: "email",
          onChange: emailOnChangeHanlder,
          onBlur: emailBlurHanlder,
          value: email,
        }}
      />
      {emailHasError && <p>Enter a valid email.</p>}
      <Button type="submit" button={{ disabled: !formIsValid }}>
        Order
      </Button>
      {props.children}
    </form>
  );
};

export default CartCheckoutForm;
