var mysql = require('mysql');
const Promise = require('bluebird');

var connection = mysql.createConnection({
  host     : 'us-cdbr-east-02.cleardb.com',
  user     : 'b4a62cce920243',
  password : '147af3a1',
  database : 'heroku_7f9386cb73c4b56'
});

var getSessions = function(userId, cb) {
  connection.query(`SELECT * FROM sessions WHERE user_id = ${userId}`, (err, results) => {
    if(err) {
      cb(err);
    } else {
      cb(null, results);
    }
  });
};

let postUser = (username, cb) => {
  let query_insert_username = `INSERT INTO users (name) VALUES ('${username}')`;
  connection.query(query_insert_username, (err, results) => {
    if (err) {
      cb(err);
    } else {
      cb(null, results.insertId.toString());
    }
  });
};

let postSession = (session, cb) => {
  let date = new Date();
  let day = `${(date.getMonth()) + 1}/${date.getDate()}/${date.getFullYear()}`;
  let query_insert_session = `INSERT INTO sessions (user_id, date, start_time, end_time, duration_seconds) VALUES ('${session.userId}', '${day}', '${session.startTime}', '${session.endTime}', '${session.duration}')`;
  connection.query(query_insert_session, (err, results) => {
    if (err) {
      cb(err);
    } else {
      cb(null, results);
    }
  });
}

let postGoal = (userId, goal, cb) => {
  let date = new Date();
  let dayNum = date.getDay();
  let day = dayNum === 0 ? 'Sunday' : dayNum === 1 ? 'Monday' : dayNum === 2 ? 'Tuesday' : dayNum === 3 ? 'Wednesday' : dayNum === 4 ? 'Thursday' : dayNum === 5 ? 'Friday' : 'Saturday';
  let theDate = `${(date.getMonth()) + 1}/${date.getDate()}/${date.getFullYear()}`;
  let theTime = `${(date.getHours()) + 1}:${date.getMinutes()}:${date.getSeconds()}`;
  let finalDate = `${day} ${theDate} at ${theTime}`;
  let query_insert_goal = `INSERT INTO goals (user_id, goal_minutes, createdAt) VALUES ('${userId}', '${goal}', '${finalDate}')`;
  connection.query(query_insert_goal, (err, results) => {
    if (err) {
      cb(err);
    } else {
      cb(null, results);
    }
  });
}

module.exports.getSessions = getSessions;
module.exports.postUser = postUser;
module.exports.postSession = postSession;
module.exports.postGoal = postGoal;
