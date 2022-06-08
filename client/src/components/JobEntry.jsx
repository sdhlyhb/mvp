import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

const JobEntry = (props) => {
  var curjobTitle = props.jobApp.job_title;
  var curJobCompany = props.jobApp.company_name;
  var applicationDate = new Date(props.jobApp.application_date);
  var today = new Date();
  // console.log(today, applicationDate);
  var days = Math.ceil((today - applicationDate) /(1000*60*60*24));
  return (
    <div >
      {props.jobApp.job_title} @ {props.jobApp.company_name}
      {" "}
      <span>{props.jobApp.status}</span>
      {"    "}
      <span> Applied {days} days ago</span>
      {"    "}
      <button onClick = {e => {props.clickAndPopDetails(curjobTitle, curJobCompany)}}> <FontAwesomeIcon icon={faEye} /></button>
      <button onClick = {e => {props.deleteApp(props.jobApp)}}><FontAwesomeIcon icon={faTrashCan} /></button>

      </div>

  )
}

export default JobEntry;