const express = require('express');
const app = express();
const cors = require('cors');
const server = require('http').createServer(app);
const { Server } = require('socket.io');

// Allows for url variables to be pulled in from .env file
require('dotenv').config();
const { CORS_ORIGIN, BACKEND_URL, PORT } = process.env;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Regular HTTP Requests
app.get("/", (req, res) => {
    return res.send('Hello Socket.io World!');
})

// Socket.io
const io = new Server(server, {
    cors: {
        origin: { CORS_ORIGIN },
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    },
});

io.on('connection', (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`)
    })

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    })

    socket.on('disconnect', () => {
        console.log("User disconnected", socket.id);
    })
})

server.listen(PORT, () => {
    console.log(`Server listening at ${BACKEND_URL}:${PORT}`)
});