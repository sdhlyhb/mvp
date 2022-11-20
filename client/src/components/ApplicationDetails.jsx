import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFilePen,
  faHeartBroken,
  faForwardStep,
} from "@fortawesome/free-solid-svg-icons";
import CancelPresentationTwoToneIcon from "@mui/icons-material/CancelPresentationTwoTone";

function ApplicationDetails(props) {
  const [notes, setNotes] = useState(props.clickedJob.notes);
  const [detailsEdit, setDetailsEdit] = useState(false);
  const jobUrl = props.clickedJob.job_url;
  const id = props.clickedJob._id;
  const handleUpdateClick = (e) => {
    e.preventDefault();
    setDetailsEdit(!detailsEdit);
    props.updateNotes(id, notes);
  };
  const applicationDate = new Date(
    props.clickedJob.application_date
  ).toLocaleDateString();
  if (props.clickedJob.interview_date) {
    var interviewDate = new Date(
      props.clickedJob.interview_date
    ).toLocaleString();
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
      <div>
        <a href={jobUrl} target="popup">
          Click to view job post
        </a>
      </div>
      <div>Status: {props.clickedJob.status}</div>
      <div>Interview Date: {interviewDate}</div>
      {!detailsEdit ? (
        <div>Notes: {notes}</div>
      ) : (
        <div>
          Notes:
          <br />
          <textarea
            rows="4"
            cols="20"
            placeholder="Update notes here..."
            value={notes}
            onChange={(e) => {
              setNotes(e.target.value);
            }}
          />
          <button onClick={handleUpdateClick}>Update</button>
        </div>
      )}

      <button id={id} onClick={(e) => setDetailsEdit(!detailsEdit)}>
        <FontAwesomeIcon icon={faFilePen} />
      </button>
      <button id={`${id}-interviewBtn`} onClick={props.clickInterviewBtn}>
        <FontAwesomeIcon icon={faForwardStep} /> interview
      </button>
      <button id={`${id}-rejBtn`} onClick={props.clickRejBtn}>
        <FontAwesomeIcon icon={faHeartBroken} />
        Rej
      </button>
      <span id="close-icon">
        <CancelPresentationTwoToneIcon onClick={props.clickCloseDetailsIcon} />
      </span>
      {/* <span onClick={props.clickCloseDetailsIcon}>Close</span> */}
    </div>
  );
}

export default ApplicationDetails;
