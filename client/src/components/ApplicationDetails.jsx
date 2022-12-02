import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePen } from "@fortawesome/free-solid-svg-icons";
import {
  IconButton,
  Button,
  Modal,
  Box,
  Grid,
  Tooltip,
  Typography,
  Link,
  TextField,
  styled,
} from "@mui/material";
import { yellow, blue, orange, green } from "@mui/material/colors";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import CancelIcon from "@mui/icons-material/Cancel";
import PhoneForwardedIcon from "@mui/icons-material/PhoneForwarded";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import InterviewDate from "./InterviewDate.jsx";

const titleStyles = {
  fontFamily: "Roboto, Arial, sans-serif",
  fontWeight: "550",
  color: blue[800],
};

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  alignItems: "center",
  gap: "80px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

function ApplicationDetails(props) {
  const [notes, setNotes] = useState(props.clickedJob.notes);
  const [detailsEdit, setDetailsEdit] = useState(false);
  const [interviewDatePop, setInterviewDatePop] = useState(false);
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
    interviewDate = "N/A";
  }

  if (props.clickedJob.offer_date) {
    var offerDate = new Date(
      props.clickedJob.offer_date
    ).toLocaleString();
  } else {
    offerDate = "N/A";
  }

  return (
    <div className="details">
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Typography style={titleStyles}>Job Title: </Typography>
          <Typography>{props.clickedJob.job_title} </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography style={titleStyles}>Company: </Typography>
          <Typography>{props.clickedJob.company_name} </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography style={titleStyles}>Application Date: </Typography>
          <Typography>{applicationDate} </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography style={titleStyles}>Job Type: </Typography>
          <Typography>{props.clickedJob.job_type} </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography style={titleStyles}>Location Type: </Typography>
          <Typography>{props.clickedJob.location_type} </Typography>
        </Grid>
        <Grid item xs={12}>
          <OpenInNewIcon />
          <Link href={jobUrl} underline="hover" target="_blank">
            Click to view job post
          </Link>
        </Grid>
        <Grid item xs={4}>
          <Typography style={titleStyles}>Interview Date: </Typography>
          <Typography>{interviewDate} </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography style={titleStyles}>Offer Date: </Typography>
          <Typography>{offerDate} </Typography>
        </Grid>

        <Grid item xs={4}>
          <Typography style={titleStyles}>Status: </Typography>
          <Typography>{props.clickedJob.status} </Typography>
        </Grid>

        <Grid item xs={12}>
          {!detailsEdit ? (
            <Grid item xs={12}>
              <Typography style={titleStyles}>Notes: </Typography>
              <Typography>{notes} </Typography>
            </Grid>
          ) : (
            <Grid item xs={12}>
              <Typography style={titleStyles}>Notes: </Typography>
              <TextField
                style={{ backgroundColor: "white" }}
                multiline
                maxRows={20}
                placeholder="Update notes here..."
                value={notes}
                onChange={(e) => {
                  setNotes(e.target.value);
                }}
              />
              <Button onClick={handleUpdateClick}>Update</Button>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Icons>
        <Tooltip title="Update Notes">
          <IconButton onClick={(e) => setDetailsEdit(!detailsEdit)}>
            <FontAwesomeIcon icon={faFilePen} />
          </IconButton>
        </Tooltip>

        <Tooltip title="Update Interview Info">
          <IconButton
            onClick={(e) => {
              setInterviewDatePop(true);
              // props.clickInterviewBtn(e, props.clickedJob._id);

            }}
          >
            <PhoneForwardedIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Mark as Rejected">
          <IconButton id={id} onClick={props.clickRejBtn}>
            <ThumbDownIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Close Modal">
          <IconButton onClick={props.handleDetailClose}>
            <CancelIcon />
          </IconButton>
        </Tooltip>
      </Icons>
      {interviewDatePop ? (
        <Modal
          open={interviewDatePop}
          onClose={(e) => setInterviewDatePop(false)}
        >
          <Box>
            <InterviewDate
              updateToInterviewing = {props.clickInterviewBtn}
              updateInterviewDate={props.updateInterviewDate}
              curJob={props.clickedJob}
            />
          </Box>
        </Modal>
      ) : null}
    </div>
  );
}

export default ApplicationDetails;
