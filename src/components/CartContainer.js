import React, { useEffect } from "react";
import CartItem from "./CartItem";
// import { clearCart } from "../features/cart/cartSlice";
import { calculateTotals, getCartItems } from "../features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../features/modal/modalSlice";

const CartContainer = () => {
  const dispatch = useDispatch();
  const { cartItems, isLoading, total, amount } = useSelector((store) => store.cart);

  useEffect(() => {
    dispatch(calculateTotals())
  }, [dispatch, cartItems])


  useEffect(() => {
    dispatch(getCartItems())
  }, [dispatch])



  if(isLoading) {
    return <div className="loading">
      <h1>Loading....</h1>
    </div>
  }

 


  if (amount < 1) {
    return (
      <section className="cart">
        <header>
          <h2>Your bag</h2>
          <h4 className="empty-cart">is currently empty</h4>
        </header>
      </section>
    );
  }

  return (
    <section className="cart">
      <header>
        <h2>Your Bag</h2>
      </header>
      <div>
        {cartItems.map((item) => {
          return <CartItem key={item.id} {...item} />;
        })}
      </div>
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            total <span>${total.toFixed(2)}</span>
          </h4>
        </div>
        <button
          className="btn clear-btn"
          onClick={() => dispatch(openModal())}
        >
          Clear Cart
        </button>
      </footer>
    </section>
  );
};

export default CartContainer;
