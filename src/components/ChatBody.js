import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatBody = ({ messages, selected }) => {
    const navigate = useNavigate();

  const handleLeaveChat = () => {
      localStorage.removeItem('userName');
      localStorage.removeItem('sessionId')
    navigate('/');
    window.location.reload();
  };

  return (
    <>
      <header className="chat__mainHeader">
              <p>Hangout with { selected.name ? `${selected.name}` : '...' }</p>
              
        <button className="leaveChat__btn" onClick={handleLeaveChat}>
          LEAVE CHAT
        </button>
      </header>

      <div className="message__container">
        {messages.map((message) =>
          message.name === localStorage.getItem('userName') ? (
            <div className="message__chats" key={message.id}>
              <p className="sender__name">You</p>
                <div className="message__sender">
                    <p>Title: {message.title}</p>
                <p>{message.text}</p>
              </div>
            </div>
          ) : (
            <div className="message__chats" key={message.id}>
              <p>{message.name}</p>
                    <div className="message__recipient">
                        <p>Title: {message.title}</p>
                <p>{message.text}</p>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default ChatBody;