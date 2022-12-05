// https://serialport.io/docs/guide-usage
import { SerialPort, ReadlineParser } from "serialport";
import WebSocket, { WebSocketServer } from "ws";

//WEBSOCKET ________________________________________________________________________________________________
//Websocket to exchange data with frontend
const wss = new WebSocketServer({
  port: 8080,
});

let websocketClient = undefined;

wss.on("connection", function connection(ws) {
  websocketClient = ws;

  ws.on("message", function message(data) {
    console.log("received: %s", data);
    // message =
    if (port) port.write(data + "\n");
  });
});

//SERIALPORT ________________________________________________________________________________________________

const devicePort = "/dev/tty.usbmodem143301";
const port = new SerialPort({ path: devicePort, baudRate: 9600 });

// Readline Parser: https://serialport.io/docs/api-serialport#parsers
// Creating the parser and piping can be shortened to
let parser = port.pipe(new ReadlineParser());

//send data from the serialport to frontend
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
