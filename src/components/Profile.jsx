import React from "react";
import Navbar from "./Navbar";
const Profile = () => {
    const height=window.innerHeight-88;
    return (
        <>
        <Navbar/>
      <div className="px-6 py-8" style={{'backgroundColor':'rgb(37, 40, 42)','height':height}}>
        <div className="relative mx-auto max-w-xs">
          <img
            className="w-32 h-32 rounded-full mx-auto"
            src="https://avatars0.githubusercontent.com/u/20586316?s=460&u=1a231365e08f6acd5fa0e63e0c16f4cc3f52c475&v=4"
            alt="Profile"
          />
          <div className="text-center mt-4">
            <h2 className="text-lg font-medium leading-7 text-white">
              John Doe
            </h2>
            <p className="text-sm font-medium leading-5 text-white">
              +1 (555) 555-5555
            </p>
          </div>
        </div>
        <button onClick={(e) => {
            e.preventDefault();
           
          }} className=" text-white mx-auto w-max block mt-5 px-3 py-2 rounded-md" style={{'backgroundColor':'rgb(24, 26, 27)'}} >Change Photo</button>
        <div className="mt-0" style={{'backgroundColor':'rgb(37, 40, 42)'}}>
          <div className="px-4 py-5">
            <div className="flex flex-col justify-center items-center">
              <div className="text-lg mb-2 leading-5 font-medium text-white">
                About
              </div>
              <div className="mt-1 text-sm w-96 text-center leading-5 text-white" >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                blandit, ipsum vel blandit consectetur, nibh lectus facilisis
                massa, id laoreet libero odio vel velit.
              </div>
            </div>
          </div>
        </div>
      </div>
      </>
    );
  };

  export default Profile;