var socket = io();

socket.on('connect', function () {
	console.log('connected to server');

	// socket.emit('createEmail', {
	// 	to: 'ted@gmail.com',
	// 	text: 'hello nani'
	// });

	socket.emit('createMessage',{
		from: 'nani040',
		text: 'its working fine'
	});
});

socket.on('disconnect', function () {
	console.log('Disconnected from server');
});

// socket.on('newEmail', function(email){
// 	console.log('new Email', email);
// });

socket.on('newMessage', function (messg){
	console.log('new Message', messg);
});