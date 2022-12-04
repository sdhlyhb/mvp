import React, { useEffect, useState } from "react";
import {
  IconButton,
  Button,
  Modal,
  Box,
  Grid,
  AppBar,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import JobEntry from "./JobEntry.jsx";

function AppliedList(props) {
  const today = new Date().toLocaleString("en-US");
  return (
    <>
      {props.jobApps.map((jobApp) => (
        <JobEntry
          key={jobApp._id}
          jobApp={jobApp}
          clickAndPopDetails={props.popDetails}
          deleteApp={props.delete}
          clickUpdateBtn={props.clickUpdateBtn}
          clickRejBtn={props.clickRejBtn}
          clickInterviewBtn={props.clickInterviewBtn}
          updateNotes={props.updateNotes}
          updateDetails = {props.updateDetails}
          updateInterviewDate = {props.updateInterviewDate}
        />
      ))}
    </>
  );
}

export default AppliedList;
