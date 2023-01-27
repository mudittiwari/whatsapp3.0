import React, { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
const Chatbox = () => {
    const height=window.innerHeight-88-56;
    const containerRef = useRef(null);
    function scrolltobottom()
    {
        const container = containerRef.current;
        container.scrollTop = container.scrollHeight;
    }
    useEffect(() => {
       scrolltobottom();
      },);
  const [messages, setMessages] = useState([
    {
      text: "Hey, what's up?",
      sender: "John Doe"
    },
    {
      text: "Not much, just working on some projects. How about you?",
      sender: "Jane Smith"
    },
    {
      text: "Same here, just trying to stay productive.",
      sender: "John Doe"
    },
    {
        text: "Hey, what's up?",
        sender: "John Doe"
      },
      {
        text: "Not much, just working on some projects. How about you?",
        sender: "Jane Smith"
      },
      {
        text: "Same here, just trying to stay productive.",
        sender: "John Doe"
      },
      {
        text: "Hey, what's up?",
        sender: "John Doe"
      },
      {
        text: "Not much, just working on some projects. How about you?",
        sender: "Jane Smith"
      },
      {
        text: "Same here, just trying to stay productive.",
        sender: "John Doe"
      }
  ]);

  return (
    <>
     <header className="bg-white p-6" style={{'backgroundColor':'rgb(24, 26, 27)'}}>
    <div className="flex items-center justify-between">
    <div className="flex items-center">
                    <img className="w-10 h-10 rounded-full mr-4" src="https://randomuser.me/api/portraits/men/1.jpg" alt="User"/>
                    <div className="text-lg font-medium text-white">Mudit Tiwari</div>
                </div>
       
    </div>
</header>
    <div className=" p-4 overflow-y-scroll" ref={containerRef} style={{'backgroundColor':'rgb(37, 40, 42)','height':height}}>
        
      <div className="h-max ">
        {messages.map((message, index) => (
          <div key={index} className={`flex mb-4 ${message.sender === 'John Doe' ? 'justify-end' : 'justify-start'}`}>
            <div className={` text-white p-2 rounded-lg ${message.sender === 'John Doe' ? 'ml-auto' : 'mr-auto'}`}  style={{'backgroundColor':'rgb(24, 26, 27)'}}>
              {message.text}
            </div>
          </div>
        ))}
      </div>
      
    </div>
    <div className=" p-2"  style={{'backgroundColor':'rgb(24, 26, 27)'}}>
        <input type="text" placeholder="Type a message..." className=" text-white p-2 rounded-lg w-full" style={{'backgroundColor':'rgb(37, 40, 42)'}} />
      </div> 
    </>
  );
}

export default Chatbox;