import React from 'react';
import { Link } from "react-router-dom"
function HomePage(){
    return(
        <div className="home">
        <h1>Welcome to Our Restaurant! </h1>
        <h2>Explore our </h2> 
        <h2><Link to ="/menu">Menu </Link></h2>
        </div>
    )


}
export default HomePage;