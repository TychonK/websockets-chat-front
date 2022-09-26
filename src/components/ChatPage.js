import React, { useEffect, useState } from 'react';
import ChatBar from './ChatBar';
import ChatBody from './ChatBody';
import ChatFooter from './ChatFooter';

import { useNavigate } from 'react-router-dom';

const ChatPage = ({ socket }) => {
  const [messages, setMessages] = useState([]);

    const [selectedUser, setUser] = useState({});

    const selectUser = (user) => {
        if (user == selectedUser) {
            return
        }
        setUser(user)
    }

  useEffect(() => {
      socket.on('messageResponse', (data) => setMessages([...messages, data]));
  }, [socket, messages]);


  return (
    <div className="chat">
      <ChatBar socket={socket} selectUser={selectUser} />
      <div className="chat__main">
        <ChatBody messages={messages} selected={ selectedUser } />
        <ChatFooter socket={socket} selected={ selectedUser }/>
      </div>
    </div>
  );
};

export default ChatPage;