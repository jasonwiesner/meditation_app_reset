import React from 'react';

const SessionHistory = (props) => (
  <div id="SessionHistoryParent" style={{position:"fixed", left:'575px', top:"80px", maxHeight: "500px"}}>
    <div style={{width:"300px", margin: "10px auto", backgroundColor:"rgba(255, 255, 255, 0.8)", borderRadius:"5px", fontSize:"25px", border:"2px solid lightblue", padding:"10px", position:"absolute", overflowY:"auto", maxHeight:"inherit"}}>
      <h2 style={{textShadow:"0.25px 0.25px white", margin: "auto 35px", fontSize:"28px", fontWeight:"bold", textDecoration:"underline", maxHeight:"inherit"}}>session history</h2>
      <ul style={{listStyleType:"none", padding:"1px"}}>
        {props.state.sessionHistory.map((session) => {
          return <li key={session.id} style={{margin:"0px 0px -20px 0px", paddingBottom:"-15px"}}>
            <ul style={{margin:"1px"}}>
              <li style={{fontSize:"16px"}}>session date: <span style={{fontSize:"18px"}}>{session.date}</span></li>
              <li style={{fontSize:"16px"}}>start time: <span style={{fontSize:"18px"}}>{session.start_time}</span></li>
              <li style={{fontSize:"16px"}}>end time: <span style={{fontSize:"18px"}}>{session.end_time}</span></li>
              <li style={{fontSize:"16px"}}>reset duration: <span style={{fontSize:"18px"}}>{session.duration_seconds}</span></li>
            </ul><br/>
          </li>
        })}
      </ul>
      <p style={{fontSize:"18px", margin:"-20px 15px 15px 15px", fontWeight:"bold", maxHeight:"inherit"}}>total reset history: {props.secondsToTimer(props.state.totalResetHistory)}</p>
    </div>
  </div>
)

export default SessionHistory;