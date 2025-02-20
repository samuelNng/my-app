import React,{useState} from "react";
import { Link } from "react-router-dom"

const Menu =()=>{
//{listText, dish, meat}
const [count, setCount]= useState(0)
const incrementCount = () =>{
    setCount(count +1)
}

    return(
    <>

    <div className="menu">
      <h1>Our Menu 🍽️</h1>
      <ul>
        <li><Link to="/meat">🥩 Meat Dish</Link></li>
        <li><Link to="/fish">🐟 Fish Dish</Link></li>
      </ul>
    </div>

    <button onClick={incrementCount}>Counter: {count}</button>
    
    </>
    )
}
export default Menu;