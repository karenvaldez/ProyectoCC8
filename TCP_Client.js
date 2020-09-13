var net = require('net');
var sourcePort = "KV";
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

function first3whpacket(client) {
    var tcpHeader = header(sourcePort, "--", 1, 0);

    // Calcular el checksum

    client.write(tcpHeader);
}

var client = new net.Socket();
client.connect(6787, '192.168.1.57', function () {
    console.log('connected');

    first3whpacket(client);

});

client.on('data', function (data) {
    console.log('received:' + data);
    // client.destroy();

});

client.on('close', function () {
    console.log('connection closed');
});