import { useContext, useEffect, useState } from "react";
import CartIcon from "../../Cart/CartIcon";
import Button from "../../UI/Button/Button";
import classes from "./HeaderCardButton.module.css";
import CartContext from "../../store/Cart-context";

const HeaderCartButton = (props) => {
  const [buttonIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartContext = useContext(CartContext);

  // const { items } = cartContext;

  const numberOfItems = cartContext.items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);

  const buttonClasses = `${classes.button} ${
    buttonIsHighlighted ? classes.bump : ""
  }`;
  useEffect(() => {
    if (cartContext.items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [cartContext.items]);

  return (
    <Button className={buttonClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon></CartIcon>
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfItems}</span>
    </Button>
  );
};

export default HeaderCartButton;
