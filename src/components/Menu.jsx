import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import menuData from './backend/menu.json'; // Import menu data directly

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);

  // Load menu data on component mount
  useEffect(() => {
    // Set menu items directly from the imported JSON
    setMenuItems(menuData);
  }, []);

  // Add item to order in localStorage
  const addToOrder = (item) => {
    try {
      // Get current orders from localStorage
      const savedOrders = localStorage.getItem('orders');
      const orders = savedOrders ? JSON.parse(savedOrders) : [];
      
      // Check if item already exists in orders
      const existingOrderIndex = orders.findIndex(order => order.item_id === item.item_id);
      
      if (existingOrderIndex !== -1) {
        // Item exists, increase quantity
        orders[existingOrderIndex].quantity += 1;
      } else {
        // Item doesn't exist, add with quantity 1
        orders.push({ ...item, quantity: 1 });
      }
      
      // Save updated orders back to localStorage
      localStorage.setItem('orders', JSON.stringify(orders));
      
    } catch (error) {
      console.error("Error adding order:", error);
    }
  };

  return (
    <>
      <div className="menu-container">
        <div className="menu">
          <h1>Our Menu 🍽️</h1>
          <ul>
            {menuItems.map((item) => (
              <li key={item.item_id}>
                <Link to={item.name === "meat" ? "/meat" : "/fish"}>
                  {item.name === "meat" ? "🥩 Meat Dish" : "🐟 Fish Dish"}
                </Link>
                
                <img src={item.image} alt={item.name} className="w-30 h-30 rounded-md" />
                {/* <button className="btn btn-danger btn-sm" onClick={() => addToOrder(item)}>Add</button> */}
              </li>
            ))}
          </ul>
                    <Link to="/orders">
          
                    <button className="bg-yellow-500 text-black px-6 py-3 rounded-lg text-lg font-semibold transition duration-300 ease-in-out transform hover:scale-105 hover:bg-yellow-600">
                      Order Now
                    </button>
                    </Link>
        </div>
      </div>
    </>
  );
};

export default Menu;