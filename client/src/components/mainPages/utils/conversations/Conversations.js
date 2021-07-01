import axios from 'axios';
import React, { useEffect, useState } from 'react'
import './Conversations.css'
import Avatar from './peacedp.png'

export default function Conversations({chatRoom, currentUser}) {
  const [seller, setSeller] = useState(null);
  // useEffect(() => {
  //   const friendId = conversation.members.find((id) => id !== currentUser._id);
  //   const getUser = async () => {
  //     try {
  //       const res = await axios("/user/"+ friendId);
  //       setuser(res.data)
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getUser()
  // }, [currentUser, conversation]);
  useEffect(() => {
    const sellerInfo = chatRoom.membersInfo.find((member) => member._id !== currentUser._id);
    setSeller(sellerInfo.name);
  }, [])
    return (
      <div className="conversation">
        {/* <img
          src={Avatar}
          alt="dp"
          className="dp"
        /> */}
        <span className="name">{seller}</span>
      </div>
    );
}
// {
//   user?.name;
// }
// 3d44311a528a4c9299baafadf9070010
// 3d44311a528a4c9299baafadf9070010