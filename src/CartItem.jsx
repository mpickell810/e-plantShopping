import React from 'react'; 
import { useSelector, useDispatch } from 'react-redux'; 
import { removeItem, updateQuantity } from './CartSlice'; 
import './CartItem.css'; 

const CartItem = ({ onContinueShopping }) => { 
  // Changed to 'cartItems' so it matches all your function definitions below
  const cartItems = useSelector(state => state.cart.items); 
  const dispatch = useDispatch(); 

  // Calculates the grand total amount for ALL products in the cart
  const calculateTotalAmount = () => { 
    let totalAmount = 0; 
    cartItems.forEach((item) => { 
      // Safely strip the '$' if it exists in the string (e.g. "$15" -> 15)
      const numericCost = typeof item.cost === 'string' ? parseFloat(item.cost.replace('$', '')) : item.cost;
      totalAmount += numericCost * item.quantity; 
    }); 
    return totalAmount; 
  }; 

  const handleContinueShopping = (e) => { 
    e.preventDefault(); 
    onContinueShopping(e); 
  }; 

  const handleIncrement = (item) => { 
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 })); 
  }; 

  const handleDecrement = (item) => { 
    if (item.quantity > 1) { 
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 })); 
    } else { 
      dispatch(removeItem(item.name)); 
    } 
  }; 

  const handleRemove = (item) => { 
    dispatch(removeItem(item.name)); 
  }; 

  // Calculates the total cost for ONE single item (price * quantity)
  const calculateTotalCost = (item) => { 
    const numericCost = typeof item.cost === 'string' ? parseFloat(item.cost.replace('$', '')) : item.cost;
    return numericCost * item.quantity; 
  }; 

  const handleCheckoutShopping = (e) => { 
    alert('Functionality to be added for future reference'); 
  }; 

  return ( 
    <div className="cart-container"> 
      {/* Called calculateTotalAmount() properly here */}
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2> 
      <div> 
        {cartItems.map(item => ( 
          <div className="cart-item" key={item.name}> 
            <img className="cart-item-image" src={item.image} alt={item.name} /> 
            <div className="cart-item-details"> 
              <div className="cart-item-name">{item.name}</div> 
              <div className="cart-item-cost">{item.cost}</div> 
              <div className="cart-item-quantity"> 
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button> 
                <span className="cart-item-quantity-value">{item.quantity}</span> 
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button> 
              </div> 
              {/* Correctly passes the current loop item into the calculation */}
              <div className="cart-item-total">Subtotal: ${calculateTotalCost(item)}</div> 
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button> 
            </div> 
          </div> 
        ))} 
      </div> 
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div> 
      <div className="continue_shopping_btn"> 
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button> 
        <br /> 
        {/* Connected your checkout click handler here */}
        <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button> 
      </div> 
    </div> 
  ); 
}; 

export default CartItem;
