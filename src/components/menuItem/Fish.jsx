import React,{useState} from "react";
import meatlmage from './meatImage/fish.jpg'

const Fish =()=>{
const [fishOrder, setCount] = useState(0);



    return(
    <>
    <h1>Meat Dish</h1>
    
    <img src={meatlmage} alt="Delicious Meat Dish" className="dish-image" />
    <p>Delicious grilled fish with salad.</p>
      <button onClick={() => setCount(fishOrder + 1)}>
        Order: {fishOrder}
      </button>
   
    
    </>
    )
}
export default Fish;