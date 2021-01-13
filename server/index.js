/* Esto es un llamado a las dependencias y librerias  */
let express = require('express'); /* esto es un modulo que ya instalamos en consola */
let app = express();
let server = require('http').Server(app);
let io = require('socket.io')(server);



let messages = [{
    id: 1,

    text: 'Bienvenido al Chat 😎',
    nickname: 'Bot - Alice 🤖 '
}];

/* abrir conexion a socket, saber desde donde se conecta */
io.on('connection', function (socket) {
    console.log("El cliente con IP:" + socket.handshake.address + " se ha conectado");
    socket.emit('messages', messages);

    /* recogiendo mensaje */
    socket.on('add-message', function (data) {
        messages.push(data); /* va guardando en el array */

        io.sockets.emit('messages', messages)
    })
});


/* -------------- */

/* servidor basico, express */
server.listen(6677, function () {
    console.log('Servidor esta funcionando en http://localhost:6677');
});

/* ruta de HOLA MUNDO: para verlo debes incluirle a la ruta /hola-mundo */
app.get('/hola-mundo', function (req, res) {
    res.status(200).send('Hola mundo desde una ruta');
});

/* decirle que HTML tiene acceso */
app.use(express.static('client'))
/* entre parentesis pones la carpeta en la que tienes el html */

