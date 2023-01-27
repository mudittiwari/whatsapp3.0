import React, { useEffect, useState } from 'react';
import whatsapp3 from '../abis/whatsapp3.json';
import { useNavigate } from 'react-router-dom';
import Web3 from 'web3';
const LoginSignup = () => {
  const navigate=useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [account, setaccount] = useState('')
  const [contract, setcontract] = useState('')
  const [name, changeName] = useState('')

  const handleToggle = () => {
    setIsLogin(!isLogin);
  }
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

    } else {
      window.alert('whatsapp3 contract not deployed to detected network.')
    }
  }
  async function signup() {
    await contract.methods.add_user(account, name, "no image", "no seen").send({ from: account }).on('receipt', function (receipt) {
      console.log(receipt);
    });
  }
  async function login() {
    let users=await contract.methods.getusers().call();
    users.map(async(user)=>{
      if(user.toLowerCase()==account.toString().toLowerCase()){
        let usr=await contract.methods.users(account).call();
        if(usr.name==name){
          localStorage.setItem('user',usr);
          navigate('/');
        }
      }
    })
  }




  useEffect(() => {
    loadWeb3();
    loadblockchaindata();
  }, []);

  return (
    <div className=" min-h-screen flex justify-center items-center" style={{ 'backgroundColor': 'rgb(37, 40, 42)' }}>
      <div className="w-full max-w-sm">
        <form className=" p-6 rounded-lg shadow-md" style={{ 'backgroundColor': 'rgb(24, 26, 27)' }}>
          <h1 className="text-lg text-white font-medium mb-4 text-center ">{isLogin ? 'Login' : 'Signup'}</h1>
          {isLogin ? (
            <div>
              <label className="block mb-2 text-white">
                Username
                <input type="text" onChange={(e) => {
                  e.preventDefault();
                  changeName(e.target.value);
                }} className="form-input mt-1 block w-full text-black" />
              </label>

            </div>
          ) : (
            <div>
              <label className="block mb-2 text-white">
                Username
                <input onChange={(e) => {
                  e.preventDefault();
                  changeName(e.target.value);
                }} type="text" className="form-input mt-1 block w-full text-black" />
              </label>

            </div>
          )}
          <button type="button" className=" text-white px-3 py-2 rounded-md mt-5" onClick={async(e)=>{
            e.preventDefault();
            
            if(!isLogin){
              await signup();
            }
            else
            {
              await login();
            }
          }} style={{ 'backgroundColor': 'rgb(37, 40, 42)' }}>
            {isLogin ? 'Login' : 'Signup'}
          </button>
          <button type="button" className=" text-white px-3 py-2 rounded-md ml-5 mt-5" onClick={handleToggle} style={{ 'backgroundColor': 'rgb(37, 40, 42)' }}>
            {isLogin ? 'Signup' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginSignup;
