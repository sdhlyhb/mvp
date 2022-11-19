import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrashCan,faFaceLaugh, faHeartBroken  } from "@fortawesome/free-solid-svg-icons";
import SummarizeTwoToneIcon from "@mui/icons-material/SummarizeTwoTone";
import CelebrationIcon from "@mui/icons-material/Celebration";
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';

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
          <ThumbDownIcon />
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
          <CelebrationIcon />
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
      ) : props.jobApp?.status === "Interviewing" ? (
        <div class="highlight">
          <PhoneInTalkIcon />
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
          <PendingActionsIcon />
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
