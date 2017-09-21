const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const {generateMessage, generateLocationMessage} = require('./utils/message');
const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

// console.log(publicPath);

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined'));

  socket.on('createMessage', (message) => {
    console.log('createMessage', message);
    io.emit('newMessage', generateMessage(message.from, message.text));
    
	});


  socket.on('createLocationMessage', (coords) => {
  	io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });
	// socket.emit('newEmail', {
	// 	from: 'nani040@gmail.com',
	// 	text: 'hi hello ted!',
	// 	createdAt: 123
	// });

	// socket.emit('newMessage', {
	// 	from: 'teddy',
	// 	text: 'im here only'
	// });

	// socket.on('createEmail', (email) => {
	// 	console.log('create Email', nani);
	// });

	// socket.emit('newMessage', {
	// 	from: 'Admin',
	// 	text: 'welcome to chat app'
	// });

	// socket.broadcast.emit('newMessage', {
	// 	from: 'admin',
	// 	text: 'new user join'
	// })

	// socket.on('createMessage', (messg) => {
	// 	console.log('create Message', messg)
	// 	// io.emit('newMessage', {
	// 	// 	from: messg.from,
	// 	// 	text: messg.text,
	// 	// 	createdAt: new Date().getTime()
	// 	// });
	// 	// socket.broadcast.emit('newMessage', {
	// 	// 	from: messg.from,
	// 	// 	text: messg.text,
	// 	// 	createdAt: new Date().getTime()
	// 	// });
	// });

	socket.on('disconnect', () => {
		console.log('user was disconnect');  
	});
});


server.listen(port, ()=>{
	console.log(`server starts running on port ${port}`);
});