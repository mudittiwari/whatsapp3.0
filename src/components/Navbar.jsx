import React, { useEffect } from 'react';
import whatsapp3 from '../abis/whatsapp3.json';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';
import { useState } from 'react';
const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
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
    // console.log(accounts);
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
  useEffect(() => {
    // loadWeb3();
    // loadblockchaindata();
  }, [])
  return (

    <header className="bg-white p-6 w-full" style={{ 'backgroundColor': 'rgb(24, 26, 27)' }}>
      


      <div className="flex items-center justify-between">
        <div className="text-lg font-medium text-white cursor-pointer" onClick={(e)=>
        {
          e.preventDefault();
          navigate('/');
        }}>WhatsApp 3.0</div>
        <div className="flex items-center">
          <button className=" text-white px-3 py-2 rounded-md" onClick={(e) => {
            e.preventDefault();
            navigate('/friends')
            // loadallusers();
          }} style={{ 'backgroundColor': 'rgb(37, 40, 42)' }}>New Chat</button>
          <button onClick={(e) => {
            e.preventDefault();
            navigate('/allusers');
            // loadallusers();
          }} className=" text-white px-3 py-2 rounded-md ml-4" style={{ 'backgroundColor': 'rgb(37, 40, 42)' }}>Community</button>
          <button className=" text-white px-3 py-2 rounded-md ml-4" style={{ 'backgroundColor': 'rgb(37, 40, 42)' }}>Stories</button>
          <button className=" text-white px-3 py-2 rounded-md ml-4" style={{ 'backgroundColor': 'rgb(37, 40, 42)' }} onClick={(e)=>{
            e.preventDefault();
            setShowDropdown(!showDropdown)
          }}>Settings</button>
          {showDropdown && (
        <div className="absolute flex flex-col items-start right-0 mr-6 mt-36 z-50 w-48 shadow-xl py-2 rounded-lg" style={{'backgroundColor':'rgb(37, 40, 42)'}}>
          <button onClick={(e) => {
            e.preventDefault();
            navigate('/profile');
          }} className=" text-white px-3 py-2 rounded-md">Profile</button>
          <button onClick={(e) => {
            e.preventDefault();
            localStorage.removeItem('user');
            navigate('/loginsignup');
          }} className=" text-white px-3 py-2 rounded-md">Logout</button>
        </div>
      )}
          
        </div>
      </div>
    </header>
  );
}

export default Navbar;