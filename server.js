const path = require('path');
const express = require('express');
const session = require('express-session');
const sharedsession = require("express-socket.io-session");
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const http = require('http');
const socketIo = require('socket.io');
const Message = require('./models/Message');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

// Session configuration
const sess = {
    secret: 'Super secret secret',
    cookie: {
      maxAge: 300000,
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
};

const sessionMiddleware = session(sess);
app.use(sessionMiddleware);

io.use(sharedsession(sessionMiddleware, {
    autoSave:true
})); 

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('a user connected');
  console.log(socket.handshake.session);

  socket.on('disconnect', () => {
      console.log('user disconnected');
  });

  socket.on('chat message', (message) => {
    // Access session to get the user's username
    const username = socket.handshake.session.username; // Adjust based on where username is stored
    console.log(`message from ${username}: ${message}`);
    Message.create({
        username: username, // Use username from session
        message: message
    }).then(() => {
        io.emit('chat message', { username, message });
    }).catch(err => console.error(err));
  });
});

sequelize.sync({ force: false }).then(() => {
console.log('Database synchronized');
server.listen(PORT, () => { 
 console.log('Now listening');
});
});