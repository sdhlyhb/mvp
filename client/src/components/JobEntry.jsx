import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import SummarizeTwoToneIcon from "@mui/icons-material/SummarizeTwoTone";

function JobEntry(props) {
  const curjobTitle = props.jobApp.job_title;
  const curJobCompany = props.jobApp.company_name;
  const applicationDate = new Date(props.jobApp.application_date);
  const today = new Date();
  // console.log(today, applicationDate);
  const days = Math.ceil((today - applicationDate) / (1000 * 60 * 60 * 24));
  return (
    <div id={`${props.jobApp._id}-listDiv`}>
      {props.jobApp?.status === "Rejected" ? (
        <div class="crossed-line">
          <SummarizeTwoToneIcon />
          <span>{props.jobApp.status}</span>
          {":    "}
          {props.jobApp.job_title} @ {props.jobApp.company_name}{" "}
          <span className="time-stamp"> Applied {days} days ago</span>
          {"    "}
          <button
            className="view-btn"
            onClick={(e) => {
              props.clickAndPopDetails(curjobTitle, curJobCompany);
            }}
          >
            {" "}
            <FontAwesomeIcon icon={faEye} className="fa-icon" />
          </button>
          <button
            className="trash-btn"
            onClick={(e) => {
              props.deleteApp(props.jobApp);
            }}
          >
            <FontAwesomeIcon icon={faTrashCan} className="fa-icon" />
          </button>
        </div>
      ) : props.jobApp?.status === "OFFER" ? (
        <div class="offer-highlight">
          <SummarizeTwoToneIcon />
          <span>{props.jobApp.status}</span>
          {":    "}
          {props.jobApp.job_title} @ {props.jobApp.company_name}{" "}
          <span className="time-stamp"> Applied {days} days ago</span>
          {"    "}
          <button
            className="view-btn"
            onClick={(e) => {
              props.clickAndPopDetails(curjobTitle, curJobCompany);
            }}
          >
            {" "}
            <FontAwesomeIcon icon={faEye} className="fa-icon" />
          </button>
          <button
            className="trash-btn"
            onClick={(e) => {
              props.deleteApp(props.jobApp);
            }}
          >
            <FontAwesomeIcon icon={faTrashCan} className="fa-icon" />
          </button>
        </div>
      )



      : (
        <div>
          <SummarizeTwoToneIcon />
          <span>{props.jobApp.status}</span>
          {":    "}
          {props.jobApp.job_title} @ {props.jobApp.company_name}{" "}
          <span className="time-stamp"> Applied {days} days ago</span>
          {"    "}
          <button
            className="view-btn"
            onClick={(e) => {
              props.clickAndPopDetails(curjobTitle, curJobCompany);
            }}
          >
            {" "}
            <FontAwesomeIcon icon={faEye} className="fa-icon" />
          </button>
          <button
            className="trash-btn"
            onClick={(e) => {
              props.deleteApp(props.jobApp);
            }}
          >
            <FontAwesomeIcon icon={faTrashCan} className="fa-icon" />
          </button>
        </div>
      )}
    </div>
  );
}

export default JobEntry;
