var socket = io();

window.onload = function() {
    var form = document.getElementById('form');
    var input = document.getElementById('input');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (input.value) {
            // Emitting only the message content since the username is managed server-side
            socket.emit('chat message', input.value);
            input.value = '';
        }
    });

    socket.on('chat message', function(data) {
        var item = document.createElement('li');
        // Checking if data includes username and message
        if(data && data.username && data.message) {
            item.textContent = data.username + ': ' + data.message;
        } else {
            // Fallback text or handling if the expected data format is not received
            // This block might be unnecessary if your server always sends data in the correct format
            item.textContent = "Message format error";
        }
        document.getElementById('messages').appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
    });
};