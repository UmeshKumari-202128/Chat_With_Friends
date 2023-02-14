// Node Server which will handle socket io connection

const io = require("socket.io")(8000)


const users = {};

// io.on handle all users joined but socket.on handles only particular user
io.on('connection',socket=>{
    socket.on('new-user-joined',name=>{
         // console.log("New user",name);
          users[socket.id]=name;
          socket.broadcast.emit('user-joined',name);
    });

    socket.on('send',message=>{
        socket.broadcast.emit('receive',{
            message: message,
            name:users[socket.id]
        })
    });

    socket.on('disconnect',message=>{
        socket.broadcast.emit('leave',users[socket.id]);
        delete users[socket.id]
    });
})