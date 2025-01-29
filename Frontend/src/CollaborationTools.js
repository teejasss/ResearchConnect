import React, { useState, useEffect, useContext } from 'react';
import Chat from './Chat';
import FileSharing from './FileSharing';
import DiscussionForums from './DiscussionForums';
import { AuthContext } from './AuthContext';
import { io } from 'socket.io-client';

const CollaborationTools = () => {
  const { getCookie } = useContext(AuthContext); // Access the AuthContext
  const [users, setUsers] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [newMessages, setNewMessages] = useState({}); // Track new messages for each user
  const [socket, setSocket] = useState(null);

  // Fetch current user from the cookie
  const currentUser = {
    id: getCookie('user_id'), // Replace 'user_id' with the actual cookie name for the user ID
    first_name: getCookie('first_name') // Replace 'first_name' with the actual cookie name for the user's first name
  };

  // Socket.io connection setup
  useEffect(() => {
    const socketConnection = io('http://localhost:4000'); // Connect to the backend server
    setSocket(socketConnection);

    socketConnection.on('load_chat_history', (chatHistory) => {
      console.log('Chat history loaded:', chatHistory);
    });

    socketConnection.on('receive_new_message', (newMessage) => {
      console.log('New message received:', newMessage);
      setNewMessages((prev) => ({
        ...prev,
        [newMessage.senderId]: true // Mark user as having a new message
      }));
    });

    return () => {
      socketConnection.disconnect();
    };
  }, []);

  useEffect(() => {
    // Fetch the list of users from the API
    fetch('http://localhost:3000/api/users')
      .then((response) => response.json())
      .then((data) => {
        // Filter out the current user from the list
        const filteredUsers = data.filter((user) => user.id !== parseInt(currentUser.id, 10));
        setUsers(filteredUsers);
      })
      .catch((error) => console.error('Error fetching users:', error));
  }, [currentUser.id]);

  const handleChatClick = (user) => {
    setSelectedUser(user);
    setShowChat(true);
  };

  const handleBackClick = () => {
    setShowChat(false);
    setSelectedUser(null);
  };

  const handleSendMessage = (messageContent) => {
    if (socket && selectedUser) {
      const newMessage = {
        senderId: currentUser.id,
        senderFirstName: currentUser.first_name,
        receiverId: selectedUser.id,
        receiverFirstName: selectedUser.first_name,
        message: messageContent,
        timestamp: new Date().toISOString(),
      };
      socket.emit('send_new_message', newMessage);
    }
  };

  return (
    <div className="collaboration-tools container-custom">
      {!showChat ? (
        <div>
          <h2>Users List</h2>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.first_name} {user.last_name}
                {newMessages[user.id] && <span color='red'>  New Message!</span>}
                <button onClick={() => handleChatClick(user)}>Chat</button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <Chat
          senderId={parseInt(currentUser.id, 10)}
          senderFirstName={currentUser.first_name}
          receiverId={selectedUser.id}
          receiverFirstName={selectedUser.first_name}
          showChat={showChat}
          handleBackClick={handleBackClick}
          handleSendMessage={handleSendMessage}
        />
      )}
      <div className="container-custom">
        <div className="row-custom">
          <div className="col-custom-6">
            <FileSharing />
          </div>
          <div className="col-custom-6">
            <DiscussionForums />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollaborationTools;
