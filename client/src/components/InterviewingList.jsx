import React from "react";

import InterviewEntry from "./InterviewEntry.jsx";

function InterviewingList(props) {
  return (
    <div className="interviewing-list">
      <h3>Interviewing List</h3>
      {props.interviews.map((interview) => (
        <InterviewEntry
          key={interview._id}
          interview={interview}
          clickRejBtn={props.clickRejBtn}
          clickOfferBtn={props.clickOfferBtn}
        />
      ))}
    </div>
  );
}

export default InterviewingList;
