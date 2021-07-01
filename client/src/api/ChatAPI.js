import React, {useState, useEffect} from 'react';
import axios from 'axios';

export default function ChatAPI(token) {
    const [chatRooms, setChatRooms] = useState([]);

    useEffect(() => {
      if(token){
        const getChatRoom = async () => {
          try {
            const res = await axios.get("/rooms", {
              headers: {
                Authorization: token,
              },
            });
            setChatRooms(res.data.rooms);
            console.log(res.data.rooms);
          } catch (error) {
            console.log(error);
          }
        };
        getChatRoom();
      }
    }, [token]);

    return {
      chatRooms: [chatRooms, setChatRooms],
    };
}
