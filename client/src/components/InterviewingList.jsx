import React from 'react';

import InterviewEntry from './InterviewEntry.jsx';

const InterviewingList = (props) => {

  return(
    <div className="interviewing-list">
      <h3>This is the interviewing list</h3>
      {props.interviews.map(interview => <InterviewEntry
        key={interview._id}
        interview={interview}
        clickRejBtn = {props.clickRejBtn}


      />)}





    </div>
  )

  }



  export default InterviewingList;