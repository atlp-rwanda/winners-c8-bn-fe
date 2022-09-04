import React, { useEffect, useState } from 'react';
import "./chat.css";

const ChatBar = ({socket}) => {
  const [users, setUsers] = useState([])
  const [countOnline, setCountOnline] = useState(0)

  useEffect(()=>{
    socket.on('online', data=>{
      setCountOnline(data)
      // setCountOnline(data)
    })
    socket.on("disconnect", data=>{
      console.log('disconnect', data)
    })
  }, [socket])

  return (
    <div className="chat__sidebar">
      <div>
        <h4 className="chat__header">ACTIVE USER{countOnline > 1 ? "S" : ""} {countOnline}</h4>
        <div className="chat__users">
            {/* listing all online users */}

        </div>
        </div>        
    </div>
  );
};

export default ChatBar;
