import React from "react";

import InterviewEntry from "./InterviewEntry.jsx";

function InterviewingList(props) {
  return (
    <>
      {props.interviews.map((interview) => (
        <InterviewEntry
          key={interview._id}
          interview={interview}
          clickRejBtn={props.clickRejBtn}
          clickOfferBtn={props.clickOfferBtn}
        />
      ))}
    </>
  );
}

export default InterviewingList;
