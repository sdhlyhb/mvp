import React from 'react';

const Messages = (props) => {
  return(
    <div>
      <h2>You have {props.applications.length - props.rejects.length - props.offers.length} pending applications,
        {"  "} {props.interviews.length} pending interviews
       and {props.offers.length} OFFERS!</h2>
      <button>Show Application Stats</button>
    </div>
  )
}

export default Messages;