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

function header(sourcePort, destinationPort, sequenceNumber, acknowNumber) {
    var headerFormat = '';


    function ToHex(str) {
        var arr = [];
        for (var i = 0, l = str.length; i < l; i++) {
            var hex = Number(str.charCodeAt(i)).toString(16);
            arr.push(hex);
        }
        return arr.join('');
    }

    function complement(number, length) {

        var my_string = '' + number;
        while (my_string.length < length) {
            my_string = '0' + my_string;
        }

        return my_string;

    }

    headerFormat = ToHex(sourcePort);
    headerFormat += ToHex(destinationPort);
   

    if(typeof(sequenceNumber) == 'number'){
        sequenceNumber = complement(sequenceNumber, 8)
    } else {
        sequenceNumber = complement(ToHex(sequenceNumber, 8))
    }

    headerFormat += sequenceNumber;

    if(typeof(acknowNumber)== 'number'){
        acknowNumber = complement(acknowNumber,8)
    }else{
        acknowNumber = complement(ToHex(acknowNumber, 8))
    }

    headerFormat += acknowNumber;

    headerFormat +='5';
    headerFormat += '000';
    headerFormat += '0001';
    headerFormat += '0000';
    headerFormat += '0000';

    return headerFormat;

}

var tcpheaderFormat = createHeader( sequenceNumber, acknowNumber );

server.listen(8080, '192.168.1.56');
console.log('Server Listening on 127.0.0.1:8080');