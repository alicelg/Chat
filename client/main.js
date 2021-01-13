let socket = io.connect('http://192.168.1.13:6677', { 'forceNew': true });
/* veo que me conecto */

socket.on('messages', function (data) {
    console.log(data);
    render(data);
});

function render(data) {
    let html = data.map(function (message, index) {
        return (` 
        <div class="message">
           
            <strong class= "text-danger">${message.nickname}:</strong>
            <p class= "text-secondary ml-3 mt-2">${message.text}</p>
        </div>
         `);
    }).join('');


    /* automaticamente el foco se queda abajo, se actualiza en cada mensaje */
    let div_msgs = document.getElementById('messages');
    div_msgs.innerHTML = html;
    div_msgs.scrollTop = div_msgs.scrollHeight;
}

/* saco los valores que tienen los elementos */

function addMessage(event) {
    let message = {
        nickname: document.getElementById('nickname').value,
        text: document.getElementById('text').value,

    };

    document.getElementById('nickname').style.display = 'none';

    socket.emit('add-message', message);
    return false;
}