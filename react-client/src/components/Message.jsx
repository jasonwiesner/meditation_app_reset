import React from 'react';
import EmptyDiv from './EmptyDiv.jsx';

const Message = (props) => (
  <div style={{textAlign:"center"}}>
    <h3 style={{color:"black", textShadow:"0.25px 0.25px white", width:"340px", margin: "10px auto", textAlign:"center", backgroundColor:"rgba(255,255,255, 0.8)", borderRadius:"5px", fontSize:"22px", border:"2px solid lightblue", padding:"10px"}}>{props.state.message}</h3>
  </div>
)

export default Message;