import express from "express";
import http from "http";
import morgan from "morgan";
import cors from "cors";
import { Server } from "socket.io";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(morgan("dev"));

app.get("/*", (req, res) => {
  res.json(req.url);
});

const chatList: string[] = [];

const server = http.createServer(app);
const io = new Server(server, {
  allowRequest(req, fn) {
    const noOriginHeader = req.headers.origin === undefined;
    fn(null, noOriginHeader);
  },
});

io.on("sendMessage", (value) => {
  chatList.push(value);
  io.emit("chatUpdate", chatList);
});

server.listen(3000, () => {
  console.log("Escuchando al 3000");
});
