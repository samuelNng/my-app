import { Link } from 'react-router-dom';
import React, { useState,useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa"; // Shopping cart icon
import Order from '../pages/Order';

const NavBar=(props)=>{
    const [menuOpen, setMenuOpen] = useState(false);
    
    const {totalQuantity}= props;
      // Fetch order count
  // const fetchOrders = async () => {
  //   try {
  //     const response = await fetch("http://localhost:5000/orders"); // API call to get orders
  //     const data = await response.json();
      
  //     // Sum up the quantities of all orders
  //     const totalItems = data.reduce((sum, order) => sum + (order.quantity || 1), 0);
      
  //     setOrderCount(totalItems);
  //   } catch (error) {
  //     console.error("Error fetching orders:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchOrders();
  // }, []);
    
  return(
  <nav className="navbar">
      <h2>🍽️ My Restaurant </h2>
      <ul>
      <li><Link to ="/">Home</Link></li>
      
      <li 
        className="menu-dropdown" 
        onMouseEnter={() => setMenuOpen(true)}
        onMouseLeave={() => setMenuOpen(false)}
      >
      <Link to ="/menu">Our Menu </Link>
      {/* Submenu */}
      {/* {menuOpen && (
      <ul className="submenu">
        <li><Link to="/meat">🥩 Meat Dish</Link></li>
        <li><Link to="/fish">🐟 Fish Dish</Link></li>
      </ul>
      )} */}
      </li>
      {/* <li><Link to ="/about">About </Link></li> */}
      <li><Link to ="/contact">Contact Us</Link></li>
      {/* <li ><Link to ="/orders">Order </Link></li> */}
      <li className="cart-container">
      <Link to="/orders">
      <FaShoppingCart className="cart-icon" />
      {totalQuantity  > 0 && <span className="cart-badge">{totalQuantity}</span>}
      </Link>
      </li>
      
      </ul>


      
  </nav>
  );

}
export default NavBar;