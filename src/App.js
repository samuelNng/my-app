import React, { useState, useEffect } from "react";
import Menu from './components/Menu';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyRoutes from './components/routing/MyRoutes';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import NavBar from "./components/routing/NavBar";
import './output.css';

function App() {
  const [totalQuantity, setTotalQuantity] = useState(0);
  return (
    <>
    
    <Router>
      <NavBar totalQuantity={totalQuantity} />
      <MyRoutes totalQuantity={totalQuantity} setTotalQuantity={setTotalQuantity} />
    </Router>


    

    </>
  );
}

export default App;
