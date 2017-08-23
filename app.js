var app = require('./config/express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('io', io);

// localhost 3000
var porta = process.env.PORT || 3000;

http.listen(porta,function(){
    console.log("servidor rodando para o heroku");
});