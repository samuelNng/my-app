import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import menuData from "../backend/menu.json";
import { FaShoppingCart } from "react-icons/fa";

const Order = ({ totalQuantity, setTotalQuantity }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    setMenuItems(menuData);

    const savedOrders = localStorage.getItem("orders");
    const parsedOrders = savedOrders ? JSON.parse(savedOrders) : [];
    setOrders(parsedOrders);

    const totalItems = parsedOrders.reduce((sum, item) => sum + (item.quantity || 1), 0);
    setTotalQuantity(totalItems);
  }, []);

  const saveOrders = (updatedOrders) => {
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
  };

  const addToOrder = (item) => {
    const updatedOrders = [...orders];
    const existingOrder = updatedOrders.find((order) => order.item_id === item.item_id);

    if (existingOrder) {
      existingOrder.quantity += 1;
    } else {
      updatedOrders.push({ ...item, quantity: 1 });
    }

    saveOrders(updatedOrders);
    setTotalQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decToOrder = (item) => {
    let updatedOrders = [...orders];
    const existingOrder = updatedOrders.find((order) => order.item_id === item.item_id);

    if (existingOrder) {
      if (existingOrder.quantity > 1) {
        existingOrder.quantity -= 1;
      } else {
        updatedOrders = updatedOrders.filter((order) => order.item_id !== item.item_id);
      }

      saveOrders(updatedOrders);
      setTotalQuantity((prevQuantity) => Math.max(0, prevQuantity - 1));
    }
  };

  const totalPrice = orders.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="flex flex-col md:flex-row gap-8 p-8 bg-gray-100 min-h-screen">
      {/* Left Side: Menu */}
      <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Our Menu 🍽️</h2>
        <div className="space-y-4">
          {menuItems.map((item) => (
            <div key={item.item_id} className="flex items-center justify-between p-4 border rounded-lg shadow-md bg-gray-50">
              <div className="flex items-center gap-4">
                <img src={item.image} alt={item.name} className="w-30 h-30 rounded-md" />
                <div>
                  <Link to={item.name === "meat" ? "/meat" : "/fish"} className="text-lg font-semibold text-gray-800 hover:underline">
                    {item.name === "meat" ? "🥩 Meat Dish" : "🐟 Fish Dish"}
                  </Link>
                  <p className="text-gray-600">${item.price}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => addToOrder(item)} className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition">
                  Add
                </button>
                <button onClick={() => decToOrder(item)} className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <Link to="/menu">
          <button className="w-full mt-6 bg-blue-500 text-white px-4 py-2 rounded-lg text-lg font-semibold transition hover:scale-105 hover:bg-indigo-500">
            Back To Our Menu
          </button>
        </Link>
      </div>

      {/* Right Side: Orders */}
      <div className="w-full md:w-1/2 bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
          Your Orders <FaShoppingCart className="text-xl text-blue-500" />
        </h2>
        {orders.length === 0 ? (
          <p className="text-gray-600">No orders yet.</p>
        ) : (
          <ul className="space-y-4">
            {orders.map((order) => (
              <li key={order.order_id || order.item_id} className="flex justify-between items-center p-3 border rounded-lg bg-gray-50 shadow-sm">
                <span className="text-lg">
                  {order.name === "meat" ? "🥩 Meat Dish" : "🐟 Fish Dish"}
                </span>
                <span className="bg-green-500 text-white px-3 py-1 rounded-lg">x{order.quantity || 1}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-6 text-lg font-semibold">
          <p>Total Items: <span className="text-blue-500">{totalQuantity}</span></p>
          <p>Total Price: <span className="text-green-500">${totalPrice.toFixed(2)}</span></p>
        </div>
      </div>
    </div>
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

