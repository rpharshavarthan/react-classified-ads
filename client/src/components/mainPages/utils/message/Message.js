import React from 'react'
import './Message.css'
import {format} from 'timeago.js'

export default function Message({message, own}) {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]; 
    const date = new Date(message.createdAt)
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const day = date.getDay()
    return (
      <div className={own ? "message own" : "message"}>
        <div className="messageTop">
          {own ? (
            ""
          ) : (
            <img
              className="messageImg"
              src="https://www.dpswhatsapp.com/sad-dps/dps/alone-boy-dp.jpeg"
              alt=""
            />
          )}
          <p className="messageTxt">{message.message}</p>
        </div>
        {/* <div className="messageBottom">{format(message.createdAt)}</div> */}
        <div
          title="hello"
          className="messageBottom"
        >{`${days[day]}, ${hours}:${minutes}`}</div>
      </div>
    );
}
