const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const cors = require('cors');
const io = require('socket.io');
const mongoose = require('mongoose');
const dbconfig = require('./config/db');

const app = express();
const server = http.createServer(app);
const socketIo = io(server);

const User = require('./models/User');
const Chat = require('./models/Chat');

const helpers = require('./helpers');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

mongoose.connect(dbconfig.mongoURI)
  .then(() => console.log('Соединение с базой данных установлено'))
  .catch(err => console.error(`Ошибка подключения к базе данных: ${err}`))

app.use(cors());

// routes
const auth = require('./routes/api/auth');
const chats = require('./routes/api/chats');

app.use('/api/auth', auth);
app.use('/api/chats', chats);

server.listen(5000, () => {
  console.log('Listening on *:5000');
});

const cio = socketIo.of('/chat');
const clio = socketIo.of('/chatlist');

// Sockets for chat namespace
cio.on('connection', socket => {

  const s_user_id = socket.handshake.query.user_id;
  const room = socket.handshake.query.room;
  socket.join(room);
  helpers.setSocket(s_user_id, socket.id);
  Chat.findById(room)
    .then(chat => {
      chat.members = helpers.updateUserLastSeen(chat, s_user_id);
      chat.save()
        .catch(err => console.error(err));
    })
    .catch(err => console.error(err));

  socket.on('client:message', data => {
    Chat.findById(room)
      .populate('members.user')
      .then(chat => {
        if (!chat) return;
        chat.messages.push(data.message);
        chat._updated = Date.now();
        chat.members = helpers.updateUserLastSeenIfOnline(chat, data.target_user_id, cio.sockets);
        chat.save()
          .then(chat => {
            let user = chat.members.find(member => member.user._id == data.target_user_id).user;
            if (!cio.sockets[user.socket_id] && clio.sockets[user.socket_id]) {
              console.log('User online, but not in chat')
              Chat.find()
              .in('members.user', user._id)
              .populate('members.user')
              .sort('-_updated')
              .then(chats => clio.to(user.socket_id).emit('server:message', chats))
              .catch(err => console.error(err))
            }
            return cio.to(room).emit('server:message', chat);;
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  });

  socket.on('disconnect', () => {
    helpers.deleteSocket(s_user_id); 
  });
})

// Sockets for chat list namespace
clio.on('connection', socket => {
  const user_id = socket.handshake.query.user_id;
  helpers.setSocket(user_id, socket.id);
  
  socket.on('disconnect', () => {
    helpers.deleteSocket(user_id);
  })
})
