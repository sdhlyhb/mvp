import React from 'react';

const InterviewEntry = (props) => {

  return (
    <div >

      {props.interview.job_title} @ {props.interview.company_name}
      {" "}

      <span> interview will be in xxx days</span>
      {"    "}


      </div>

  )

}

export default InterviewEntry;