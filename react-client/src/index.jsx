import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Message from './components/Message.jsx';
import PromptUsername from './components/PromptUsername.jsx';
import Begin from './components/Begin.jsx';
import SessionHistory from './components/SessionHistory.jsx';
import SetGoal from './components/SetGoal.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      userId: null,
      username: '',
      userGoal: null,
      sessionHistory: null,
      totalResetHistory: null,
      currentGoalProgress: null,
      latestResetDuration: null,
      congratsMessageShown: false,
      messageComp: PromptUsername,
      currentGoalMessageDisplayed: false,
      endResetMessageDisplayed: false,
      message: null
    }

    this.startTime = null;
    this.endTime = null;
    this.inMinutes = null;
    this.hours = null;
    this.minutes = null;
    this.seconds = null;

    this.$player = $('.player')[0];

    this.ajax = (method, url, data, successCB) => {
      console.log(`attempting ajax ${method} request to ${url}`);
      $.ajax({
        method,
        url,
        data: JSON.stringify(data),
        contentType: 'application/json',
        success: successCB,
        error: (err) => {
          console.log(`Error: cannot ${method} data at ${url}`, err);
        }
      });
    };

    this.submitUsername = (e) => {
      e.preventDefault();
      let username = $('#username').val();
      this.setState((prevState, props) => {
        return {
          username,
          messageComp: Begin
        }
      });
      let userData = {
        username
      }
      this.ajax('POST', '/users', userData, (res) => {
        console.log('successful POST request to /users... user insertId: ' + res);
        this.setState((prevState, props) => {
          return {
            userId: res
          }
        });
      });
    };


    this.startReset = (e) => {
      e.preventDefault();
      this.setState({
        messageComp: ''
      });
      this.startTime = window.performance.now();
      this.startDate = new Date();
      this.$player.play();
    };

    this.stopPlayer = () => {
      this.$player.pause();
      this.$player.currentTime = 0;
    };

    this.secondsToTimer = (seconds) => {
      if (seconds < 60) {
        this.hours = `00`;
        this.minutes = `00`;
        this.seconds = seconds < 10 ? `0${seconds}` : seconds;
      } else if (seconds > 60 && seconds < 3600) {
        this.hours = `00`;
        this.minutes = Math.floor(seconds / 60) < 10 ? `0${Math.floor(seconds / 60)}` : Math.floor(seconds / 60);
        this.seconds = seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60;
      } else if (seconds > 3600) {
        this.hours = Math.floor(seconds / 3600) < 10 ? `0${Math.floor(seconds / 3600)}` : Math.floor(seconds / 3600);
        this.minutes = Math.floor(seconds / 60) < 10 ? `0${Math.floor(seconds / 60)}` : Math.floor(seconds / 60);
        this.seconds = seconds % 60 < 10 ? `0${seconds % 60}`: seconds % 60;
      }
      this.inMinutes = `${this.hours}:${this.minutes}:${this.seconds}`;
      return `${this.hours}:${this.minutes}:${this.seconds}`;
    };

    this.endReset = (e) => {
      e.preventDefault();
      if (this.state.endResetMessageDisplayed) {
        this.setState({
          messageComp: '',
          endResetMessageDisplayed: false
        });
      } else {
        this.endTime = parseInt((window.performance.now() - this.startTime) / 1000);
        this.state.currentGoalProgress = !this.state.currentGoalProgress ? this.endTime : this.state.currentGoalProgress + this.endTime;
        this.endDate = new Date();
        this.stopPlayer();
        this.secondsToTimer(this.endTime);
        if (this.state.userGoal && (this.state.currentGoalProgress / 60) > this.state.userGoal && !this.state.congratsMessageShown) {
          this.setState({
            message: `congratulations, you achieved your reset© goal! you may reset your goal at any time...`,
            messageComp: Message,
            congratsMessageShown: true,
            endResetMessageDisplayed: true
          });
        } else {
          this.setState({
            message: `you have now been reset©. reset duration: ${this.inMinutes}`,
            messageComp: Message,
            endResetMessageDisplayed: true
          });
        }
        let start = `${this.startDate.getHours()}:${this.startDate.getMinutes()}:${this.startDate.getSeconds()}`;
        let end = `${this.endDate.getHours()}:${this.endDate.getMinutes()}:${this.endDate.getSeconds()}`;
        let sessionData = {
          userId: this.state.userId,
          startTime: start,
          endTime: end,
          duration: this.endTime
        }
        this.ajax('POST', '/sessions', sessionData, (res) => {
          console.log('successful POST to /sessions');
        });
      }
    };

      this.setGoal = (e) => {
      e.preventDefault();
      if (this.state.messageComp === SetGoal) {
        this.setState({
          messageComp: ''
        });
      } else {
        this.setState({
          messageComp: SetGoal
        });
      }
    };

    this.createGoal = (e) => {
      e.preventDefault();
      let $goal = $('#goal').val();
      this.setState((prevState, props) => {
        return {
          currentGoalProgress: 0,
          userGoal: $goal,
          message: `your goal has been reset© ${this.state.username.toLowerCase()}...`,
          messageComp: Message,
          congratsMessageShown: false
        }
      });
      let goalData = {
        userId: this.state.userId,
        userGoal: $goal
      }
      this.ajax('POST', '/goals', goalData, (res) => {
        console.log('successful POST to /goals...');
      });
    };

    this.currentGoal = () => {
      if (this.state.currentGoalMessageDisplayed) {
        this.setState({
          messageComp: '',
          currentGoalMessageDisplayed: false
        });
      } else {
        if (this.state.userGoal == 1) {
          this.setState({
            message: `your current goal is ${this.state.userGoal} minute. you're currently at ${Math.floor(this.state.currentGoalProgress / 60)} minutes of reset© time. you have ${Math.ceil(this.state.userGoal - (Math.floor(this.state.currentGoalProgress / 60)))} more minute of reset© time to reach your goal.`,
            messageComp: Message,
            currentGoalMessageDisplayed: true
          });
        } else if (this.state.userGoal && this.state.currentGoalProgress < 60 || this.state.currentGoalProgress > 120) {
          this.setState({
            message: `your current goal is ${this.state.userGoal} minutes. you're currently at ${Math.floor(this.state.currentGoalProgress / 60)} minutes of reset© time. you have ${Math.ceil(this.state.userGoal - (Math.floor(this.state.currentGoalProgress / 60)))} more minute(s) of reset© time to reach your goal.`,
            messageComp: Message,
            currentGoalMessageDisplayed: true
          });
        } else if (this.state.userGoal && this.state.currentGoalProgress > 60 && this.state.currentGoalProgress < 120) {
          this.setState({
            message: `your current goal is ${this.state.userGoal} minutes. you're currently at ${Math.floor(this.state.currentGoalProgress / 60)} minute of reset© time. you have ${Math.ceil(this.state.userGoal - (Math.floor(this.state.currentGoalProgress / 60)))} more minute(s) of reset© time to reach your goal.`,
            messageComp: Message,
            currentGoalMessageDisplayed: true
          });
        } else {
          this.setState({
            message: `you haven't set a reset© goal yet! click on "set new goal" to get started.`,
            messageComp: Message,
            currentGoalMessageDisplayed: true
          });
        }
      }
    };

    this.sessionHistory = (e) => {
      e.preventDefault();
      let userData = {
        userId: this.state.userId
      }
      this.ajax('POST', '/sessionHistory', userData, (res) => {
        console.log('successful GET to /sessions');
        let totalResetHistory = 0;
        res.forEach((session) => {
          totalResetHistory += session.duration_seconds;
          session.duration_seconds = this.secondsToTimer(session.duration_seconds);
        });
        if (this.state.messageComp === SessionHistory) {
          this.setState({
            messageComp: ''
          });
        } else {
          this.setState({
            sessionHistory: res,
            messageComp: SessionHistory,
            totalResetHistory
          });
        }
        });
    };

  }

  render () {
    return (
    <div>
      <h4 style={{fontSize:"2em", position:"fixed", display:"inline-block", color:"white", textShadow:"2px 2px black", top:"25px", left:"40px"}}> welcome to reset©...</h4>
      <div id="buttonsDiv" style={{textAlign:"center"}}>
        <ul style={{listStyleType:"none", position:"fixed", display:"inline-block", left:"23px", top:"100px"}}>
          <li style={{margin:"5px 0px 0px 30px"}}>
          <button id="beginButton" onClick={this.startReset} style={{textShadow:"0.25px 0.25px white", backgroundColor:"rgba(255,255,255, 0.8)", color:"black", border:"2px solid lightblue", fontSize:"20px", borderRadius:"10px", width:"150px", height:"35px"}}>begin reset©</button>
          </li>
          <li style={{margin:"5px 0px 0px 30px"}}>
          <button id="endButton" onClick={this.endReset} style={{textShadow:"0.25px 0.25px white", backgroundColor:"rgba(255,255,255, 0.8)", color:"black", border:"2px solid lightblue", fontSize:"20px", borderRadius:"10px", width:"150px", height:"35px"}}>end reset©</button><br/>
          </li>
          <li style={{margin:"5px 0px 0px 30px"}}>
          <button id="setGoal" onClick={this.setGoal} style={{textShadow:"0.25px 0.25px white", backgroundColor:"rgba(255,255,255, 0.8)", color:"black", border:"2px solid lightblue", fontSize:"20px", borderRadius:"10px", width:"150px", height:"35px"}}>set new goal</button><br/>
          </li>
          <li style={{margin:"5px 0px 0px 30px"}}>
          <button id="currentGoal" onClick={this.currentGoal} style={{textShadow:"0.25px 0.25px white", backgroundColor:"rgba(255,255,255, 0.8)", color:"black", border:"2px solid lightblue", fontSize:"20px", borderRadius:"10px", width:"150px", height:"35px"}}>current goal</button><br/>
          </li>
          <li style={{margin:"5px 0px 0px 30px"}}>
          <button id="sessionHistoryButton" onClick={this.sessionHistory} style={{textShadow:"0.25px 0.25px white", backgroundColor:"rgba(255,255,255, 0.8)", color:"black", border:"2px solid lightblue", fontSize:"20px", borderRadius:"10px", width:"150px", height:"35px"}}>session history</button>
          </li>
        </ul>
        <span style={{width:"650px", margin:"0px auto", position:"fixed", display:"inline-block", marginTop:"100px", left:"400px"}}>
        <this.state.messageComp state={this.state} submitUsername={this.submitUsername} secondsToTimer={this.secondsToTimer} setGoal={this.setGoal} createGoal={this.createGoal}/>
        </span>
      </div>
    </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

$(document).ready(function() {

});