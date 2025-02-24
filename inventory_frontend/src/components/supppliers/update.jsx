import React, { useEffect, useState } from "react";

const Update_products = () => {
  const [input_values, setInputValues] = useState({
    name: "",
    type: "",
    quantity: "",
    price: "",
  });
  const [productTypes, setProductTypes] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filteredProductsByType, setFilteredProductsByType] = useState([]);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [productOptions, setProductOptions] = useState([]); // For grouped products

  const handleQuantityChange = (event) => {
    const { value } = event.target;
    const quantity = Math.max(0, parseInt(value, 10) || 0);
    setInputValues((prev) => ({
      ...prev,
      quantity: quantity,
    }));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://wakinjologin.onrender.com/get_items");
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
        }

        const data = await response.json();

        if (data && data.data && Array.isArray(data.data)) {
          setProducts(data.data);
          setFilteredProductsByType(data.data);

          // Group products by name:
          const groupedProducts = {};
          data.data.forEach((product) => {
            const productName = product.item_name || product.product_name;
            if (!groupedProducts[productName]) {
              groupedProducts[productName] = [];
            }
            groupedProducts[productName].push(product);
          });
          setProductOptions(Object.values(groupedProducts));

        } else {
          console.error("Unexpected API response format:", data);
          setProducts([]);
          setFilteredProductsByType([]);
          alert("The API returned data in an unexpected format.");
          return;
        }

        const uniqueTypes = new Set();
        data.data.forEach((product) => {
          const type = product.company_name || product.product_type || "";
          uniqueTypes.add(type);
        });
        setProductTypes(Array.from(uniqueTypes));
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
        setFilteredProductsByType([]);
        alert(`Error fetching products: ${error.message}`);
      }
    };

    fetchProducts();
  }, []);

  const handleUpdateItems = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("https://wakinjologin.onrender.com/update_inventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [
            {
              item_name: input_values.name,
              type: "add", // Or "update"
              company_name: input_values.type,
              quantity: input_values.quantity,
            },
          ],
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Product updated successfully!");
        console.log(result);
        setInputValues({ name: "", type: "", quantity: "", price: "" });
      } else {
        const errorMessage = result.message || "Server error";
        alert(`Failed to update product: ${errorMessage}`);
        console.error(result);
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
      console.error(error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearchChange = (event) => {
    const inputValue = event.target.value;
    setSearchTerm(inputValue);
    setInputValues({ ...input_values, name: inputValue });

    const filteredGroups = productOptions.filter((group) => {
      const productName = group[0].item_name || group[0].product_name;
      return productName.toLowerCase().includes(inputValue.toLowerCase());
    });

    setFilteredProductsByType(filteredGroups.flat());

    if (inputValue) {
      const foundGroup = filteredGroups.find((group) => {
        const productName = group[0].item_name || group[0].product_name;
        return productName === inputValue;
      });

      if (foundGroup) {
        setSelectedProduct(foundGroup);
        setInputValues({
          ...input_values,
          type: foundGroup[0].company_name || foundGroup[0].product_type || "",
        });
      } else {
        setSelectedProduct(null);
        setInputValues({ ...input_values, type: "" });
      }
    } else {
      setSelectedProduct(null);
      setInputValues({ ...input_values, type: "" });
    }
  };


  const handleTypeChange = (event) => {
    const selectedType = event.target.value;
    setInputValues({ ...input_values, type: selectedType });

    if (selectedType) {
        const filtered = products.filter((product) => {
            const productType = product.company_name || product.product_type || "";
            return productType === selectedType;
        });
        setFilteredProductsByType(filtered);
    } else {
        setFilteredProductsByType(products); // Show all if no type is selected
    }
};

  const finalFilteredProducts = filteredProductsByType.filter((product) => {
    const productName = product.item_name || product.product_name || "";
    return productName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="suppliers_form">
      <p>UPDATE PRODUCT</p>
      <form onSubmit={handleUpdateItems}>
        <label htmlFor="name">Product Name:</label>
        {productOptions.some(group => group.length > 1) && searchTerm && finalFilteredProducts.length > 0 ? (
          <select
            id="name"
            value={input_values.name}
            onChange={(e) => handleSearchChange({ target: { value: e.target.value } })}
            required
          >
            <option value="">Select a product</option>
            {finalFilteredProducts.map((product) => (
              <option
                key={product.id || product.item_id || product.product_id}
                value={product.item_name || product.product_name}
              >
                {product.item_name || product.product_name}
              </option>
            ))}
          </select>
        ) : (
          <input
            type="text"
            id="name"
            value={searchTerm}
            onChange={handleSearchChange}
            list="suggestions"
            required
          />
        )}
        <datalist id="suggestions">
          {finalFilteredProducts.map((product) => (
            <option
              key={product.id || product.item_id || product.product_id}
              value={product.item_name || product.product_name}
            />
          ))}
        </datalist>

        <label htmlFor="type">Product Type:</label>
        <select
          id="type"
          value={input_values.type}
          onChange={handleTypeChange}
          required
        >
          <option value="">Select a type</option>
          {productTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          name="quantity"
          value={input_values.quantity}
          onChange={handleQuantityChange}
          min="0"
          required
        />

        <label htmlFor="price">Price per Item(ksh):</label>
        <input
          type="number"
          name="price"
          value={input_values.price}
          onChange={handleChange}
          min="0"
          required
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Update_products;