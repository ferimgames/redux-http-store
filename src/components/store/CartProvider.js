import { useReducer } from "react";
import CartContext from "./Cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === "ADD_CART") {
    //Update total amount is going to be the old total amount plus the items price multiply by the amount of iteams
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    // We extract the ID by checking on the current state if the item that we want to add is already been add it
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    // Adding possible existing item into a variable
    const existingItem = state.items[existingCartItemIndex];

    let updatedItems;
    // If the iteam already exist then
    if (existingItem) {
      // we update the tiem by just updatin the amount
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount + action.item.amount,
      };
      // We load the old state on the new state
      updatedItems = [...state.items];
      // We only update the exiting item
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      //If the item does not exist then we just add it to the items current state
      updatedItems = state.items.concat(action.item);
    }
    // Returning new updated items list and total amount
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "REMOVE_CART") {
    // Getting the ID of the item we want to remove from the items state
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );

    // Adding item to a variable
    const existingItem = state.items[existingCartItemIndex];
    let updatedItems;

    //If the amount is just one
    if (existingItem.amount === 1) {
      //We filter the item by the ID and add this to the udpated item state
      updatedItems = state.items.filter((item) => item.id !== action.id);
    } else {
      //Update only the amount from the existing item
      const updatedItem = {
        ...existingItem,
        amount: existingItem.amount - 1,
      };
      //We load the current state on the new state
      updatedItems = [...state.items];
      // We update the only update the exsting item
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    // We update the total amount by the existing price
    const updatedTotalAmount = state.totalAmount - existingItem.price;
    // Returning new updated items list and total amount
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }

  if (action.type === "CLEAR_CART") {
    return defaultCartState;
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD_CART", item: item });
  };

  const removeItemFormCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE_CART", id: id });
  };

  const remoteAllitemsFromCartHandler = () => {
    dispatchCartAction({ type: "CLEAR_CART" });
  };

  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFormCartHandler,
    clearCart: remoteAllitemsFromCartHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
