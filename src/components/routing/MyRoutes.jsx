import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import React, { useState }  from 'react';
import Menu from '../Menu.jsx';
import HomePage from '../pages/HomePage.jsx';
import Meat from '../menuItem/Meat.jsx';
import Fish from '../menuItem/Fish.jsx';
import About from '../pages/About.jsx';
import Contact from '../pages/Contact.jsx';
import Order from '../pages/Order.jsx';

import NavBar from './NavBar.jsx';
import '../../output.css';



const MyRoutes = ({ totalQuantity, setTotalQuantity }) => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/menu" element={<Menu />} />
      <Route path="/meat" element={<Meat />} />
      <Route path="/fish" element={<Fish />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/orders" element={<Order totalQuantity={totalQuantity} setTotalQuantity={setTotalQuantity} />} />
    </Routes>
  );
};

export default MyRoutes;

// const MyRoutes=()=>{
//     const [totalQuantity, setTotalQuantity] = useState(0); // Move state to App
//     return(
//     <> 
//     <Router>
    
//         <NavBar totalQuantity={totalQuantity}/>
//         <Routes>
//             <Route path="/" element={<HomePage/>}/>
//             <Route path="/menu" element={<Menu/>}/>
//             <Route path="/meat" element={<Meat/>}/>
//             <Route path="/fish" element={<Fish/>}/>
//             <Route path="/about" element={<About/>}/>
//             <Route path="/contact" element={<Contact/>}/>
//             <Route path="/orders" element={<Order totalQuantity={totalQuantity} setTotalQuantity={setTotalQuantity}/>}/>
            
            

//         </Routes>
    
//     </Router>
       
//     </>
//     );

// }
// export default MyRoutes;