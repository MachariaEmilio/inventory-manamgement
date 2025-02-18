import React, { useState, useEffect } from "react";
import "./customer.css"; // Import the CSS file
import Header from "../../components/header";

const CustomerMainPage = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
console.log(items)
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://20.20.20.109:5000/get_items");
        const results = await response.json();

        if (results.data) {
          // Convert price_per_item from string to number
          const formattedData = results.data.map((item) => ({
            ...item,
            price_per_item: parseFloat(item.price_per_item),
          }));

          setItems(formattedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
  }, []);

  // Filter the items based on the search term
  const filteredItems = items.filter((item) =>{ 
   return  item.item_name.toLowerCase().includes(searchTerm.toLowerCase()) || item.company_name.toLowerCase().includes(searchTerm.toLowerCase()  )
  } );

  // Function to add an item to the cart
  const addToCart = (item) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    const availableQuantity = item.quantity;

    if (existingItem) {
      if (existingItem.quantity + 1 > availableQuantity) {
        alert(
          `Cannot add more. Only ${availableQuantity} ${item.item_name} (${item.company_name}) available.`
        );
        return;
      }
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  // Function to remove an item from the cart
  const removeFromCart = (itemId) => {
    setCart(cart.filter((item) => item.id !== itemId));
  };

  // Function to update the quantity of an item in the cart
  const updateQuantity = (itemId, newQuantity) => {
    const item = items.find((item) => item.id === itemId);
    const availableQuantity = item.quantity;

    if (newQuantity <= 0) {
      removeFromCart(itemId);
    } else if (newQuantity > availableQuantity) {
      alert(
        `Cannot add more. Only ${availableQuantity} ${item.item_name} (${item.company_name}) available.`
      );
    } else {
      setCart(
        cart.map((item) =>
          item.id === itemId ? { ...item, quantity: newQuantity } : item
        )
      );
    }
  };

  // Calculate the total price of the cart
  const totalPrice = cart.reduce(
    (total, item) => total + item.price_per_item * item.quantity,
    0
  );

  return (
    <>
      <Header />
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
            {filteredItems.map((item) => (
              <li key={item.id}>
                <span>
                  {item.item_name} ({item.company_name}) - KSH {item.price_per_item.toFixed(2)} (Available: {item.quantity})
                </span>
                <button onClick={() => addToCart(item)}>Add to Cart</button>
              </li>
            ))}
          </ul>
        </div>

        <div className="cart-section">
          <h2>Cart</h2>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                <span>
                  {item.item_name} ({item.company_name}) - KSH  {item.price_per_item.toFixed(2)} x {item.quantity}
                </span>
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
          <div className=" total_section">          <h3>Total: KSH {totalPrice.toFixed(2)}</h3> 
          
          <button > submit </button></div>

        </div>
      </div>
    </>
  );
};

export default CustomerMainPage;
