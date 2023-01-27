import React, { useEffect } from 'react';
import whatsapp3 from '../abis/whatsapp3.json';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import { useState } from 'react';
const Navbar = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(0);
  const [account, setaccount] = useState('')
  const [contract, setcontract] = useState('')
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenfriends, setIsOpenfriends] = useState(false);
  const [userprofiles, setuserprofiles] = useState({})
  const [friendsprofiles, setfriendsprofiles] = useState({})
  async function loadWeb3() {
    if (window.ethereum) {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
    }

    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async function loadblockchaindata() {
    const web3 = new Web3(window.ethereum);

    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    console.log(accounts);
    setaccount(accounts[0])
    const networkId = await web3.eth.net.getId()
    const networkData = whatsapp3.networks[networkId]
    if (networkData) {
      const whatsapp3_ = new web3.eth.Contract(whatsapp3.abi, networkData.address);


      setcontract(whatsapp3_);
      let users = await whatsapp3_.methods.getusers().call();
      let userprofiles = {};
      await users.map(async (user) => {
        let usr = await whatsapp3_.methods.users(user).call();
        userprofiles[`${user}`] = usr;
        console.log(user,account)
      })
      let friends=await whatsapp3_.methods.getfriends(accounts[0]).call();
      let friendsprofiles={};
      await friends.map(async (friend) => {
        let frnd = await whatsapp3_.methods.users(friend).call();
        friendsprofiles[`${friend}`] = frnd;
      })
      console.log(friendsprofiles)
      setfriendsprofiles(friendsprofiles);
      setuserprofiles(userprofiles);
    } else {
      window.alert('whatsapp3 contract not deployed to detected network.')
    }
  }
  // async function loadallusers() {
  //   let users = await contract.methods.getusers().call();
  //   let userprofiles = {};
  //   await users.map(async (user) => {
  //     let usr = await contract.methods.users(user).call();
  //     userprofiles[`${user}`] = usr;
  //   }

  //   )
  //   setuserprofiles(userprofiles);
  //   setCount(count + 1);
  // }
  useEffect(() => {
    loadWeb3();
    loadblockchaindata();
  }, [])
  return (

    <header className="bg-white p-6 w-full" style={{ 'backgroundColor': 'rgb(24, 26, 27)' }}>
      {isOpen && (
        <div className="fixed top-0 left-0 h-full w-full flex items-center justify-center">
          <div className=" p-6 rounded-lg w-1/2 h-80 overflow-y-scroll" style={{ 'backgroundColor': 'rgb(37, 40, 42)' }}>
            <div className='flex justify-between mb-5 items-center'> <h3 className="text-lg font-medium text-white ">Find People</h3> <button onClick={() => setIsOpen(false)} className=" text-white px-3 py-2 rounded-md" style={{ 'backgroundColor': 'rgb(24, 26, 27)' }}>Close</button></div>
            <div className=" p-2 mb-5" style={{ 'backgroundColor': 'rgb(24, 26, 27)' }}>
              <input type="text" placeholder="Search a user" className=" text-white p-2 rounded-lg w-full" style={{ 'backgroundColor': 'rgb(37, 40, 42)' }} />
            </div>
            {Object.keys(userprofiles).map((user) => {
              if(user.toLowerCase()!=account.toString().toLowerCase())
              return <div key={user} className="bg-white rounded-lg p-4 mb-4 cursor-pointer flex justify-between" style={{ 'backgroundColor': 'rgb(24, 26, 27)' }} >
                <div className="flex items-center">
                  <img className="w-10 h-10 rounded-full mr-4" src="https://randomuser.me/api/portraits/men/1.jpg" alt="User" />
                  <div className="text-lg font-medium text-white">{userprofiles[user][0]}</div>
                </div>
                <button onClick={() => setIsOpen(false)} className=" text-white px-3 py-2 rounded-md" style={{ 'backgroundColor': 'rgb(37, 40, 42)' }}>Add Friend</button>
              </div>
            })}


          </div>
        </div>
      )}



{isOpenfriends && (
        <div className="fixed top-0 left-0 h-full w-full flex items-center justify-center">
          <div className=" p-6 rounded-lg w-1/2 h-80 overflow-y-scroll" style={{ 'backgroundColor': 'rgb(37, 40, 42)' }}>
            <div className='flex justify-between mb-5 items-center'> <h3 className="text-lg font-medium text-white ">Find Friends</h3> <button onClick={() => setIsOpenfriends(false)} className=" text-white px-3 py-2 rounded-md" style={{ 'backgroundColor': 'rgb(24, 26, 27)' }}>Close</button></div>
            <div className=" p-2 mb-5" style={{ 'backgroundColor': 'rgb(24, 26, 27)' }}>
              <input type="text" placeholder="Search a friend" className=" text-white p-2 rounded-lg w-full" style={{ 'backgroundColor': 'rgb(37, 40, 42)' }} />
            </div>
            {Object.keys(friendsprofiles).map((user) => {
              if(user.toLowerCase()!=account.toString().toLowerCase())
              return <div key={user} className="bg-white rounded-lg p-4 mb-4 cursor-pointer flex justify-between" style={{ 'backgroundColor': 'rgb(24, 26, 27)' }} >
                <div className="flex items-center">
                  <img className="w-10 h-10 rounded-full mr-4" src="https://randomuser.me/api/portraits/men/1.jpg" alt="User" />
                  <div className="text-lg font-medium text-white">{friendsprofiles[user][0]}</div>
                </div>
                <button onClick={() => setIsOpen(false)} className=" text-white px-3 py-2 rounded-md" style={{ 'backgroundColor': 'rgb(37, 40, 42)' }}>Start Chat</button>
              </div>
            })}


          </div>
        </div>
      )}




      <div className="flex items-center justify-between">
        <div className="text-lg font-medium text-white">WhatsApp 3.0</div>
        <div className="flex items-center">
          <button className=" text-white px-3 py-2 rounded-md" onClick={(e) => {
            e.preventDefault();
            setIsOpenfriends(true);
            // loadallusers();
          }} style={{ 'backgroundColor': 'rgb(37, 40, 42)' }}>New Chat</button>
          <button onClick={(e) => {
            e.preventDefault();
            setIsOpen(true);
            // loadallusers();
          }} className=" text-white px-3 py-2 rounded-md ml-4" style={{ 'backgroundColor': 'rgb(37, 40, 42)' }}>Find Friends</button>
          <button className=" text-white px-3 py-2 rounded-md ml-4" style={{ 'backgroundColor': 'rgb(37, 40, 42)' }}>Stories</button>
          <button className=" text-white px-3 py-2 rounded-md ml-4" style={{ 'backgroundColor': 'rgb(37, 40, 42)' }}>Settings</button>
          <button onClick={(e) => {
            e.preventDefault();
            localStorage.removeItem('user');
            navigate('/loginsignup');
          }} className=" text-white px-3 py-2 rounded-md ml-4" style={{ 'backgroundColor': 'rgb(37, 40, 42)' }}>Logout</button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;