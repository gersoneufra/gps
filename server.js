const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io').listen(server)

const SerialPort = require('serialport')

const Readline = require('@serialport/parser-readline')
const port = new SerialPort('/dev/tty.usbmodem1421', {
  baudRate: 9600,
});

const parser = port.pipe(new Readline({ delimiter: '\r\n' }))

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html')
})

server.listen(8000, function(){});


parser.on('data', function (data) {
  console.log(data);
  io.sockets.emit('lectura', data)
  // str = JSON.stringify(data);
  // str = JSON.parse(data);
  // console.log(str.latitude);
  // console.log(str.longitude);
  // str = data.toString(); //Convert to string
  // str = str.replace(/\r?\n|\r/g, ""); //remove '\r' from this String
  // str = JSON.stringify(data); // Convert to JSON
  // str = JSON.parse(data); //Then parse it
  //
  // console.log(str);
});

// var SerialPort = require('serialport');

// function getConnectedArduino() {
//   SerialPort.list(function(err, ports) {
//     var allports = ports.length;
//     var count = 0;
//     var done = false
//     ports.forEach(function(port) {
//       count += 1;
//       pm = port['manufacturer'];
//       if (typeof pm !== 'undefined' && pm.includes('arduino')) {
//         arduinoport = port.comName.toString();
//         var serialPort = require('serialport');
//
//         sp = new serialPort(arduinoport, {
//           buadRate: 115200
//         });
//
//         sp.on('open', function() {
//           console.log('done! arduino is now connected at port: ' + arduinoport)
//         })
//
//         sp.on('data', function (data) {
//           console.log('Data:', data);
//         });
//
//       }
//       if (count === allports && done === false) {
//          console.log('cant find arduino')
//       }
//     });
//   });
// }
// //
// getConnectedArduino();
