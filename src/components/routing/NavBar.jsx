import { Link } from 'react-router-dom';
import React, { useState } from "react";

function NavBar(){
    const [menuOpen, setMenuOpen] = useState(false);
        return(
        <nav className="navbar">
            <h2>🍽️ My Restaurant</h2>
            <ul>
            <li><Link to ="/">Home</Link></li>
              
            <li 
             className="menu-dropdown" 
             onMouseEnter={() => setMenuOpen(true)}
             onMouseLeave={() => setMenuOpen(false)}
            >
            <Link to ="/menu">Menu </Link>
            {/* Submenu */}
            {menuOpen && (
            <ul className="submenu">
              <li><Link to="/meat">🥩 Meat Dish</Link></li>
              <li><Link to="/fish">🐟 Fish Dish</Link></li>
            </ul>
            )}
            </li>
            <li><Link to ="/about">About </Link></li>
            <li><Link to ="/contact">Contact </Link></li>
            </ul>


           
        </nav>
        );

}
export default NavBar;