import React from "react";

function Homepageuser()
{
    return (
        <>
            <div className="flex flex-col">
            <div className="bg-white rounded-lg p-4 mb-4 cursor-pointer" style={{'backgroundColor':'rgb(24, 26, 27)'}} >
                <div className="flex items-center">
                    <img className="w-10 h-10 rounded-full mr-4" src="https://randomuser.me/api/portraits/men/1.jpg" alt="User"/>
                    <div className="text-lg font-medium text-white">John Doe</div>
                </div>
                <div className="text-sm text-white">Hey, how's it going?</div>
            </div>
            {/* <div className="bg-gray-200 rounded-lg p-4 mb-4">
                <div className="text-sm text-gray-600">I'm good, how about you?</div>
            </div> */}
        </div>
        </>
    );
}
export default Homepageuser