const txt = document.getElementById('txt')
const btn = document.getElementById('sub')
const join = document.getElementById('join')
const create = document.getElementById('create')
const roomid = document.getElementById('roomid')
const pid = document.getElementById('pid')
const msg = document.getElementById('msg')
const send = document.getElementById('send')



const socket = io();
socket.on('chat message', function (msg) {
    console.log("Your id : ", msg);
    //socket.emit('chat', "ji")
    //socket.emit('createRoom')
});

socket.on('error', function (msg) {
    console.log("here");
    console.log("error : ", msg);
});

socket.on('roomCreated',(msg) =>{
    console.log("Room created : ",msg);
})

socket.on('joinedroom',(msg) =>{
    console.log("Joined Room : ",msg);
})

socket.on('receiveMsg',(data)=>{
    console.log("Receive msg : ",data);
})




join.addEventListener('click', () => {
    if (roomid.value) {
        socket.emit('joinroom', roomid.value)
        roomid.value = ''
    }
})

create.addEventListener('click', () => {


        socket.emit('createRoom')
    
})

btn.addEventListener('click', () => {

    if (txt.value) {
        socket.emit('createuser', txt.value)
        txt.value = ''
    }
})

send.addEventListener('click', () => {

    if (msg.value && pid.value) {
        socket.emit('sendMsg', {to:pid.value,msg:msg.value})
        msg.value , pid.value = ''
    }
})