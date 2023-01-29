import React from "react";
import { useNavigate } from "react-router-dom";
function Friendscomp(props)
{
    const navigate= useNavigate();
    // console.log(props.name);
    return (
        <>
            <div className="flex flex-col">
            <div className="bg-white rounded-lg p-4 mb-4 cursor-pointer flex justify-between w-full" style={{'backgroundColor':'rgb(24, 26, 27)'}} >
                <div className="flex items-center">
                    <img className="w-10 h-10 rounded-full mr-4" src="https://randomuser.me/api/portraits/men/1.jpg" alt="User"/>
                    <div className="text-lg font-medium text-white">{props.name}</div>
                </div>
                <button onClick={async(e) => {
                  e.preventDefault();
                  navigate('/chat')
                }} className=" text-white px-3 py-2 rounded-md" style={{ 'backgroundColor': 'rgb(37, 40, 42)' }}>{props.status}</button>
            </div>
            {/* <div className="bg-gray-200 rounded-lg p-4 mb-4">
                <div className="text-sm text-gray-600">I'm good, how about you?</div>
            </div> */}
        </div>
        </>
    );
}
export default Friendscomp