import React from "react";
import Homepageuser from "./Homepageuser";
import Navbar from "./Navbar";
function Homepage()
{
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