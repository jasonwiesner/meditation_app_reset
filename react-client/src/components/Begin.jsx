import React from 'react';

const Begin = (props) => (
  <div style={{width:"500px", margin: "10px auto", backgroundColor:"rgba(255,255,255, 0.8)", borderRadius:"5px", fontSize:"15px", border:"2px solid lightblue", padding:"10px"}}>
    <h2 style={{textShadow:"0.25px 0.25px white", color:"black", width:"500px", margin: "auto", fontSize:"22px"}}>thanks {props.state.username.toLowerCase()}. you may now begin your reset...</h2>
  </div>
)

export default Begin;