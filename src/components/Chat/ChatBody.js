import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import "./chat.css";
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProfile } from '../../redux/actions/userProfileAction';
import axiosInstance from '../../helpers/http';

const ChatBody = ({socket}) => {
  const navigate = useNavigate();
  const handleLeaveChat = () => {
    socket.on("disconnect")
    // localStorage.removeItem('auth-token');
    navigate('/dashboard');

  
  };

  // state
  const { user, chat } = useSelector((state) => {
    return {
      user: state.userProfile?.user.user,
      chat: state.chat
    };
  });
  
  const dispatch = useDispatch()
    useEffect(() => {
      fetchUserProfile()(dispatch);
  }, [socket]);
  
const [myAllChats, setAllChats] = useState([]);
const [typer, setTyper] = useState('');

useEffect(()=>{
  const allChats = async()=>{
    const chats = await axiosInstance.get('users/chats');
    console.log(chats.data.chats)
    setAllChats(chats.data.chats)
  }
  allChats ()
  
}, [chat.isChatSent])
  
 useEffect(() => {
  socket.on("chat",  function(data) {
    setAllChats((state)=>[
      ...state,
      data
    ]) 
  });
 }, []);

 useEffect(()=>{
  socket.on("typing",(data)=>{
    setTyper(`${data} is typing...`)
  });
 }, [])


  return (
    <>
      <header className="chat__mainHeader">
        <p>Chat With Others</p>
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>

      {/*This shows messages sent from you*/}
      <div className="message__container">
                {!myAllChats && (<div className='loader'>loading</div>)}
                {user && myAllChats.map((message, index)=>(
                  <div className="message__chats" key={index}>
                  <>
                    <p className= {message.postedBy === user.id  ? "sender__name" : "recipient__name"}>{message.sender}</p>
                    <div className={message.postedBy === user.id  ? "message__sender" : "message__recipient" }>
                          <p>{message.message}</p>
                          <p>posted:{message.postedBy}</p>
                          <p>{message.createdAt}</p>
                        
                    </div>
                  </>
                </div>
                )
                  
                )}


        {/*This is triggered when a user is typing*/}
        <div className="message__status">
          {!chat.isChatSent && (
            <p>{typer}</p>
          ) }
          
        </div>
      </div>
    </>
  );
};

export

 default ChatBody;

