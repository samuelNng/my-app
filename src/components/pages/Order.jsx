import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import menuData from '../backend/menu.json'; // Import the menu data directly

const Order = ({ totalQuantity, setTotalQuantity }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [orders, setOrders] = useState([]);

  // Load data on component mount
  useEffect(() => {
    // Set menu items from the imported JSON
    setMenuItems(menuData);
    
    // Load orders from localStorage
    const savedOrders = localStorage.getItem('orders');
    const parsedOrders = savedOrders ? JSON.parse(savedOrders) : [];
    setOrders(parsedOrders);
    
    // Calculate total quantity from saved orders
    const totalItems = parsedOrders.reduce((sum, item) => sum + (item.quantity || 1), 0);
    setTotalQuantity(totalItems);
  }, []);

  // Save orders to localStorage
  const saveOrders = (updatedOrders) => {
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
  };

  // Add item to order
  const addToOrder = (item) => {
    const updatedOrders = [...orders];
    const existingOrder = updatedOrders.find(order => order.item_id === item.item_id);

    if (existingOrder) {
      existingOrder.quantity += 1; // Increase quantity if item exists
    } else {
      updatedOrders.push({ ...item, quantity: 1 });
    }

    saveOrders(updatedOrders);
    setTotalQuantity((prevQuantity) => prevQuantity + 1);
  };

  // Decrease or remove item from order
  const decToOrder = (item) => {
    let updatedOrders = [...orders];
    const existingOrder = updatedOrders.find(order => order.item_id === item.item_id);

    if (existingOrder) {
      if (existingOrder.quantity > 1) {
        existingOrder.quantity -= 1; // Decrease quantity
      } else {
        updatedOrders = updatedOrders.filter(order => order.item_id !== item.item_id); // Remove item
      }

      saveOrders(updatedOrders);
      setTotalQuantity((prevQuantity) => Math.max(0, prevQuantity - 1));
    }
  };
  
  // Calculate total price
  const totalPrice = orders.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <div className="container mt-4">
        <div className="row">
          {/* Left Side: Menu */}
          <div className="col-md-6">
            <div className="menu-container p-3">
              <h2>Our Menu 🍽️</h2>
              <ul className="list-group">
                {menuItems.map((item) => (
                  <li key={item.item_id} className="list-group-item d-flex justify-content-between align-items-center">
                    <Link to={item.name === "meat" ? "/meat" : "/fish"} className="text-dark">
                      {item.name === "meat" ? "🥩 Meat Dish" : "🐟 Fish Dish"}
                      <img src={item.image} alt={item.name} width="100" />
                    </Link>
                    ${item.price}
                    <button className="btn btn-danger btn-sm" onClick={() => addToOrder(item)}>Add</button>
                    <button className="btn btn-danger btn-sm" onClick={() => decToOrder(item)}>Remove</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Side: Orders */}
          <div className="col-md-6">
            <div className="order-container p-3 bg-light">
              <h2>Your Orders 🛒</h2>
              {orders.length === 0 ? (
                <p>No orders yet.</p>
              ) : (
                <ul className="list-group">
                  {orders.map((order) => (
                    <li key={order.order_id || order.item_id} className="list-group-item d-flex justify-content-between">
                      {order.name === "meat" ? "🥩 Meat Dish" : "🐟 Fish Dish"}
                      <span className="badge bg-success">x{order.quantity || 1}</span>
                    </li>
                  ))}
                </ul>
              )}
              <h2>Total: ${totalPrice.toFixed(2)}</h2>
              <h2>Total Items: {totalQuantity}</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Order;
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";


// const Order = ({ totalQuantity, setTotalQuantity }) => {
//   const [menuItems, setMenuItems] = useState([]);
//   const [orders, setOrders] = useState([]);
//   //const [totalQuantity, setTotalQuantity] = useState(0); // Add state for totalQuantity

//   // Fetch menu items
//   const fetchMenu = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/menu");
//       const data = await response.json();
//       setMenuItems(data);
//     } catch (error) {
//       console.error("Error fetching menu:", error);
//     }
//   };

//   // Fetch orders
//   const fetchOrders = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/orders");
//       const data = await response.json();
//       setOrders(data);

//       const totalItems   = data.reduce((sum, item) => sum + (item.quantity || 1), 0);
//       setTotalQuantity(totalItems);
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//     }
//   };

 

//   useEffect(() => {
//     fetchMenu();
//     fetchOrders();
//   }, []);
 

//   // Add item to order
//   const addToOrder = async (item) => {
//     try {
//       await fetch("http://localhost:5000/orders", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(item),
//       });

//       fetchOrders(); // Refresh orders after adding an item
//       setTotalQuantity((prevQuantity) => prevQuantity + (item.quantity || 1),0);
//     } catch (error) {
//       console.error("Error adding order:", error);
//     }
//   };
//   // Decrease or remove item from order
//   const decToOrder = async (item) => {
//     try {
//       // Use the correct endpoint - should match your server route for deletion
//       await fetch(`http://localhost:5000/orders/${item.item_id}`, {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//       });
      
//       // Decrease the local total quantity by 1 only
//       setTotalQuantity((prevQuantity) => Math.max(0, prevQuantity - 1));
      
//       // Fetch updated orders to refresh the UI
//       fetchOrders();
//     } catch (error) {
//       console.error("Error decreasing order:", error);
//     }
//   };
//   //Calculate total price
//    const totalPrice = orders.reduce((sum, item) => sum + item.price * item.quantity, 0);
//    //Calculate total Quantity
//    //const totalQuantityo = orders.reduce((sum, item) => sum + item.quantity, 0);
//     //<NavBar totalQuantityo="totalQuantity"/>

//   return (
//     <>
//     {/* <NavBar totalQuantity={totalQuantity} /> */}
//     <div className="container mt-4">
//       <div className="row">
//         {/* Left Side: Menu */}
//         <div className="col-md-6">
//           <div className="menu-container p-3">
//             <h2>Our Menu 🍽️</h2>
//             <ul className="list-group">
//               {menuItems.map((item) => (
//                 <li key={item.item_id} className="list-group-item d-flex justify-content-between align-items-center">
//                   <Link to={item.name === "meat" ? "/meat" : "/fish"} className="text-dark">
//                     {item.name === "meat" ? "🥩 Meat Dish"  : "🐟 Fish Dish"}
//                     {console.log("Image Path:", item.image)} 
//                     <img src={item.image} alt={item.name} width="100" />

//                   </Link>
//                   {/* <img src= {Meat}/> */}
//                   {item.price}

                  
//                   <button className="btn btn-danger btn-sm" onClick={() => addToOrder(item)}>Add</button>
//                   <button className="btn btn-danger btn-sm" onClick={() => decToOrder(item)}>Remove</button>
//                 </li>
//               ))}
//             </ul>
            
//           </div>
//         </div>

//         {/* Right Side: Orders */}
//         <div className="col-md-6">
//           <div className="order-container p-3 bg-light">
//             <h2>Your Orders 🛒</h2>
//             {orders.length === 0 ? (
//               <p>No orders yet.</p>
//             ) : (
//               <ul className="list-group">
//                 {orders.map((order) => (
//                   <li key={order.order_id} className="list-group-item d-flex justify-content-between">
//                     {order.name === "meat" ? "🥩 Meat Dish" : "🐟 Fish Dish"}
//                     <span className="badge bg-success">x{order.quantity || 1}</span>
                    
//                   </li>
//                 ))}
//               </ul>
                
//             )}
            
//             <h2>Total:${totalPrice}</h2>
//             <h2>Total:${totalQuantity}</h2>
            
//           </div>
//         </div>
//       </div>
      
//     </div>
//     </>
//   );
// };

// export default Order;

