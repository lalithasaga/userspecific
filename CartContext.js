import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

const CartContext = React.createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Retrieve cart items for the logged-in user
    if (userEmail) {
      axios.get(`https://your-backend-api.com/cart/${userEmail}`)
        .then(response => {
          setCart(response.data);
        })
        .catch(error => {
          console.log('Error retrieving cart items:', error);
        });
    }
  }, [userEmail]);

  const addToCart = (product) => {
    // Add item to the cart on the backend
    axios.post(`https://your-backend-api.com/cart/${userEmail}`, product)
      .then(response => {
        setCart(response.data);
      })
      .catch(error => {
        console.log('Error adding item to cart:', error);
      });
  };

  const removeFromCart = (productId) => {
    // Remove item from the cart on the backend
    axios.delete(`https://your-backend-api.com/cart/${userEmail}/${productId}`)
      .then(response => {
        setCart(response.data);
      })
      .catch(error => {
        console.log('Error removing item from cart:', error);
      });
  };

  const getCartCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, getCartCount, setUserEmail }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
