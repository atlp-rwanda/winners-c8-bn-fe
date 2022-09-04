import React, { useEffect } from 'react';
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';
import "./chat.css";
import axiosInstance from '../../helpers/http';
import {io} from 'socket.io-client';

const ChatPage = () => {
  
  const connectingSocket = () => {
    const socket = io(process.env.BACKEND_SOCKET_URL, {
      transports: ['websocket'],
      auth: {
        token:localStorage.getItem('auth-token'),
      },
    });
  
    console.log('$$$$$$$44', socket);
    
    return socket;
  };

  return (
    <div className="chat">
      <ChatBar socket={connectingSocket()}/>
      <div className="chat__main">
        <ChatBody socket={connectingSocket()} />
        <ChatFooter socket={connectingSocket()} />
      </div>
    </div>
  );
};

export default ChatPage;
