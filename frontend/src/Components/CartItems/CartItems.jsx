import React, { useContext, useState } from "react";
import "./CartItems.css";
import { ShopContext } from "../../Context/ShopContext";
import remove_icon from "../Assets/cart_cross_icon.png";
import Paypal from "../Paypal";

const CartItems = () => {
  const { all_product, cartItems, removeFromCart } = useContext(ShopContext);
  const [showPayment, setShowPayment] = useState(false); // State to control payment option display

  const handleCheckout = () => {
    // Logic to handle checkout
    setShowPayment(true); // Show payment options
  };

  return (
    <div className="cartitems">
      <div className="cartitems-format-main">
        <p>Picks</p>
        <p>Title</p>
        <p>Price</p>
        <p>Members</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div>
              <div className="cartitems-format cartitems-format-main">
                <img src={e.image} className="carticon-product-icon" alt="icon" />
                <p>{e.name}</p>
                <p>$0.00</p>
                <button className="cartitems-quantity">
                  {cartItems[e.id]}
                </button>
                <p>$0.00</p>
                <img className="cartitems-remove-icon"
                  src={remove_icon}
                  onClick={() => {
                    removeFromCart(e.id);
                  }}
                  alt="remove_icon"
                  
                />
              </div>
            </div>
          );
        }
        return null; // otherwise return null
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Overview</h1>
          <div>
            <div className="cartitems-total-item">
              <p>Subtotal</p>
              <p>$0.00</p>
            </div>
            <hr />
            <div className="cartitems-total-item">
              <h3>Total</h3>
              <h3>$0.00</h3>
            </div>
          </div>
          <button onClick={handleCheckout} >PROCEED TO CHECKOUT</button>
        </div>
        {showPayment && (
        <div>
          <Paypal />  
        </div>
      )}

      </div>
    </div>
  );
};

export default CartItems;
