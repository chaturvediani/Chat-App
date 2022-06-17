const express=require('express')
const app=express()
const http=require('http')
const server=http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  });
const users={}
io.on('connection', (socket)=>{
    // console.log('connected!')
    socket.on('new-user-joined',name=>{
        // console.log('new user:', name);
      users[socket.id]=name;
      socket.broadcast.emit('user-joined',name)
    });
    socket.on('send',(msg)=>{
        socket.broadcast.emit('recieve',{message:msg,name:users[socket.id]});
    });
    socket.on('disconnect', msg=>{
      socket.broadcast.emit('user-left',users[socket.id]);
      delete users[socket.id];
    })

})
server.listen(3000,()=>{
    console.log('listening on :3000');
});