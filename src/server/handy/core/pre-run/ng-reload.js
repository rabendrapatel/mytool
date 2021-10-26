const fs = require('fs');
const path = require('path');

const app = require('express')();
const http = require('http').createServer(app);

const io = require('socket.io')(http
  , {
    cors: {
      origin: "http://localhost",
      methods: ["GET", "POST"]
    }
  }
);

const EventEmitter = require('events');

const ClientChangesEmiter = new EventEmitter();

io.on('connection', (socket) => {

  localEmitter = ClientChangesEmiter;
  localEmitter.on('change', () => {
    io.emit('change');
  })

});

let watchPath = path.join(__dirname, '../../../../client/web/dist/web/');

fs.watch(watchPath, { recursive: true }, () => {

  ClientChangesEmiter.emit('change');

})

http.listen(3201, () => {
  console.log('Ng dev reload is listening on *:3201');
});
