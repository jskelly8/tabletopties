var socket = io();

window.onload = function() {
    var form = document.getElementById('form');
    var input = document.getElementById('input');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (input.value) {
            socket.emit('chat message', input.value);
            input.value = '';
        }
    });

    socket.on('chat message', function(data) {
        var item = document.createElement('li');
        if(data && data.username && data.message) {
            var userLink = document.createElement('a');
            userLink.setAttribute('href', `/users/${data.userId}`);
            userLink.textContent = data.username;
    
            item.appendChild(userLink);
            item.appendChild(document.createTextNode(': ' + data.message));
        } else {
            item.textContent = "Message format error";
        }
        document.getElementById('messages').appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
    });
};