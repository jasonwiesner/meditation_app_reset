import React from 'react';

const SetGoal = (props) => (
  <div style={{textAlign:"center", width:"400px", margin: "10px auto", backgroundColor:"rgba(255,255,255, 0.8)", borderRadius:"5px", fontSize:"25px", border:"2px solid lightblue", padding:"10px"}}>
    <form>
    <h2 style={{textShadow:"0.25px 0.25px white", fontSize:"22px", width:"390px", margin:"12.5px auto"}}>set your next reset© goal (in minutes)...</h2>
      <input id="goal" style={{fontSize:"20px", width:"200px", margin:"10px auto", borderRadius:"10px"}}></input>
      <button id="usernameSubmit" onClick={props.createGoal} style={{fontSize:"20px", marginLeft:"10px", borderRadius:"10px"}}>create goal</button>
    </form>
  </div>
)

export default SetGoal;