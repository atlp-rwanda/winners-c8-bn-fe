import React, { useState, useEffect } from 'react';
import "./chat.css";
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProfile } from '../../redux/actions/userProfileAction';
import { chatSent, typingStatus } from '../../redux/actions/chatActions';

const ChatFooter = ({socket}) => {
  const [message, setMessage] = useState('');
  const [allowSend, setallowSend] = useState(true)
 // state
 const { user } = useSelector((state) => {
  return {
    user: state.userProfile?.user.user,
  };
});

const dispatch = useDispatch()
useEffect(() => {
  fetchUserProfile()(dispatch);
}, []);


  const handleSendMessage = (e) => {
    e.preventDefault();
    
    socket.emit("chat", {
      message: message,
      sender: user.firstName,
      createdAt: new Date(),
      postedBy: user.id
    });
    setMessage('');
    dispatch(chatSent())
    
  };

  const handleChattingStatus = ()=>{
    socket.emit("typing", user.firstName);
    setallowSend(false)
  }

  return (
    <div className="chat__footer">
      <form className="form" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onKeyPress={handleChattingStatus}
          onChange={(e) => {setMessage(e.target.value)}}
          
        />
        <button className="sendBtn btn" disabled={allowSend}>SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;
