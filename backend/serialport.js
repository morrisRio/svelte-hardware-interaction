// https://serialport.io/docs/guide-usage
import { SerialPort, ReadlineParser } from "serialport";
import { WebSocketServer } from "ws";

//WEBSOCKET ________________________________________________________________________________________________
//WebSocket to exchange data with frontend
const wss = new WebSocketServer({
  port: 8080,
});

//the client will be stored here when a connection is established
let websocketClient = undefined;

//on connection the new client is passed to the connection() function an stored in our variable
wss.on("connection", function connection(ws) {
  websocketClient = ws;

  //when receiving a message from the client write it to the device
  ws.on("message", function message(data) {
    console.log("received: %s", data);
    if (port) port.write(data + "\n");
  });
});

//SERIALPORT ________________________________________________________________________________________________

//creating the Serialport with the correct path to the port on the devive.
//a simple way to look up the device port is by looking for it in the Arduino IDE
const devicePort = "/dev/tty.usbmodem143301";
const port = new SerialPort({ path: devicePort, baudRate: 9600 });
//for a more sophisticated way take a look at the 'serialprt-auto.js' script

// Readline Parser: https://serialport.io/docs/api-serialport#parsers
// creating the parser and piping can be shortened to
let parser = port.pipe(new ReadlineParser());

//when receiving data from the devie send it to the client
parser.on("data", (data) => {
  if (websocketClient !== undefined) {
    websocketClient.send(JSON.stringify({ connected: true, message: data }));
  }
});

//ERROR HANDLING ________________________________________________________________________________________________

// Open errors will be emitted as an error event
port.on("error", function (err) {
  console.log("Port-Error: ", err.message);
});

port.on("close", function (err) {
  console.log("port closed");
  if (websocketClient !== undefined) {
    websocketClient.send(
      JSON.stringify({ connected: false, message: "board getrennt" })
    );
  }
});

parser.on("end", () => console.log("ende"));
parser.on("error", () => console.log("ende"));

process.on("uncaughtException", function (err) {
  // Handle the error safely
  console.log("droin");
  console.log(err);
});
