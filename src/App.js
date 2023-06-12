import { useState } from "react";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header/Header";
import Meals from "./components/Meals/Meals";
import CartProvider from "./components/store/CartProvider";

function App() {

  const [cartIsShow, setCartIsShow] = useState(false);
  
  const showCartHanlder = () =>{
    setCartIsShow(true);
  }

  const hideCartHandler = () =>{
    setCartIsShow(false);
  }
  return (
    <CartProvider>
      {cartIsShow && <Cart onHideCart={hideCartHandler}></Cart>}
      <Header onShowCart={showCartHanlder} onHideCart={hideCartHandler}></Header>
      <main>
        <Meals></Meals>
      </main>
    </CartProvider>
  );
}

export default App;
