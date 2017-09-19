var socket = io();

socket.on('connect', function () {
	console.log('connected to server');

	// socket.emit('createEmail', {
	// 	to: 'ted@gmail.com',
	// 	text: 'hello nani'
	// });

	// socket.emit('createMessage',{
	// 	from: 'nani040',
	// 	text: 'its working fine'
	// });
});

socket.on('disconnect', function () {
	console.log('Disconnected from server');
});

// socket.on('newEmail', function(email){
// 	console.log('new Email', email);
// });

socket.on('newMessage', function (message){
	console.log('new Message', message);
	var li = jQuery('<li></li>');
	li.text(`${message.from}: ${message.text}`);

	jQuery('#messages').append(li);
});

// socket.emit('createMessage', {
// 	from: 'frank',
// 	text: 'hello...'
// }, function(data){
// 	console.log('Got it',data);
// });

jQuery('#message-form').on('submit', function(e) {
	e.preventDefault();

	socket.emit('createMessage', {
		from: 'user',
		text: jQuery('[name=message]').val()
	}, function(){

	});
});