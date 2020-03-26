$(function(){
    var socket = io.connect('http://localhost:3000')

    var message = $("#message")
	var username = $("#username")
	var send_message = $("#send_message")
	var send_username = $("#send_username")
	var chatroom = $("#chatroom")
	var feedback = $("#feedback")
    username.keypress(function(event) { 
        if (event.keyCode === 13) { 
            send_username.click(); 
        } 
    }); 

    message.keypress(function(event) { 
        if (event.keyCode === 13) { 
            send_message.click(); 
        } 
    }); 

    send_username.click(() => {
        console.log(username.val())
        socket.emit('change_username', {username: username.val()})
        username.val('')
    })

    send_message.click(() => {
        socket.emit('new_message', {message: message.val()})
        message.val('')
    })

    socket.on('new_message', (data) => {
        chatroom.append("<p class='message'>" + data.username + ": " + data.message+ "</p>" )
        feedback.html("")
    })

    message.bind('keypress', () => {
        socket.emit('typing')
    })

    message.bind('blur', () => {
        socket.emit('left')
    })

    socket.on('typing', (data) => {
        feedback.html(" <p><i> " + data.username + " is typing..."+"</i></p>")
    }) 

    socket.on('left', (data) => {
        feedback.html("")
    })



})