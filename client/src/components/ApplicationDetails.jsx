import React from 'react';

const ApplicationDetails = (props) => {
  var jobUrl = props.clickedJob.job_url;
  var applicationDate = new Date(props.clickedJob.application_date).toLocaleDateString();
  return (
    <div className="details">
      <h3>Details Of Current Application</h3>
      <div>Title: {props.clickedJob.job_title}</div>
      <div>Company: {props.clickedJob.company_name}</div>
      <div>Application Date: {applicationDate}</div>
      <div>Type: {props.clickedJob.job_type}</div>
      <div>Location Type: {props.clickedJob.location_type}</div>
      <div><a href={jobUrl} target="popup">Click to view job post</a></div>
      <div>Status: {props.clickedJob.status}</div>
      <div>Notes: {props.clickedJob.notes}</div>
      <button>Edit</button>
      <button>Got interview</button>
      <button>Rejected</button>
    </div>
  )
}

export default ApplicationDetails