pragma solidity ^0.8.15;
// functionalities
// 1. user can send message to another user
// 2. user can find other users using search option
// 3. user can add his/her stories
// 4. user can see other users stories
// 5. user can see other users profile

// user mapping information
// 1. array of friends
// 2. array of stories
// 3. mapping of messages having key as other user address and value having array of structure having message, date, time, seen_status
// 4. profile information like name, profile picture, last seen, etc


contract whatsapp3
{
    address[] public users_addresses;
    struct Message
    {
        string message;
        string date;
        string time;
        bool seen_status;
    }
    
    struct profile
    {
        string name;
        string profile_picture;
        string last_seen;
    }
    
    struct user
    {
        address[] friends;
        string[] stories;
        mapping(address => Message[]) messages;
        profile profile;
    }
    
    mapping(address => user) public users;

    event user_added(address user_address, string name, string profile_picture, string last_seen,address author);
    function add_user(address user_address, string memory name, string memory profile_picture, string memory last_seen) public
    {
        users[user_address].profile.name = name;
        users[user_address].profile.profile_picture = profile_picture;
        users[user_address].profile.last_seen = last_seen;
        users_addresses.push(user_address);
        emit user_added(user_address, name, profile_picture, last_seen,msg.sender);
    }
    function add_friend(address user_address, address friend_address) public
    {
        users[user_address].friends.push(friend_address);
    }
    function remove_friend(address user_address, address friend_address) public
    {
        for(uint i=0; i<users[user_address].friends.length; i++)
        {
            if(users[user_address].friends[i] == friend_address)
            {
                users[user_address].friends[i] = users[user_address].friends[users[user_address].friends.length-1];
                users[user_address].friends.pop();
                break;
            }
        }
    }
    function add_story(address user_address, string memory story) public
    {
        users[user_address].stories.push(story);
    }
    function add_message(address user_address, address friend_address, string memory message_, string memory date, string memory time, bool seen_status) public
    {
        users[user_address].messages[friend_address].push(Message(message_, date, time, seen_status));
    }
    function getmessages(address user_address, address friend_address) public view returns(Message[] memory)
    {
        return users[user_address].messages[friend_address];
    }
    function getfriends(address user_address) public view returns(address[] memory)
    {
        return users[user_address].friends;
    }
    function getstories(address user_address) public view returns(string[] memory)
    {
        return users[user_address].stories;
    }

    function search_user(address user_address, string memory name) public view returns(address[] memory)
    {
        address[] memory friends = users[user_address].friends;
        address[] memory result = new address[](friends.length);
        uint count = 0;
        for(uint i=0; i<friends.length; i++)
        {
            if(keccak256(abi.encodePacked(users[friends[i]].profile.name)) == keccak256(abi.encodePacked(name)))
            {
                result[count] = friends[i];
                count++;
            }
        }
        return result;
    }

    //write a function to search for new friends using name in users addresses array
    function search_new_friends(string memory name) public view returns(address[] memory)
    {
        address[] memory result = new address[](users_addresses.length);
        uint count = 0;
        for(uint i=0; i<users_addresses.length; i++)
        {
            if(keccak256(abi.encodePacked(users[users_addresses[i]].profile.name)) == keccak256(abi.encodePacked(name)))
            {
                result[count] = users_addresses[i];
                count++;
            }
        }
        return result;
    }
    function getusers() public view returns(address[] memory)
    {
        return users_addresses;
    }


    

   
}