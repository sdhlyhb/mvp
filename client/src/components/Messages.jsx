import React from 'react';

const Messages = (props) => {
  return(
    <div>
      <h2>You have {props.applications.length - props.rejects.length} pending applications and {props.interviews.length} pending interviews</h2>
      <button>Show Application Stats</button>
    </div>
  )
}

export default Messages;