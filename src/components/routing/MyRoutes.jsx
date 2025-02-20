import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import React from 'react';
import Menu from '../Menu.jsx';
import HomePage from '../pages/HomePage.jsx';
import Meat from '../menuItem/Meat.jsx';
import Fish from '../menuItem/Fish.jsx';
import About from '../pages/About.jsx';
import Contact from '../pages/Contact.jsx';

import NavBar from './NavBar.jsx';
const MyRoutes=()=>{
    return(
    <> 
    <Router>
        <NavBar/>
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/menu" element={<Menu/>}/>
            <Route path="/meat" element={<Meat/>}/>
            <Route path="/fish" element={<Fish/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="/contact" element={<Contact/>}/>

        </Routes>

    </Router>
       
    </>
    );

}
export default MyRoutes;