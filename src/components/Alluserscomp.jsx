import React from "react";

function Alluserscomp(props)
{
    
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
                  if(props.status=='Add Friend')
                  {
                    await props.contract.methods.add_friend_request(props.account,props.user).send({ from: props.account }).on('receipt', function (receipt) {
                        console.log(receipt);
    
                        props.changecount(Math.random()*100)
                      });
                  }
                    else if(props.status=='Friends')
                    {
                        await props.contract.methods.remove_friend(props.account,props.user).send({ from: props.account }).on('receipt', function (receipt) {
                            console.log(receipt);
        
                            props.changecount(Math.random()*100)
                          });
                    }
                    else if(props.status=='Accept Friend Request')
                    {
                        await props.contract.methods.accept_friend_request(props.user,props.account).send({ from: props.account }).on('receipt', function (receipt) {
                            console.log(receipt);
                            props.changecount(Math.random()*100)
                          });
                    }
                    else
                    {
                        await props.contract.methods.reject_friend_request(props.account,props.user).send({ from: props.account }).on('receipt', function (receipt) {
                            console.log(receipt);
        
                            props.changecount(Math.random()*100)
                          });
                    }
                }} className=" text-white px-3 py-2 rounded-md" style={{ 'backgroundColor': 'rgb(37, 40, 42)' }}>{props.status}</button>
            </div>
            {/* <div className="bg-gray-200 rounded-lg p-4 mb-4">
                <div className="text-sm text-gray-600">I'm good, how about you?</div>
            </div> */}
        </div>
        </>
    );
}
export default Alluserscomp