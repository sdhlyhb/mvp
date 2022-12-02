import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import AlarmIcon from "@mui/icons-material/Alarm";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import MoodIcon from "@mui/icons-material/Mood";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { yellow, blue, orange, red } from "@mui/material/colors";
import { IconButton, Button, Modal, Box, Stack, Tooltip } from "@mui/material";
import OfferDate from "./OfferDate.jsx";

function InterviewEntry(props) {
  const [offerConfirm, setOfferConfirm] = useState(false);
  const [offerDatePop, setOfferDatePop] = useState(false);
  const [rejPop, setRejPop] = useState(false);
  const handleOfferConfirmClose = (e) => {
    setOfferConfirm(false);
  };
  const handleOfferDateModalClose = (e) => {
    setOfferDatePop(false);
  };
  const handleRejClose = (e) => {
    setRejPop(false);
  };
  const interviewDate = new Date(props.interview.interview_date);
  const today = new Date();
  const calDays = Math.ceil((interviewDate - today) / (1000 * 60 * 60 * 24));
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 300,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 6,
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
              </Typography>
              {calDays > 0 ? (
                <Typography
                  style={{
                    fontFamily: "Georgia",
                    fontSize: "0.9rem",
                    fontWeight: "500",
                    color: red[900],
                    fontStyle: "italic",
                  }}
                >
                  (in {calDays} days)
                </Typography>
              ) : calDays < 0 ? (
                <Typography
                  style={{
                    fontFamily: "Georgia",
                    fontSize: "0.9rem",
                    fontWeight: "500",
                    color: blue[900],
                    fontStyle: "italic",
                  }}
                >
                  ({-calDays} days ago)
                </Typography>
              ) : (
                <Typography
                  style={{
                    fontFamily: "Georgia",
                    fontSize: "1rem",
                    fontWeight: "600",
                    color: red[900],
                    fontStyle: "italic",
                  }}
                >
                  (TODAY)
                </Typography>
              )}
            </Grid>
            <Stack direction="row" alignItems="center" spacing={8}>
              <Tooltip title="Marks as Offer Received">
                <IconButton
                  aria-label="thumbUp"
                  size="large"
                  onClick={(e) => setOfferConfirm(true)}
                >
                  <ThumbUpIcon />
                </IconButton>
              </Tooltip>

              <Tooltip title="Mark as Rejected">
                <IconButton
                  aria-label="thumbDown"
                  size="large"
                  onClick={(e) => setRejPop(true)}
                >
                  <ThumbDownIcon />
                </IconButton>
              </Tooltip>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
      {offerConfirm ? (
        <Modal
          open={offerConfirm}
          onClose={handleOfferConfirmClose}
          aria-labelledby="offer-confirmation-modal"
        >
          <Box sx={{ ...style, bgcolor: yellow[200] }}>
            <Typography
              id="offer-confirm-modal-title"
              variant="h6"
              component="h2"
            >
              Received OFFER on this application?
            </Typography>
            <Stack direction="row" align="center" spacing={20}>
              <Button
                id={`${props.interview._id}-offerBtn`}
                // onClick={props.clickOfferBtn}
                onClick={(e) => setOfferDatePop(true)}
              >
                {" "}
                <MoodIcon /> YES!!!
              </Button>
              <Button onClick={handleOfferConfirmClose}> Cancel</Button>
            </Stack>
          </Box>
        </Modal>
      ) : null}
      {offerDatePop ? (
        <Modal
          open={offerDatePop}
          onClose={handleOfferDateModalClose}
          aria-labelledby="offer-date-modal"
        >
          <OfferDate />
        </Modal>
      ) : null}
      {rejPop ? (
        <Modal
          open={rejPop}
          onClose={handleRejClose}
          aria-labelledby="rej-comfirmation-modal"
        >
          <Box sx={style}>
            <Typography id="rej-modal-title" variant="h6" component="h2">
              Mark this application as Rejected?
            </Typography>
            <Stack direction="row" align="center" spacing={20}>
              <Button
                id={`${props.interview._id}-itw-rejBtn`}
                onClick={props.clickRejBtn}
              >
                {" "}
                <SentimentVeryDissatisfiedIcon /> YES
              </Button>
              <Button onClick={handleRejClose}> Cancel</Button>
            </Stack>
          </Box>
        </Modal>
      ) : null}
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
    // id={`${props.interview._id}-offerBtn`}
    // onClick={props.clickOfferBtn}
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
