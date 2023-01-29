import React, { useEffect } from "react";
import Navbar from "./Navbar";
import whatsapp3 from '../abis/whatsapp3.json';
import { useNavigate } from "react-router-dom";
import Friendscomp from "./Friendscomp";
import { useState } from "react";
import Web3 from 'web3';
function Friends() {
    const navigate = useNavigate();
    const [searchtext,changesearchtext]=useState('');
    const [account, setaccount] = useState('')
    const [contract, setcontract] = useState('')
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
        setaccount(accounts[0])
        const networkId = await web3.eth.net.getId()
        const networkData = whatsapp3.networks[networkId]
        if (networkData) {
            const whatsapp3_ = new web3.eth.Contract(whatsapp3.abi, networkData.address);
            setcontract(whatsapp3_);
            let friends = await whatsapp3_.methods.getfriends(accounts[0]).call();
            let friendsprofile = {};
            await friends.map(async (user) => {
                await whatsapp3_.methods.users(user).call().then(async (usr) => {
                   
                    friendsprofile[`${user}`] = usr;
                })
                setfriendsprofiles(friendsprofile)
               
            })
            

        } else {
            window.alert('whatsapp3 contract not deployed to detected network.')
        }
    }
    useEffect(() => {
        loadWeb3();
        loadblockchaindata();
    }, [])
    // async function loadchange() {
    //     let users = await contract.methods.getusers().call();
    //     let userprofiles = {};
    //     users.map(async (user) => {
    //         await contract.methods.users(user).call().then(async (usr) => {
    //             let friendsrequest = await contract.methods.getfriends_requests(user).call();
    //             friendsrequest = friendsrequest.map((friend) => friend.toLowerCase());
    //             userprofiles[`${user}`] = [usr, friendsrequest];
    //             // console.log(friendsrequest);
    //             // setuserprofiles(userprofiles)
    //         })
    //         setuserprofiles(userprofiles)
    //         let friends = await contract.methods.getfriends(account).call();
    //         let friendsrequest = await contract.methods.getfriends_requests(account).call();
    //         setfriends(friends)
    //         setfriendsrequest(friendsrequest)
    //     })
    //     // console.log(userprofiles)

    // }
    const height = window.innerHeight - 88;
    return (
        <>
            <Navbar />
            
            <main className="flex-1 overflow-y-scroll p-6" style={{ 'backgroundColor': 'rgb(37, 40, 42)', 'height': height }}>
            <input
          type="text"
          placeholder="Search" value={searchtext} onChange={(e)=>{
            e.preventDefault();
            changesearchtext(e.target.value)}}
          className="rounded-lg p-2 my-3 w-56 block mx-auto text-white focus:outline-none focus:shadow-outline-blue" style={{'backgroundColor':'rgb(24, 26, 27)'}}
        />
                {Object.keys(friendsprofiles).map((user) => {
                    // console.log(userprofiles)
                    // console.log(userprofiles[user][1])
                    if (friendsprofiles[user][0].toLowerCase().includes(searchtext.toLowerCase()))
                        return <Friendscomp name={friendsprofiles[user][0]} key={friendsprofiles[user][0]} status={
                            "chat"
                        } contract={contract} account={account} user={user} />
                })
                }
            </main>
        </>
    );
}
export default Friends;