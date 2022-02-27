require('dotenv').config('./.env')
const express = require('express');
const app = express()
const http = require('http');
const { randomUUID } = require('crypto');


app.use(express.static('./'))

const server = http.createServer(app);
let io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
})

const user = {}//name:id
const room = {}//roomid:[userid]

io.on('connection', (socket) => {
    console.log("Socket id : ", socket.id);
    socket.emit("chat message", socket.id)

    socket.on('sendMsg', (data) => {
        socket.to(data.to).emit('receiveMsg', { from: socket.id, msg: data.msg })
    })

    socket.on('createuser', (data) => {
        if (data) {
            if (Object.keys(user).length > 0) {

                for (index in user) {
                    if (data == (index)) {
                        return socket.emit("error", "name not allowed")
                    }
                    if (user[index] == socket.id) {
                        return socket.emit("error", "rename not allowed")
                    }
                    user[data] = socket.id
                }
            }
            else {
                user[data] = socket.id
            }
        }
        else {
            return socket.emit("error", "Empty not allowed")
        }
        return socket.emit("userCreated",data)
    })

    socket.on('createRoom', () => {
        const id = randomUUID()
        room[id] = [(socket.id)]
        socket.emit("roomCreated", id)
    })

    socket.on('joinroom', (data) => {
        room[data].push(socket.id)
        socket.emit("joinedroom", socket.id)
        console.log("rooom : ", room);

    })


    socket.on('disconnect', () => {
        //pop user in group
        console.log(`user ${socket.id} disconnected`);
    });
})




// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html')
// })

server.listen(process.env.PORT, () => {
    console.log(`Server running on : http://localhost:${process.env.PORT}`);
})