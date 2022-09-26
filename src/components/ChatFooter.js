import React, { useState } from 'react';

const ChatFooter = ({socket, selected}) => {
    const [message, setMessage] = useState('');
    const [title, setTitle] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem('userName')) {
        socket.emit('message', {
        title: title,
        text: message,
        name: localStorage.getItem('userName'),
        id: `${socket.id}${Math.random()}`,
        socketID: socket.id,
        sendTo: selected.id
      });
    }
      setMessage('');
      setTitle('')
    };
    
  return (
    <div className="chat__footer">
          <form className="form" onSubmit={handleSendMessage}>
              <input
                min={1}
                type="text"
                placeholder="Write title"
                className="message"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
        <input
          type="text"
          placeholder="Write message"
          className="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="sendBtn">SEND</button>
      </form>
    </div>
  );
};

export default ChatFooter;