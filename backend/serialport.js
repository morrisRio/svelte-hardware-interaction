// https://serialport.io/docs/guide-usage
import { SerialPort, ReadlineParser } from "serialport";
import WebSocket, { WebSocketServer } from "ws";

//Websocket to send data to frontend
const createWebSocket = () => {
  const wss = new WebSocketServer({
    port: 8080,
    perMessageDeflate: {
      zlibDeflateOptions: {
        // See zlib defaults.
        chunkSize: 1024,
        memLevel: 7,
        level: 3,
      },
      zlibInflateOptions: {
        chunkSize: 10 * 1024,
      },
      // Other options settable:
      clientNoContextTakeover: true, // Defaults to negotiated value.
      serverNoContextTakeover: true, // Defaults to negotiated value.
      serverMaxWindowBits: 10, // Defaults to negotiated value.
      // Below options specified as default values.
      concurrencyLimit: 10, // Limits zlib concurrency for perf.
      threshold: 1024, // Size (in bytes) below which messages
      // should not be compressed if context takeover is disabled.
    },
  });
  return wss;
};

const loop = async (websocketClient) => {
  const devicePort = "/dev/tty.usbmodem143301";
  console.log(devicePort);

  let port = new SerialPort({ path: devicePort, baudRate: 9600 });

  // Readline Parser: https://serialport.io/docs/api-serialport#parsers
  // Creating the parser and piping can be shortened to
  let parser = port.pipe(new ReadlineParser());

  // Open errors will be emitted as an error event
  port.on("error", function (err) {
    console.log("Error: ", err.message);
    loop(websocketClient);
  });

  port.on("close", function (err) {
    console.log("should reconnect now");
    port = null;
    parser = null;
    if (websocketClient !== undefined) {
      websocketClient.send(JSON.stringify({ connected: false }));
    }
    loop(websocketClient);
  });

  parser.on("data", (data) => {
    //console.log(data)
    //websocketClient.send(JSON.stringify({ connected: true }));

    if (websocketClient !== undefined) {
      websocketClient.send(JSON.stringify({ connected: true, message: data }));
    }
    return `${data}, how are you?`;
  });

  parser.on("end", () => console.log("ende"));
  parser.on("error", () => console.log("ende"));
};
process.on("uncaughtException", function (err) {
  // Handle the error safely
  console.log("droin");
  console.log(err);
});

const wss = createWebSocket();
let websocketClient = undefined;

wss.on("connection", function connection(ws) {
  websocketClient = ws;
  loop(websocketClient);
  ws.on("message", function message(data) {
    console.log("received: %s", data);
  });

  ws.send(JSON.stringify("something"));
});
