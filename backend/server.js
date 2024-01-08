const express = require('express');
const dotenv = require("dotenv").config();
const cors = require('cors');
const connectDB = require("./config/db");
const port = process.env.PORT || 8000;

// webSocket
const WebSocket = require("ws");
const http = require("http");
const server = http.createServer(express);
const wss = new WebSocket.Server({server});

wss.on("connection", function connection(ws) {
    ws.on("message", function incoming(data, isBinary) {
        wss.clients.forEach(function each(client) {
            if(client !== ws && client.readyState == WebSocket.OPEN){
                client.send(data, { binary: isBinary });
            }
        });
    });
});

server.listen(5000, () => {
    console.log(`Listening for reviews started at 5000`);
});

// App
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors({
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "allowedHeaders": ['Authorization', 'Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Access-Control-Request-Method', 'Access-Control-Request-Headers', 'Cache-Control']
}));

connectDB();

app.use("/api/bookings/", require("./routes/bookingRoute"));
app.use("/api/user/", require("./routes/userRoute"));
app.use("/api/review/", require("./routes/reviewRoute"));

app.listen(port, () => {
    console.log(`Server started at ${port}`);
});