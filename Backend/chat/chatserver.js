const expressApp = require('express');
const httpServer = require('http');
const corsMiddleware = require('cors');
const fsModule = require('fs');
const { Server: SocketServer } = require('socket.io');

const app = expressApp();

app.use(corsMiddleware());

// Path to save chat data
const CHAT_DATA_FILE = './chatHistory.json';

// Initialize chat history
let chatHistory = [];

// Ensure the chat history file exists and is initialized correctly
if (!fsModule.existsSync(CHAT_DATA_FILE)) {
  // Create the file with an empty array if it doesn't exist
  fsModule.writeFileSync(CHAT_DATA_FILE, JSON.stringify([]));
} else {
  try {
    const data = fsModule.readFileSync(CHAT_DATA_FILE, 'utf-8');
    chatHistory = data.trim() ? JSON.parse(data) : [];
  } catch (err) {
    console.error('Error loading chat history:', err);
    // Reinitialize the file if JSON parsing fails
    fsModule.writeFileSync(CHAT_DATA_FILE, JSON.stringify([]));
    chatHistory = [];
  }
}

// Function to save chat history to file
const storeChatHistory = () => {
  try {
    fsModule.writeFileSync(CHAT_DATA_FILE, JSON.stringify(chatHistory, null, 2));
  } catch (err) {
    console.error('Error saving chat history:', err);
  }
};

// Create HTTP server and set up Socket.IO
const serverInstance = httpServer.createServer(app);
const socketIO = new SocketServer(serverInstance, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

// Handling socket connections
socketIO.on('connection', (socketInstance) => {
  console.log(`New connection established: ${socketInstance.id}`);

  // Send the entire chat history when a client connects
  socketInstance.emit('load_chat_history', chatHistory);

  // Listen for incoming messages from users
  socketInstance.on('send_new_message', (newMessage) => {
    console.log('Received new message:', newMessage);

    // Add the new message to chat history
    chatHistory.push(newMessage);
    // Save updated history to the file
    storeChatHistory();

    // Broadcast the message to all connected clients (including the sender)
    socketIO.emit('receive_new_message', newMessage);

    // Emit a notification that a new message was received (for handling notifications)
    socketInstance.broadcast.emit('newMessage', { senderId: newMessage.senderId });
  });

  // Listen for requests to fetch filtered chat history
  socketInstance.on('request_chat_history', ({ senderId, receiverId }) => {
    console.log(`Fetching chat history for sender: ${senderId}, receiver: ${receiverId}`);
    
    // Filter chat history for the specific sender and receiver
    const filteredHistory = chatHistory.filter(
      (msg) =>
        (msg.senderId === senderId && msg.receiverId === receiverId) ||
        (msg.senderId === receiverId && msg.receiverId === senderId)
    );

    // Send the filtered history back to the client
    socketInstance.emit('load_chat_history', filteredHistory);
  });

  // Handle client disconnection
  socketInstance.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
serverInstance.listen(4000, () => {
  console.log('Server running on port 4000');
});
