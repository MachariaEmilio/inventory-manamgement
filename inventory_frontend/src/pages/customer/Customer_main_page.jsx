import React, { useState, useEffect } from "react";
import { jsPDF } from "jspdf";
import "./customer.css"; // Import the CSS file
import Header from "../../components/header";
import Modal from "../../components/modal/modal";

const CustomerMainPage = () => {
  const [items, setItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [errorMessage, setErrorMessage] = useState("");
  const itemsPerPage = 5;


console.log(cart)
  const handleDownload = () => {
    handleupdateitems()
    const doc = new jsPDF();

    // Add Shop Name and Phone Number
    doc.setFontSize(16);
    doc.text("WAKINJO SHOP", 105, 20, null, null, "center");
    doc.setFontSize(12);
    doc.text("Phone: +25421212222", 105, 30, null, null, "center");

    // Add Title
    doc.setFontSize(20);
    doc.text("Receipt", 105, 40, null, null, "center");

    // Add Customer Name
    doc.setFontSize(12);
    doc.text(`Customer: ${customerName}`, 20, 50);

    // Add Date
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 60);

    // Add table headers
    doc.text("Item", 20, 80);
    doc.text("Company", 60, 80);
    doc.text("Price", 100, 80);
    doc.text("Quantity", 140, 80);
    doc.text("Total", 180, 80);

    // Add table rows
    let y = 90;
    cart.forEach((item) => {
      doc.text(item.item_name, 20, y);
      doc.text(item.company_name, 60, y);
      doc.text(`KSH ${item.price_per_item.toFixed(2)}`, 100, y);
      doc.text(`${item.quantity}`, 140, y);
      doc.text(`KSH ${(item.price_per_item * item.quantity).toFixed(2)}`, 180, y);
      y += 10;
    });

    // Add total
    doc.text("Total", 140, y + 10);
    doc.text(`KSH ${formatNumber(totalPrice)}`, 180, y + 10);

    // Save the document as a PDF file
    doc.save("receipt.pdf");
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number.toFixed(2));
  };

  // Calculate the total price of the cart
  const totalPrice = cart.reduce(
    (total, item) => total + item.price_per_item * item.quantity,
    0
  );

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          "https://wakinjologin.onrender.com/get_items"
        );
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
  const filteredItems = items.filter((item) => {
    return (
      item.item_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.company_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

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
    } 
    else{
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

    if (newQuantity < 0) {
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
  // Paginate items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const nextPage = () => {
    if (indexOfLastItem < filteredItems.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleButtonClick = () => {
    if (cart.length === 0 || !customerName.trim()) {
      setErrorMessage("Add items and enter customer name to proceed.");
      setTimeout(() => setErrorMessage(""), 3000); // Hide message after 3 seconds
    } else {
      openModal();
    }
  };

  const product_sold= cart.map(item => ({
    item_name: item.item_name,
    type: "subtract",
    company_name: item.company_name,
    quantity: item.quantity
}));

console.log(product_sold);
  const handleupdateitems = async (event) => {

    try {
      const response = await fetch("https://wakinjologin.onrender.com/update_inventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: 
            product_sold
          
        }),
      });
      const result = await response.json();
      if (response.ok) {
       
        setCart([])
        setCustomerName("")
        setIsModalOpen(false)
        alert("Receipt Generated Succesfully");
        console.log(result);
       
      } else {
        alert("Failed to update product: " + (result.message || "Server error"));
        console.error(result);
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
      console.error(error);
    }
  };


  return (
    <>
      <Header className="mainheader" />
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
            {currentItems.map((item) => (
              <li key={item.id}>
                <span>
                  {item.item_name} ({item.company_name}) - KSH{" "}
                  {item.price_per_item.toFixed(2)} (Available: {item.quantity})
                </span>
                <button disabled={item.quantity<=0} onClick={() => addToCart(item)}>Add to Cart</button>
              </li>
            ))}
          </ul>
          <div className="pagination-buttons">
            <button onClick={prevPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>
              {" "}
              Page {currentPage} of {totalPages}{" "}
            </span>
            <button
              onClick={nextPage}
              disabled={indexOfLastItem >= filteredItems.length}
            >
              Next
            </button>
          </div>
        </div>

        <div className="cart-section">
          <h2>Cart</h2>
       <div className="customer">
          <label htmlFor="customer">customer name</label>
       
          <input
            type="text"
            value={customerName}
            placeholder="customer name "
            required
            onChange={(e) => setCustomerName(e.target.value)}
          />
           </div>
          <ul className="cart_items">
            {cart.map((item) => (
              <li key={item.id}>
                <span>
                  {item.item_name} ({item.company_name}) - KSH{" "}
                  {item.price_per_item.toFixed(2)} x {item.quantity}
                </span>
                <div>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, parseInt(e.target.value))
                    }
                    min="1"
                  />
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                  <button onClick={() => removeFromCart(item.id)}>
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="total_section">
            <h3>Total: KSH {formatNumber(totalPrice)}</h3>
            <button onClick={handleButtonClick}>Show Receipt</button>
    {errorMessage && (
      <p style={{ color: "red", fontSize: "14px", marginTop: "5px" }}>
        {errorMessage}
      </p>
    )}



          </div>
        </div>

        {/* Modal with receipt content */}
        <Modal show={isModalOpen} onClose={closeModal}>
          <div className="modal-receipt">
            <h2>Receipt</h2>
            <p>
              <strong>WAKINJO SHOP</strong>
            </p>
            <p>Phone: +25421212222</p>
            <p>Customer Name: {customerName} </p>
            <p>Date: {new Date().toLocaleDateString()}</p>
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Company</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td>{item.item_name}</td>
                    <td>{item.company_name}</td>
                    <td>KSH {item.price_per_item.toFixed(2)}</td>
                    <td>{item.quantity}</td>
                    <td>
                      KSH {(item.price_per_item * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="total-amount">
              <p>
                <strong>Total: </strong>KSH {formatNumber(totalPrice)}
              </p>
            </div>
            <button onClick={handleDownload}>Download Receipt</button>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default CustomerMainPage;
