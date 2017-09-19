const path = require('path');
const express = require('express');
const http = require('http');
const socketIO = require('socket.io');


const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, '../public');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

// console.log(publicPath);

io.on('connection', (socket) => {
	console.log('new user connected');

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

	socket.on('createMessage', (messg) => {
		console.log('create Message', messg)
		io.emit('newMessage', {
			from: messg.from,
			text: messg.text,
			createdAt: new Date().getTime()
		});
	});

	socket.on('disconnect', () => {
		console.log('user was disconnect');  
	});
});


server.listen(port, ()=>{
	console.log(`server starts running on port ${port}`);
});