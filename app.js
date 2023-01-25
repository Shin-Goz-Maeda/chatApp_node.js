const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const PORT = 3000;

server.listen(PORT, ()=>{
  console.log("listening on *:3000");
});

app.use(express.static('public'));

io.on('connection', function(socket){
  socket.on('myMessage', function(msg){
      io.emit('myMessage', msg);
  });
});

io.on('connection', function(socket){
  socket.on('otherMessage', function(msg){
      io.emit('otherMessage', msg);
  });
});


