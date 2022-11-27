import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrashCan,faFaceLaugh, faHeartBroken  } from "@fortawesome/free-solid-svg-icons";
import SummarizeTwoToneIcon from "@mui/icons-material/SummarizeTwoTone";
import CelebrationIcon from "@mui/icons-material/Celebration";
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import PhoneInTalkIcon from '@mui/icons-material/PhoneInTalk';
import OfferJobEntryCard from "./OfferJobCard.jsx";
import InterviewingJobEntryCard from "./InterviewingJobCard.jsx";
import PendingJobEntryCard from "./PendingJobEntryCard.jsx";
import RejJobEntryCard from "./RejJobEntryCard.jsx";

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
        <RejJobEntryCard
        curJob = {props.jobApp}
        companyName = {props.jobApp.company_name}
        jobTitle = {props.jobApp.job_title}
        timeStamp = {days}
        viewDetailsClick = {props.clickAndPopDetails}
        deleteClick = {props.deleteApp}
        clickUpdateBtn = {props.clickUpdateBtn}
        clickRejBtn = {props.clickRejBtn}
        clickInterviewBtn = {props.clickInterviewBtn}
        updateNotes = {props.updateNotes}
        updateDetails = {props.updateDetails}
        updateInterviewDate = {props.updateInterviewDate}

        />
      ) : props.jobApp?.status === "OFFER" ? (
        <OfferJobEntryCard
        curJob = {props.jobApp}
        companyName = {props.jobApp.company_name}
        jobTitle = {props.jobApp.job_title}
        timeStamp = {days}
        viewDetailsClick = {props.clickAndPopDetails}
        deleteClick = {props.deleteApp}
        clickUpdateBtn = {props.clickUpdateBtn}
        clickRejBtn = {props.clickRejBtn}
        clickInterviewBtn = {props.clickInterviewBtn}
        updateNotes = {props.updateNotes}
        updateDetails = {props.updateDetails}
        updateInterviewDate = {props.updateInterviewDate}

        />
      ) : props.jobApp?.status === "Interviewing" ? (
        <InterviewingJobEntryCard
        curJob = {props.jobApp}
        companyName = {props.jobApp.company_name}
        jobTitle = {props.jobApp.job_title}
        timeStamp = {days}
        viewDetailsClick = {props.clickAndPopDetails}
        deleteClick = {props.deleteApp}
        clickUpdateBtn = {props.clickUpdateBtn}
        clickRejBtn = {props.clickRejBtn}
        clickInterviewBtn = {props.clickInterviewBtn}
        updateNotes = {props.updateNotes}
        updateDetails = {props.updateDetails}
        updateInterviewDate = {props.updateInterviewDate}

        />
      )




      : (
        <PendingJobEntryCard
        curJob = {props.jobApp}
        companyName = {props.jobApp.company_name}
        jobTitle = {props.jobApp.job_title}
        timeStamp = {days}
        viewDetailsClick = {props.clickAndPopDetails}
        deleteClick = {props.deleteApp}
        clickUpdateBtn = {props.clickUpdateBtn}
        clickRejBtn = {props.clickRejBtn}
        clickInterviewBtn = {props.clickInterviewBtn}
        updateNotes = {props.updateNotes}
        updateDetails = {props.updateDetails}
        updateInterviewDate = {props.updateInterviewDate}

        />
        // <div>
        //   <PendingActionsIcon />
        //   <span>{props.jobApp.status}</span>
        //   {":    "}
        //   {props.jobApp.job_title} @ {props.jobApp.company_name}{" "}
        //   <span className="time-stamp"> Applied {days} days ago</span>
        //   {"    "}
        //   <button
        //     className="view-btn"
        //     onClick={(e) => {
        //       props.clickAndPopDetails(curjobTitle, curJobCompany);
        //     }}
        //   >
        //     {" "}
        //     <FontAwesomeIcon icon={faEye} className="fa-icon" />
        //   </button>
        //   <button
        //     className="trash-btn"
        //     onClick={(e) => {
        //       props.deleteApp(props.jobApp);
        //     }}
        //   >
        //     <FontAwesomeIcon icon={faTrashCan} className="fa-icon" />
        //   </button>
        // </div>
      )}
    </div>
  );
}

export default JobEntry;
