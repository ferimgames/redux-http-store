import classes from "./Input.module.css";
import React from "react";

const Input = React.forwardRef((props, ref) => {
  return (
    <div className={`${classes.input} ${props.className}`}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} id={props.input.id} {...props.input} />
    </div>
  );
});

Input.defaultProps = {
  className: "",
  label: "",
};
export default Input;
