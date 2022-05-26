const express = require("express");
const path = require("path");
const cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server)
const { routes } = require('./routes');

require('./database/db');

const connectedUsers = {};

io.on('connection', socket => {
  const { user_id } = socket.handshake.query;

  connectedUsers[user_id] = socket.id;
});

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
})


app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(path.resolve(__dirname, "..", "public")));
app.use("/files", express.static(path.resolve(__dirname, "..", "uploads")));
app.use('/api', routes);

app.get("/", (req, res) => {
    return res.json({
        message: "Please use /api for access this application!"
    })
})


server.listen(process.env.PORT || 3333, () => {
    console.log('HTTP SERVER WITH SOCKET.IO IS RUNNING')
})