const io = require('socket.io')(3000);


const socket = ('http://localhost:3000');

io.on('connection', (socket) => {
  console.log('A user connected');
  // Handle events here
  socket.on('disconnect', () => {
      console.log('A user disconnected');
  });
});

const form = document.getElementById('chat-form');  
const messageInput = document.getElementById('msg');
const messageContainer = document.querySelector('.card-body'); 

const append = (message, position) => {
  const messageElement = document.createElement('div');
  messageElement.innerText = message;
  messageElement.classList.add('message', position);
  messageContainer.append(messageElement);
  messageContainer.scrollTop = messageContainer.scrollHeight; 
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value;
  append(`You: ${message}`, 'right');
  socket.emit('send', message);
  messageInput.value = '';
});

const name = prompt('Enter your name to join');
socket.emit('new-user-joined', name);

socket.on('user-joined', (name) => {
  append(`${name} joined the chat`, 'right');
});

socket.on('receive', (data) => {
  append(`${data.user}: ${data.message}`, 'left');
});

socket.on('user-left', (name) => {
  append(`${name} left the chat`, 'left');
});
