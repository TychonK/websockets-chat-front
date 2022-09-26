import React, { useState, useEffect } from 'react';

import { ReactSearchAutocomplete } from 'react-search-autocomplete'

import { useNavigate }  from 'react-router-dom';


const ChatBar = ({ socket, selectUser }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        socket.on('newUserResponse', (data) => {
            const arr = data.map(user => {
                const obj = {
                    name: user.userName,
                    id: `${user.socketID}` 
                }
                return obj
            })
            setUsers(arr)
        });
    }, [socket, users]);
    

  const handleOnSearch = (string, results) => {
    console.log(string, results)
  }

  const handleOnHover = (result) => {
    console.log(result)
  }

  const handleOnSelect = (item) => {
      console.log(item)
      selectUser(item)
  }

  const handleOnFocus = () => {
    console.log('focused')
  }

  const formatResult = (item) => {
    return (
      <>
        <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
      </>
    )
  }

  return (
    <div className="chat__sidebar">
      <h2>Open Chat</h2>
      <div>
        <h4 className="chat__header">ACTIVE USERS</h4>
            
        <div style={{ width: 200 }}>
          <ReactSearchAutocomplete
            items={users}
            onSearch={ handleOnSearch }
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}
            autoFocus
            formatResult={formatResult}
          />
        </div>
              
        <div className="chat__users">
          {users.map((user) => (
            <p key={user.id}>{user.name}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBar;