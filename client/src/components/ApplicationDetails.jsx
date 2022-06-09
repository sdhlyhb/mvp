import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePen } from '@fortawesome/free-solid-svg-icons';
import { faHeartBroken} from '@fortawesome/free-solid-svg-icons';
import { faForwardStep} from '@fortawesome/free-solid-svg-icons';

const ApplicationDetails = (props) => {
  var jobUrl = props.clickedJob.job_url;
  var id= props.clickedJob._id;
  var applicationDate = new Date(props.clickedJob.application_date).toLocaleDateString();
  if(props.clickedJob.interview_date) {
    var interviewDate = new Date(props.clickedJob.interview_date).toLocaleString();
  } else {
    interviewDate = "NOT YET";
  }

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
      <div>Interview Date: {interviewDate}</div>
      <div>Notes: {props.clickedJob.notes}</div>
      <button id={id} onClick={e=>props.clickUpdateBtn(e)}><FontAwesomeIcon icon={faFilePen} /></button>
      <button id={id+"-interviewBtn"} onClick={props.clickInterviewBtn}><FontAwesomeIcon icon={faForwardStep} /> interview</button>
      <button id={id+"-rejBtn"} onClick = {props.clickRejBtn}><FontAwesomeIcon icon={faHeartBroken} />Rej</button>
      <span onClick={props.clickCloseDetailsIcon}>Close</span>
    </div>
  )
}

export default ApplicationDetails