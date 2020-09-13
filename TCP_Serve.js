var net = require('net');

var server = net.createServer(function(socket){
    socket.write('echo server');
    socket.pipe(socket);
});

server.on('connection', function(server) {

    console.log('Entro un nuevo cliente');

    server.on('data', function(message) {
        console.log('Data del cliente: ' + message);
    });

    server.on('end', function(){
        console.log('Se cerro la conexion con el cliente');
    });

    server.on('error', function(error){
        console.log('Error ' + error);
    });
});

server.listen(8080, '192.168.1.56');
console.log('Server Listening on 127.0.0.1:8080');