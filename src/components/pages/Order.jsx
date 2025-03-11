// import React, { useEffect, useState } from "react";


// const Order =()=>{
// //{listText, dish, meat}
// const [orders, setOrders] = useState([]);

//   // Fetch orders from backend
// const fetchOrders = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/orders");
//       const data = await response.json();
//       setOrders(data);
//     } catch (error) {
//       console.error("Error fetching orders:", error);
//     }
//   };


//     // Add an order
// const addToOrder = async (item) => {
//     try {
//     await fetch("http://localhost:5000/orders", {
//         method: "POST",
//         headers: {
//         "Content-Type": "application/json",
//         },
//         body: JSON.stringify(item),
//     });

//     fetchOrders(); // Refresh order list
//     } catch (error) {
//     console.error("Error adding order:", error);
//     }
//   };
// const removeFromOrder = async (item_id) => {
// try {
//     await fetch(`http://localhost:5000/orders/${item_id}`, {
//     method: "DELETE",
//     });

//     fetchOrders(); // Refresh order list
// } catch (error) {
//     console.error("Error removing order:", error);
// }
// };
// useEffect(() => {
//     fetch("http://localhost:5000/orders")
//         .then((res) => res.json())
//         .then((data) => {
//             console.log("Orders Data:", data); // 🔍 Check if it's an array
//             setOrders(data);
//         })
//         .catch((error) => console.error("Error fetching orders:", error));
// }, []);
// // Calculate total price
// const totalPrice = orders.reduce((sum, item) => sum + item.price * item.quantity, 0);


// return (
//     <div>
//       <h1>Checkout</h1>
//       <ul>
//         {orders.map((item) => (
//           <li key={item.item_id}>
//             {item.name} - ${item.price} x {item.quantity}
//             <button onClick={() => addToOrder(item)}>+</button>
//             <button onClick={() => removeFromOrder(item.item_id)}>-</button>
//           </li>
//         ))}
//       </ul>
//       <h2>Total: ${totalPrice}</h2>
//     </div>
//   );
// };
// export default Order;
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const Order = ({ totalQuantity, setTotalQuantity }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [orders, setOrders] = useState([]);
  //const [totalQuantity, setTotalQuantity] = useState(0); // Add state for totalQuantity

  // Fetch menu items
  const fetchMenu = async () => {
    try {
      const response = await fetch("http://localhost:5000/menu");
      const data = await response.json();
      setMenuItems(data);
    } catch (error) {
      console.error("Error fetching menu:", error);
    }
  };

  // Fetch orders
  const fetchOrders = async () => {
    try {
      const response = await fetch("http://localhost:5000/orders");
      const data = await response.json();
      setOrders(data);

      const totalItems   = data.reduce((sum, item) => sum + (item.quantity || 1), 0);
      setTotalQuantity(totalItems);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

 

  useEffect(() => {
    fetchMenu();
    fetchOrders();
  }, []);
 

  // Add item to order
  const addToOrder = async (item) => {
    try {
      await fetch("http://localhost:5000/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(item),
      });

      fetchOrders(); // Refresh orders after adding an item
      setTotalQuantity((prevQuantity) => prevQuantity + (item.quantity || 1),0);
    } catch (error) {
      console.error("Error adding order:", error);
    }
  };
  // Decrease or remove item from order
  const decToOrder = async (item) => {
    try {
      // Use the correct endpoint - should match your server route for deletion
      await fetch(`http://localhost:5000/orders/${item.item_id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      
      // Decrease the local total quantity by 1 only
      setTotalQuantity((prevQuantity) => Math.max(0, prevQuantity - 1));
      
      // Fetch updated orders to refresh the UI
      fetchOrders();
    } catch (error) {
      console.error("Error decreasing order:", error);
    }
  };
  //Calculate total price
   const totalPrice = orders.reduce((sum, item) => sum + item.price * item.quantity, 0);
   //Calculate total Quantity
   //const totalQuantityo = orders.reduce((sum, item) => sum + item.quantity, 0);
    //<NavBar totalQuantityo="totalQuantity"/>

  return (
    <>
    {/* <NavBar totalQuantity={totalQuantity} /> */}
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
                    {item.name === "meat" ? "🥩 Meat Dish"  : "🐟 Fish Dish"}
                    {console.log("Image Path:", item.image)} 
                    <img src={item.image} alt={item.name} width="100" />

                  </Link>
                  {/* <img src= {Meat}/> */}
                  {item.price}

                  
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
                  <li key={order.order_id} className="list-group-item d-flex justify-content-between">
                    {order.name === "meat" ? "🥩 Meat Dish" : "🐟 Fish Dish"}
                    <span className="badge bg-success">x{order.quantity || 1}</span>
                    
                  </li>
                ))}
              </ul>
                
            )}
            
            <h2>Total:${totalPrice}</h2>
            <h2>Total:${totalQuantity}</h2>
            
          </div>
        </div>
      </div>
      
    </div>
    </>
  );
};

export default Order;

