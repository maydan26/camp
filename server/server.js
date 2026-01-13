import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import startPublisher from "./publisher.js";
import { list } from "./data.js";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" },
});

app.use(
  cors({
    origin: true, // echoes back the request origin
    credentials: true, // allow cookies/auth headers
  })
);

app.get("/", (req, res) => {
  res.send("Hello from the server");
});

app.get("/list", (req, res) => {
  res.send(list);
});

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("subscribe", (channel) => {
    console.log(`Subscribing to channel: ${channel}`);
    socket.join(channel);
  });

  socket.on("unsubscribe", (channel) => {
    console.log(`Unsubscribing from channel: ${channel}`);
    socket.leave(channel);
  });
});

startPublisher(io, 5000);

server.listen(3000, () => {
  console.log("Listening on http://localhost:3000");
});
