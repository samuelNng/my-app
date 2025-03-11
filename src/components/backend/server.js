const express = require("express");
const cors = require("cors");
const fs = require("fs");
const axios = require("axios");

const app = express();
const ordersFile = "./orders.json"; // JSON file to store orders
const menuFile = "./menu.json";
app.use(cors()); 
app.use(express.json());





const API_KEY = "391c081f285b46f19003b5ca1d7e0514"; // Replace with your Geoapify API key
const GEOAPIFY_URL = `https://api.geoapify.com/v2/places?categories=catering.restaurant&filter=circle:-0.12804941070724718,51.508037,5000&limit=20&apiKey=${API_KEY}`;


// 📌 GET: Fetch all menu items (NEW ROUTE)
app.get("/menu", (req, res) => {
    fs.readFile(menuFile, "utf8", (err, data) => {
        if (err) return res.status(500).json({ message: "Error reading menu items" });

        let menu;
        try {
            menu = JSON.parse(data);
            if (!Array.isArray(menu)) {
                menu = []; // Ensure it's always an array
            }
        } catch (error) {
            menu = []; // Return empty array if JSON is corrupted
        }
        console.log("Sending menu data:", menu);

        res.json(menu); // Send menu items to frontend
    });
});
//GET: Fetch all orders
app.get("/orders", (req, res) => {
    fs.readFile(ordersFile, "utf8", (err, data) => {
        if (err) return res.status(500).json({ message: "Error reading orders" });

        let orders;
        try {
            orders = JSON.parse(data);
            if (!Array.isArray(orders)) {
                orders = []; // Ensure it's always an array
            }
        } catch (error) {
            orders = []; // Return empty array if JSON is corrupted
        }

        res.json(orders);
    });
});


//POST: Add order
app.post("/orders", (req, res) => {
    const { item_id, name, price } = req.body;

    fs.readFile(ordersFile, "utf8", (err, data) => {
        if (err) return res.status(500).json({ message: "Error reading orders" });

        let orders = JSON.parse(data);
        let existingOrder = orders.find(order => order.item_id === item_id);

        if (existingOrder) {
            existingOrder.quantity += 1; // Increase quantity if item exists
        } else {
            orders.push({ item_id, name, price, quantity: 1 });
        }

        fs.writeFile(ordersFile, JSON.stringify(orders, null, 2), (err) => {
            if (err) return res.status(500).json({ message: "Error updating orders" });
            res.json({ message: "Order added successfully!", orders });
        });
    });
});

// DELETE: Remove an order
app.delete("/orders/:id", (req, res) => {
    const itemId = parseInt(req.params.id);

    fs.readFile(ordersFile, "utf8", (err, data) => {
        if (err) return res.status(500).json({ message: "Error reading orders" });

        let orders = JSON.parse(data);
        let existingOrder = orders.find(order => order.item_id === itemId);

        if (existingOrder) {
            if (existingOrder.quantity > 1) {
                existingOrder.quantity -= 1; // Decrease quantity
            } else {
                orders = orders.filter(order => order.item_id !== itemId); // Remove item if quantity < 1
            }
        } else {
            return res.status(404).json({ message: "Order not found" });
        }

        fs.writeFile(ordersFile, JSON.stringify(orders, null, 2), (err) => {
            if (err) return res.status(500).json({ message: "Error updating orders" });
            res.json({ message: "Order updated successfully!", orders });
        });
    });
});



// 📌 New Route: Fetch locations from Geoapify
app.get("/locations", async (req, res) => {
    const { search } = req.query; // Get search keyword from query parameter
    let GEOAPIFY_URL = `https://api.geoapify.com/v2/places?categories=catering.restaurant&filter=circle:-0.12804941070724718,51.508037,2000&bias=proximity:-0.12804941070724718,51.508037&limit=20&apiKey=${API_KEY}`;
    

    try {
        const response = await axios.get(GEOAPIFY_URL);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ message: "Error fetching locations", error });
    }
});








// Start the server
app.listen(5000, () => console.log("Server running on port 5000"));
