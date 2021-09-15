const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database-mysql');
const Promise = require('bluebird');
const path = require('path');
const favicon = require('serve-favicon');
let PORT = 3000;
let port = process.env.PORT;

if (port == null || port == "") {
  port = 3000;
}

const app = express();
app.use(favicon(path.join(__dirname, '/../react-client', 'dist', 'favicon.png')));
app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/sessionHistory', function (req, res) {
  let userId = req.body.userId;
  db.getSessions(userId, (err, data) => {
    if(err) {
      res.sendStatus(500);
      console.log('error: ', err);
    } else {
      res.send(data);
    }
  });
});

app.post('/users', (req, res) => {
  console.log('req.body: ', req.body);
  let username = req.body.username;
  db.postUser(username, (err, results) => {
    if (err) {
      res.sendStatus(500);
      console.log('error: ', err);
    } else {
      res.writeHead(200);
      res.end(results);
    }
  });
});

app.post('/sessions', (req, res) => {
  let sessionData = req.body;
  db.postSession(sessionData, (err, results) => {
    if (err) {
      res.sendStatus(500);
      console.log('error: ', err);
    } else {
      res.writeHead(200);
      console.log('successful POST to sessions...');
    }
  });
});

app.post('/goals', (req, res) => {
  console.log('req.body', req.body);
  let userId = req.body.userId;
  let goal = req.body.userGoal;
  db.postGoal(userId, goal, (err, results) => {
    if (err) {
      console.log('error: ', err);
    } else {
      res.writeHead(200);
      console.log('successful POST to goals...')
    }
  })
})

app.listen(port, function() {
  console.log('listening on port 3000!');
});

