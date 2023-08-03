const app = require('express');
const httpServer = require('http').createServer(app);
const io  = require('socket.io')(httpServer,{ 
    cors: true,
    origins: ["*"]
});

io.on("connection", (socket) => {
    console.log("a user connected");

    socket.emit('message', 'Hey I just connected!');

    socket.broadcast.emit('message', "hi this message is sent to everyone except sender");

    io.emit("This is send to everyone");

    socket.join("HERE IS A UNIQUE ID FOR THE ROOM");

    socket.to("UNIQUE ID".emit("message", "THIS MESSAGE WILL BE SEND TO EVERYONE EXCEPT FROM THE SENDER"));

    io.to("UNIQUE ID".emit("message", "THIS MESSAGE WILL BE SEND TO EVERYONE IN THIS ROOM"));
});

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => console.log('Server is running on the port ' + PORT));