const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const { CORS_ORIGIN, BACKEND_URL, PORT } = process.env;
const io = require('socket.io')(PORT)

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Socket.io
io.on('connection', socket => {
    console.log(socket.id);
})

app.listen(PORT, () => {
    console.log(`App listening at ${BACKEND_URL}:${PORT}`);
});

app.get("/", (req,res) => {    
    return res.send("Test successful");
})