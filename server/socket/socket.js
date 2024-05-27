import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ['GET', 'POST']
    }
});

//socket.io is listen to events. It can be used both on server and client
io.on('connection', socket => {
    console.log('A user connoted', socket.id);

    socket.on("disconnected", () => {
        console.log('A user disconnected', socket.id);
    });
});

export { app, io, server };