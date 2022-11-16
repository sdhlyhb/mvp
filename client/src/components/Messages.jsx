import React from "react";

function Messages(props) {
  return (
    <div className="msg-board">
      <h2>Today is {new Date().toLocaleDateString()}:</h2>
      <h3>
        You have {props.interviews.length} pending interviews and{" "}
        {props.offers.length} OFFERS!
      </h3>
    </div>
  );
}

export default Messages;
