import React from 'react';
import '../../../public/styles/Home/quickChat.scss';
import profilePic from '../../../public/images/landing_page.png';
import AssistantIcon from '@mui/icons-material/Assistant';

function QuickChat() {
  return (
    <section className="quick-chat">
      <div className="chat-profile">
        <img src={profilePic} alt="Profile" />
      </div>

      <div className="chat-body">
        <div className="chat-content">
          <header>Welcome in the society!</header>
          <span>
            If you have any question about our services, feel free to contact
            us.
          </span>
        </div>
        <div className="chat-btn">
          <span>Chat with us</span>
          <AssistantIcon fontSize="inherit" />
        </div>
      </div>
    </section>
  );
}

export default QuickChat;
