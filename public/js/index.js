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

socket.on('newLocationMessage', function(message){
	var li = jQuery('<li></li>');
	var a = jQuery('<a target="_blank">MY Current Location</a>');

	li.text(`${message.from}: `);
	a.attr('href', message.url);
	li.append(a);
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


var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
	if (!navigator.geolocation){
		return alert('geolocation not supported by your browser.');
	}

	navigator.geolocation.getCurrentPosition(function (position) {
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});

	}, function(){
		alert('unable to tetch location.');
	});

});