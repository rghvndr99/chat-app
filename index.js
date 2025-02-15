const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io= new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);
    });
    socket.on('disconnect',()=>{
        console.log('user disconnected');
    });
    socket.on('chat-message', (msg)=>{
        console.log('chat-message',msg);
        io.emit('updatedChat', msg);
    });
});

server.listen(3001, () => {
    console.log('Server is running on port 3001');
});