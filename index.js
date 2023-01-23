const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const loginApi = require('./server/login');
const userApi = require('./server/user');
const messageApi = require('./server/message');
app.use('/', express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '2mb' }));
app.use(cookieParser());
app.use(loginApi);
app.use(userApi);
app.use(messageApi);
const db = 'XXXX';

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set('useCreateIndex', true)
mongoose.connection.on('connected', () => {
  console.log('Connected with database');
});

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server up and running on port ${process.env.PORT || 8080}`);
});