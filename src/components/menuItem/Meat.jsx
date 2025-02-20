import React,{useState} from "react";
import meatlmage from './meatImage/meat.jpg';

const Meat =()=>{
const [count, setCount] = useState(0);



    return(
    <>
    <h1>Meat Dish</h1>
    
    <img src={meatlmage} alt="Delicious Meat Dish" className="dish-image" />
    <p>Delicious grilled meat with spices.</p>
      <button onClick={() => setCount(count + 1)}>
        Order: {count}
      </button>
   
    
    </>
    )
}
export default Meat;