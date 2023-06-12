import React, { useContext } from "react";
import Button from "../UI/Button/Button";
import classes from "./Cart.module.css";
import ReactDOM from "react-dom";
import Modal from "../UI/Modal/Modal";
import CartContext from "../store/Cart-context";
import CartItem from "./CartItem";
import CartCheckoutForm from "./CartCheckoutForm";

const Cart = (props) => {
  const cartContext = useContext(CartContext);
  const totalAmount = `$${cartContext.totalAmount.toFixed(2)}`;

  const cartItemRemoveHandler = (id) => {
    cartContext.removeItem(id);
  };

  const cartItemAddHanlder = (item) => {
    cartContext.addItem({ ...item, amount: 1 });
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartContext.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHanlder.bind(null, item)}
        />
      ))}
    </ul>
  );

  const onOrderFood = () => {
    console.log("Oder Food");
    props.onHideCart();
  };

  const cartHTML = (
    <Modal onClose={props.onHideCart}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span> <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        {cartContext.items.length > 0 && (
          <CartCheckoutForm hideCartHanlder= {props.onHideCart}>
            <Button
              className={classes["button--alt"]}
              onClick={props.onHideCart}
            >
              Close
            </Button>
          </CartCheckoutForm>
        )}
      </div>
    </Modal>
  );

  // const cartHTML = (
  //   <Modal onClose={props.onHideCart}>
  //       <CartCheckoutForm></CartCheckoutForm>
  //   </Modal>
  // );

  return (
    <>
      {ReactDOM.createPortal(cartHTML, document.getElementById("overlay-root"))}
    </>
  );
};

export default Cart;
