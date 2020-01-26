const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');
const port = new SerialPort('COM5', { baudRate: 115200 });
const parser = port.pipe(new Readline({ delimiter: '\r\n' }));


// const arrayData = [];  
const ERRORLIMIT = 1000;
// // Read the port data

const
    io = require("socket.io"),
    server = io.listen(8000);
let sequenceNumberByClient = new Map();
port.on("open", () => {
  console.log('serial port open');
});
// event fired every time a new client connects:
server.on("connection", (socket) => {
    console.info(`Client connected [id=${socket.id}]`);
    // initialize this client's sequence number
    sequenceNumberByClient.set(socket, 1);

    // when socket disconnects, remove it from the list:
    socket.on("disconnect", () => {
        sequenceNumberByClient.delete(socket);
        console.info(`Client gone [id=${socket.id}]`);
    });
});

parser.on('data', data =>{
  console.log('data', data)
    if(data < ERRORLIMIT){
      for (const [client, sequenceNumber] of sequenceNumberByClient.entries()) {
        client.emit("pressDistance", data);
        console.log('data', data)
        sequenceNumberByClient.set(client, sequenceNumber + 1);
    }
    }else{
        console.log('Error: ',data)
    } 

});
// sends each client its current sequence number
// setInterval(() => {
//     let m = parser.read();
//     console.log('m', m)
//     for (const [client, sequenceNumber] of sequenceNumberByClient.entries()) {
//         client.emit("pressDistance", m);
//         sequenceNumberByClient.set(client, sequenceNumber + 1);
//     }
// }, 1000);