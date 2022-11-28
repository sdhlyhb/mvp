import React from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFaceLaugh, faHeartBroken } from "@fortawesome/free-solid-svg-icons";
// import TimerTwoToneIcon from "@mui/icons-material/TimerTwoTone";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import AlarmIcon from '@mui/icons-material/Alarm';
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { yellow, blue, orange, red } from "@mui/material/colors";
import { IconButton, Button, Modal, Box, Stack, Tooltip } from "@mui/material";

function InterviewEntry(props) {
  const interviewDate = new Date(props.interview.interview_date);
  const today = new Date();
  const calDays = Math.ceil((interviewDate - today) / (1000 * 60 * 60 * 24));
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 200,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 3,
  };

  return (
    <Paper
      sx={{
        p: 3,
        margin: "3px",
        maxWidth: 320,
        minWidth: 300,
        maxHeight: 100,
        flexGrow: 2,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : blue[200],
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={4} align="center">
          <Stack direction="column" alignItems="center" spacing={1}>
            <AlarmIcon sx={{ color: blue[900] }} />
            <Typography
              gutterBottom
              variant="subtitle1"
              style={{ fontSize: "1rem", color: blue[900] }}
            >
              {props.interview.job_title}
            </Typography>
            <Grid item>
              <Typography
                variant="subtitle2"
                component="div"
                color="text.primary"
                style={{ fontSize: "0.75rem" }}
              >
                @{props.interview.company_name}
              </Typography>
            </Grid>
          </Stack>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={1}>
            <Grid item xs>
              <Typography
                style={{
                  fontSize: "1rem",
                }}
              >
                Interview on{" "}
                {new Date(props.interview.interview_date).toLocaleString()}
              </Typography >
              {calDays > 0
              ?
              <Typography
              style={{
                fontFamily: "Georgia",
                fontSize: "0.8rem",
                color: red[900],
                fontStyle: "italic",
              }}>(in {calDays} days)</Typography>
              : calDays < 0
              ? <Typography
                style={{
                  fontFamily: "Georgia",
                  fontSize: "0.8rem",
                  color: blue[900],
                  fontStyle: "italic",
                }}>({calDays} days ago)</Typography>
              : <Typography
              style={{
                fontFamily: "Georgia",
                fontSize: "1rem",
                color: red[900],
                fontStyle: "italic",
              }}>(TODAY)</Typography>
              }

            </Grid>
            <Stack direction="row" alignItems="center" spacing={8}>
            <IconButton aria-label="thumbUp" size="large">
                <ThumbUpIcon />
              </IconButton>
              <IconButton aria-label="thumbDown" size="large">
                <ThumbDownIcon />
              </IconButton>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
    // <div>
    //   <TimerTwoToneIcon n />
    //   {props.interview.job_title} @ {props.interview.company_name}{" "}
    //   <span>
    //     {" "}
    //     interview on {new Date(props.interview.interview_date).toLocaleString()}
    //   </span>{" "}
    //   <span className="time-stamp">(in {calDays} days)</span>
    //   <button
    //     id={`${props.interview._id}-offerBtn`}
    //     onClick={props.clickOfferBtn}
    //   >
    //     <FontAwesomeIcon icon={faFaceLaugh} />
    //     OFFER
    //   </button>
    //   <button
    //     id={`${props.interview._id}-itw-rejBtn`}
    //     onClick={props.clickRejBtn}
    //   >
    //     <FontAwesomeIcon icon={faHeartBroken} />
    //     Rej
    //   </button>
    //   {"    "}
    // </div>
  );
}

export default InterviewEntry;
