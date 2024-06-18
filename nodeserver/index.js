const io = require('socket.io')(3000);
const users = {};

io.on('connection', socket => {
  socket.on('new-user-joined', name => {
    console.log("new user", name);
    users[socket.id] = name;
    socket.broadcast.emit('user-joined', name);
  });

  socket.on('send', message => {
    socket.broadcast.emit('receive', { message: message, user: users[socket.id] });
  });

  socket.on('disconnect', () => {
    const name = users[socket.id];
    delete users[socket.id];
    socket.broadcast.emit('user-left', name);
  });
});
