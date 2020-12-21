const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const UserPool = require('./service/userService');
const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

let usersPool = new UserPool()

app.use(router);

io.on('connect', (socket) => {
  console.log(`User with id: ${socket.id} successfullt connected!`)
  socket.on('join', ({ name }) => {
    usersPool.newUser(socket.id, name);
  });
  socket.on('disconnect', () => {
    usersPool.removeUser(socket.id);
  })

  socket.on('machineStatus', ({ id, status, name }, callback) => {
    let user = usersPool.getUser(name)
    if (user == undefined) {
      socket.emit('machineStatus', { id, status: "stop" });
      return
    }
    switch (status) {
      case "start":
        if (user.machine.oven.ovenState.value === 0) {
          user.machine.emitter.on("temperature", changedTemperature => {
            socket.emit('ovenTemperature', { id: socket.id, temperature: changedTemperature })
          })
          user.machine.emitter.on("bakingCookies", bakingCookies => {
            socket.emit('bakingCookies', { id: socket.id, bakingCookies: bakingCookies })
          })
          user.machine.emitter.on("bakedCookies", bakedCookies => {
            socket.emit('bakedCookies', { id: socket.id, bakedCookies: bakedCookies })
          })
          user.machine.emitter.on("ovenState", ovenState => {
            socket.emit('ovenState', { id: socket.id, ovenState: ovenState })
          })
        }
        user.machine.startMachine()
        break;
      case "pause":
        user.machine.pauseMachine();
        break;
      case "stop":
        user.machine.stopMachine();
        break;
    }
    socket.emit('machineStatus', { id, status });
  })
});

server.listen(process.env.PORT || 8080, () => console.log(`Server has started.`));