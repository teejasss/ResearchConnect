import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

// Establish a socket connection with the server
const socket = io('http://localhost:4000'); // Update this to your server's address if needed

const Chat = ({ senderId, senderFirstName, receiverId, receiverFirstName, handleBackClick }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    // Debugging log for socket connection
    console.log('Connecting to the socket server...');
    socket.on('connect', () => {
      console.log('Socket connected:', socket.id); // This confirms connection
    });

    // Fetch chat history as soon as the component mounts
    socket.emit('request_chat_history', { senderId, receiverId });

    // Listen for chat history from the server when sent by the server
    socket.on('load_chat_history', (history) => {
      console.log('Received chat history:', history);
      const filteredMessages = history.filter(
        (msg) =>
          (msg.senderId === senderId && msg.receiverId === receiverId) ||
          (msg.senderId === receiverId && msg.receiverId === senderId)
      );
      console.log('Filtered messages:', filteredMessages);
      setMessages(filteredMessages);
    });

    // Listen for new messages from the server
    socket.on('receive_new_message', (newMessage) => {
      console.log('Received new message:', newMessage);
      if (
        (newMessage.senderId === senderId && newMessage.receiverId === receiverId) ||
        (newMessage.senderId === receiverId && newMessage.receiverId === senderId)
      ) {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      }
    });

    // Clean up the socket listeners on unmount
    return () => {
      socket.off('load_chat_history');
      socket.off('receive_new_message');
    };
  }, [receiverId, senderId]); // This will re-run if senderId or receiverId changes

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const newMessage = {
        senderId,
        receiverId,
        text: input,
        sender: senderFirstName,
        receiver: receiverFirstName,
      };
      // Send the new message to the server
      socket.emit('send_new_message', newMessage);
      setInput(''); // Clear the input after sending
    }
  };

  return (
    <div className="chat-container">
      <button onClick={handleBackClick} className="btn-back">
        Back to Users
      </button>
      <h2>Chat with {receiverFirstName}</h2>
      <div className="chat-window">
        {messages.length === 0 ? (
          <div className="chat-empty">No messages yet. Start the conversation!</div>
        ) : (
          messages.map((msg, index) => (
            <div 
            key={index} 
            className={`chat-message ${msg.senderId === senderId ? 'current-user' : 'receiver'}`}
          >
            <div className="chat-bubble">{msg.sender}: {msg.text}</div>
              {/* <span className={`chat-bubble ${msg.senderId === senderId ? 'current-user' : 'receiver'}`}></span> {msg.text} */}

            
            
          </div>
          
          ))
        )}
      </div>
      <form onSubmit={handleSendMessage} className="chat-input-form">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message"
          required
          className="form-control-custom"
        />
        <button type="submit" className="btn-custom">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
