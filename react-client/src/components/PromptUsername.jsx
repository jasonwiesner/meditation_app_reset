import React from 'react';

const PromptUsername = (props) => (
  <div style={{width:"400px", margin: "10px auto", backgroundColor:"rgba(255,255,255, 0.8)", borderRadius:"5px", fontSize:"25px", border:"2px solid lightblue", padding:"10px"}}>
    <form>
      <h2 style={{textShadow:"0.25px 0.25px white", fontSize:"22px", width:"400px", margin:"20px auto"}}>what is your name in the physical realm?</h2>
      <input id="username" style={{fontSize:"20px", width:"200px", marginLeft:"40px", borderRadius:"10px"}}></input>
      <button id="usernameSubmit" onClick={props.submitUsername} style={{fontSize:"20px", width:"100px", margin:"10px 10px", borderRadius:"10px"}}>submit</button>
    </form>
  </div>
)

export default PromptUsername;