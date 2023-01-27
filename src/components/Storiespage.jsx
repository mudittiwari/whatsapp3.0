import React from 'react';
import Navbar from './Navbar';

const StoriesPage = () => {
    const height=window.innerHeight-88;
  return (
    <>
     <Navbar />
    <div className=" text-white overflow-y-scroll" style={{'backgroundColor':'rgb(37, 40, 42)','height':height}}>
      <div className="px-4 py-6">
        <h2 className="text-xl font-medium mb-4">Stories</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="relative rounded-lg overflow-hidden">
            <img  src="https://randomuser.me/api/portraits/men/1.jpg" alt="Story 1" className="w-full h-56 object-cover" />
            <div className="absolute bottom-0 left-0 p-2">
              <span className="text-xs font-medium">Username</span>
            </div>
          </div>
          <div className="relative rounded-lg overflow-hidden">
            <img  src="https://randomuser.me/api/portraits/men/1.jpg" alt="Story 2" className="w-full h-56 object-cover" />
            <div className="absolute bottom-0 left-0 p-2">
              <span className="text-xs font-medium">Username</span>
            </div>
          </div>
          <div className="relative rounded-lg overflow-hidden">
            <img  src="https://randomuser.me/api/portraits/men/1.jpg" alt="Story 3" className="w-full h-56 object-cover" />
            <div className="absolute bottom-0 left-0 p-2">
              <span className="text-xs font-medium">Username</span>
            </div>
          </div>
          <div className="relative rounded-lg overflow-hidden">
            <img  src="https://randomuser.me/api/portraits/men/1.jpg" alt="Story 3" className="w-full h-56 object-cover" />
            <div className="absolute bottom-0 left-0 p-2">
              <span className="text-xs font-medium">Username</span>
            </div>
          </div>
          <div className="relative rounded-lg overflow-hidden">
            <img  src="https://randomuser.me/api/portraits/men/1.jpg" alt="Story 3" className="w-full h-56 object-cover" />
            <div className="absolute bottom-0 left-0 p-2">
              <span className="text-xs font-medium">Username</span>
            </div>
          </div>
          <div className="relative rounded-lg overflow-hidden">
            <img  src="https://randomuser.me/api/portraits/men/1.jpg" alt="Story 3" className="w-full h-56 object-cover" />
            <div className="absolute bottom-0 left-0 p-2">
              <span className="text-xs font-medium">Username</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default StoriesPage;