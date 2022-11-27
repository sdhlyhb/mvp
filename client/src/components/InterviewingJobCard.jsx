import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import { orange, blue, grey } from "@mui/material/colors";
import { IconButton, Button, Modal, Box } from "@mui/material";
import ApplicationDetails from "./ApplicationDetails.jsx";

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

export default function InterviewingJobCard({
  curJob,
  companyName,
  timeStamp,
  jobTitle,
  deleteClick,
  clickUpdateBtn,
  clickRejBtn,
  clickInterviewBtn,
  updateNotes,
  updateDetails,
  updateInterviewDate,
}) {
  const [deletePop, setDeletePop] = useState(false);
  const [detailPop, setDetailPop] = useState(false);
  const handleClose = (e) => setDeletePop(false);
  const handleDetailClose = (e) => setDetailPop(false);
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
            <PhoneInTalkIcon sx={{ color: blue[900] }} />
            <Typography
              gutterBottom
              variant="subtitle1"
              style={{ fontSize: "1rem", color: blue[900] }}
            >
              Interviewing
            </Typography>
            <Grid item>
              <Typography
                variant="subtitle2"
                component="div"
                color="text.primary"
                style={{ fontSize: "0.75rem" }}
              >
                @{companyName}
              </Typography>
            </Grid>
          </Stack>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={1}>
            <Grid item xs>
              <Typography
                gutterBottom
                style={{
                  fontSize: "0.95rem",
                  color: blue[900],
                }}
              >
                {jobTitle}
              </Typography>
              <Typography
                style={{
                  fontFamily: "Georgia",
                  fontSize: "0.8rem",
                  color: blue[900],
                  fontStyle: "italic",
                }}
              >
                Applied {timeStamp} days ago
              </Typography>
            </Grid>
            <Stack direction="row" alignItems="center" spacing={8}>
              <Button
                aria-label="delete"
                size="small"
                onClick={(e) => setDetailPop(!detailPop)}
              >
                view
              </Button>
              <IconButton aria-label="delete" size="large">
                <DeleteIcon onClick={(e) => setDeletePop(!deletePop)} />
              </IconButton>
            </Stack>
            {detailPop ? (
              <Modal open={detailPop} onClose={handleDetailClose}>
                <Box>
                  {" "}
                  <ApplicationDetails
                    clickedJob={curJob}
                    clickUpdateBtn={clickUpdateBtn}
                    clickRejBtn={clickRejBtn}
                    clickInterviewBtn={clickInterviewBtn}
                    handleDetailClose={handleDetailClose}
                    updateDetails={updateDetails}
                    updateNotes={updateNotes}
                    updateInterviewDate={updateInterviewDate}
                  />{" "}
                </Box>
              </Modal>
            ) : null}
            {deletePop ? (
              <Modal
                open={deletePop}
                onClose={handleClose}
                aria-labelledby="delete-comfirmation-modal"
              >
                <Box sx={style}>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Delete this application?
                  </Typography>
                  <Stack direction="row" alignItems="center" spacing={8}>
                    <Button onClick={(e) => deleteClick(curJob)}> YES</Button>
                    <Button onClick={handleClose}> Cancel</Button>
                  </Stack>
                </Box>
              </Modal>
            ) : null}
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
