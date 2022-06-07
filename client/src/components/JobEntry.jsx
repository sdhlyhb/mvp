import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye } from '@fortawesome/free-solid-svg-icons'
import { faTrashCan } from '@fortawesome/free-solid-svg-icons'

const JobEntry = (props) => {
  var curjobTitle = props.jobApp.job_title;
  var curJobCompany = props.jobApp.company_name
  return (
    <div >
      {props.jobApp.job_title} @ {props.jobApp.company_name}
      {" "}
      <span>{props.jobApp.status}</span>
      {"    "}
      <button onClick = {e => {props.clickAndPopDetails(curjobTitle, curJobCompany)}}> <FontAwesomeIcon icon={faEye} /></button>
      <button onClick = {e => {props.deleteApp(props.jobApp)}}><FontAwesomeIcon icon={faTrashCan} /></button>

      </div>

  )
}

export default JobEntry;