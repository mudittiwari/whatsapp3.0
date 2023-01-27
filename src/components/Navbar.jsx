import React from 'react';

const Navbar = () => {
  return (
    <header className="bg-white p-6" style={{'backgroundColor':'rgb(24, 26, 27)'}}>
    <div className="flex items-center justify-between">
        <div className="text-lg font-medium text-white">WhatsApp Web 3.0</div>
        <div className="flex items-center">
            <button className=" text-white px-3 py-2 rounded-md" style={{'backgroundColor':'rgb(37, 40, 42)'}}>New Chat</button>
            <button className=" text-white px-3 py-2 rounded-md ml-4" style={{'backgroundColor':'rgb(37, 40, 42)'}}>Stories</button>
            <button className=" text-white px-3 py-2 rounded-md ml-4" style={{'backgroundColor':'rgb(37, 40, 42)'}}>Settings</button>
        </div>
    </div>
</header>
  );
}

export default Navbar;