import React, { useEffect } from "react";
import Homepageuser from "./Homepageuser";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
function Homepage()
{
    const navigate=useNavigate();
    useEffect(()=>{
        if(localStorage.getItem('user')==null)
        {
            navigate('/loginsignup');
        }
    })
    const height=window.innerHeight-88;
    return (
        <>
        <Navbar />
        <main className="flex-1 overflow-y-scroll p-6" style={{'backgroundColor':'rgb(37, 40, 42)','height':height}}>
        <Homepageuser/>
        <Homepageuser/>
        <Homepageuser/>
        <Homepageuser/>
        <Homepageuser/>
    </main>
        </>
    );
}
export default Homepage;