import React from 'react';

const JobEntry = (props) => {
  var curjobTitle = props.jobApp.job_title;
  var curJobCompany = props.jobApp.company_name
  return (
    <div onClick = {e => {props.clickAndPopDetails(curjobTitle, curJobCompany)}}>
      {props.jobApp.job_title} @ {props.jobApp.company_name}
      {" "}
      <span>{props.jobApp.status}</span>

      </div>

  )
}

export default JobEntry;