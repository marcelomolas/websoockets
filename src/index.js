import express from "express";
import { Server as WebSocketServer } from "socket.io";
import http from "http";
import Sockets from "./sockets";

const app = express();
const server = http.createServer(app);
app.use(express.static(__dirname + "/public"));

const httpServer = server.listen(3000,"0.0.0.0");
console.log("Server on http://localhost:3000");

const io = new WebSocketServer(httpServer,{cors:{origin:"*"}});

Sockets(io);
