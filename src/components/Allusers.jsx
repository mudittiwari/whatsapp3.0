import React, { useEffect } from "react";
import Navbar from "./Navbar";
import whatsapp3 from '../abis/whatsapp3.json';
import { useNavigate } from "react-router-dom";
import Alluserscomp from "./Alluserscomp";
import { useState } from "react";
import Web3 from 'web3';
function Allusers() {
    const [count, setCount] = useState(0);
    const navigate = useNavigate();
    const [account, setaccount] = useState('')
    const [contract, setcontract] = useState('')
    const [isOpen, setIsOpen] = useState(false);
    const [isOpenfriends, setIsOpenfriends] = useState(false);
    const [userprofiles, setuserprofiles] = useState({})
    const [friends, setfriends] = useState([])
    const [friendsrequest, setfriendsrequest] = useState([])
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
        setaccount(accounts[0])
        const networkId = await web3.eth.net.getId()
        const networkData = whatsapp3.networks[networkId]
        if (networkData) {
            const whatsapp3_ = new web3.eth.Contract(whatsapp3.abi, networkData.address);


            setcontract(whatsapp3_);
            let users = await whatsapp3_.methods.getusers().call();
            let userprofiles = {};
            users.map(async (user) => {
                await whatsapp3_.methods.users(user).call().then(async(usr) => {
                    let friendsrequest=await whatsapp3_.methods.getfriends_requests(user).call();
                    friendsrequest=friendsrequest.map((friend)=>friend.toLowerCase());
                    userprofiles[`${user}`] = [usr,friendsrequest];
                    // console.log(friendsrequest);
                    setuserprofiles(userprofiles)
                })
            })
            let friends = await whatsapp3_.methods.getfriends(accounts[0]).call();
            let friendsrequest = await whatsapp3_.methods.getfriends_requests(accounts[0]).call();
            setfriends(friends)
            setfriendsrequest(friendsrequest)
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
        console.log("mudit tiwari")
        loadWeb3();
        loadblockchaindata();
    }, [count])
    const height = window.innerHeight - 88;
    return (
        <>
            <Navbar />
            <main className="flex-1 overflow-y-scroll p-6" style={{ 'backgroundColor': 'rgb(37, 40, 42)', 'height': height }}>
                {Object.keys(userprofiles).map((user) => {
                    console.log(userprofiles[user][0][0])
                    // console.log(userprofiles[user][1])
                    if(user.toLowerCase()!=account.toString().toLowerCase())
                    return <Alluserscomp name={userprofiles[user][0][0]} key={userprofiles[user][0][0]} status={
                        friends.includes(user) ? "Friends" : friendsrequest.includes(user) ? "Friend Request Sent" :userprofiles[user][1].includes(account.toString().toLowerCase())?"Accept Friend Request":"Add Friend"
                    } contract={contract} account={account} user={user} changecount={setCount} />
                })
                }
            </main>
        </>
    );
}
export default Allusers;