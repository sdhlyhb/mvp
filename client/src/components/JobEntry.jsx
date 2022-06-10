import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import SummarizeTwoToneIcon from '@mui/icons-material/SummarizeTwoTone';

const JobEntry = (props) => {
  var curjobTitle = props.jobApp.job_title;
  var curJobCompany = props.jobApp.company_name;
  var applicationDate = new Date(props.jobApp.application_date);
  var today = new Date();
  // console.log(today, applicationDate);
  var days = Math.ceil((today - applicationDate) /(1000*60*60*24));
  return (
    <div id={props.jobApp._id +"-listDiv"}>
      <SummarizeTwoToneIcon />
      <span>{props.jobApp.status}</span>
      {":    "}
      {props.jobApp.job_title} @ {props.jobApp.company_name}
      {" "}

      <span> Applied {days} days ago</span>
      {"    "}
      <button className="view-btn" onClick = {e => {props.clickAndPopDetails(curjobTitle, curJobCompany)}}> <FontAwesomeIcon icon={faEye} className="fa-icon"/></button>
      <button className="trash-btn" onClick = {e => {props.deleteApp(props.jobApp)}}><FontAwesomeIcon icon={faTrashCan} className="fa-icon"/></button>

      </div>

  )
}

export default JobEntry;