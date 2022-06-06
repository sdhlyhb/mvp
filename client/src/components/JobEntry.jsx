import React from 'react';

const JobEntry = (props) => {
  return (
    <li><a>{props.jobApp.job_title}</a></li>

  )
}

export default JobEntry;