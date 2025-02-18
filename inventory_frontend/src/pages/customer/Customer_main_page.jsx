import React, { useState } from 'react';
import './customer.css'; // Import the CSS file
import Header from '../../components/header';

const Customer_main_page =() => {
  // Sample data with 10 items, prices, availability, and types
  const [items,setitem] = useState([
    { id: 1, name: 'Apple', type: 'Red Delicious', price: 1.5, available: 10 },
    { id: 2, name: 'Banana', type: 'Cavendish', price: 0.5, available: 20 },
    { id: 3, name: 'Cherry', type: 'Bing', price: 2.0, available: 15 },
    { id: 4, name: 'Date', type: 'Medjool', price: 3.0, available: 8 },
    { id: 5, name: 'Elderberry', type: 'Black', price: 4.5, available: 12 },
    { id: 6, name: 'Fig', type: 'Black Mission', price: 2.5, available: 7 },
    { id: 7, name: 'Grape', type: 'Thompson Seedless', price: 1.0, available: 25 },
    { id: 8, name: 'Honeydew', type: 'Green', price: 5.0, available: 6 },
    { id: 9, name: 'Iceberg Lettuce', type: 'Crisphead', price: 1.2, available: 30 },
    { id: 10, name: 'Sugar', type: 'Cabras', price: 2.0, available: 50 },
    { id: 11, name: 'Sugar', type: 'Mumiazs', price: 2.5, available: 40 }
  ]);
  
  // State to manage the search term
  const [searchTerm, setSearchTerm] = useState('');

  // State to manage the cart
  const [cart, setCart] = useState([]);

  // Filter the items based on the search term
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
async function getdata() {
  const data = await fetch("http://40.40.40.106:5000/get_items")
  const results = await data.json()
console.log(results) 
}
getdata()
  // Function to add an item to the cart
  const addToCart = (item) => { 
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    const availableQuantity = item.available;

    if (existingItem) {
      // If the item already exists in the cart, check if adding more exceeds availability
      if (existingItem.quantity + 1 > availableQuantity) {
       
        alert(`Cannot add more. Only ${availableQuantity} ${item.name} (${item.type}) available.`);
        return;
      }
      setCart(cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      // If the item is not in the cart, add it with a quantity of 1
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  // Function to remove an item from the cart
  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
  };

  // Function to update the quantity of an item in the cart
  const updateQuantity = (itemId, newQuantity) => {
    const item = items.find(item => item.id === itemId);
    const availableQuantity = item.available;

    if (newQuantity <= 0) {
      // If the quantity is 0 or less, remove the item from the cart
      removeFromCart(itemId);
    } else if (newQuantity > availableQuantity) {
      // If the new quantity exceeds availability, show an alert
      alert(`Cannot add more. Only ${availableQuantity} ${item.name} (${item.type}) available.`);
    } else {
      // Update the quantity of the item
      setCart(cart.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  // Calculate the total price of the cart
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (<>      <Header/>
    <div className="container">

      <div className="items-section">
        <h1>Items</h1>
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ul>
          {filteredItems.map(item => (
            <li key={item.id}>
              <span>{item.name} ({item.type}) - ${item.price.toFixed(2)} (Available: {item.available})</span>
              <button onClick={() => addToCart(item)}>Add to Cart</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Side: Cart */}
      <div className="cart-section">
        <h2>Cart</h2>
        <ul>
          {cart.map(item => (
            <li key={item.id}>
              <span>{item.name} ({item.type}) - ${item.price.toFixed(2)} x {item.quantity}</span>
              <div>
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  min="1"
                />
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </div>
            </li>
          ))}
        </ul>
        <h3>Total: ${totalPrice.toFixed(2)}</h3>
      </div>
    </div></>
  );
};

export default Customer_main_page;