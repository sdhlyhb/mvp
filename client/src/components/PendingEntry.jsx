import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import { orange, blue, green, red } from "@mui/material/colors";
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

export default function PendingEntry({ curJob, companyName, jobTitle }) {
  const applicationDate = new Date(curJob.application_date);
  const today = new Date();
  const days = Math.ceil((today - applicationDate) / (1000 * 60 * 60 * 24));
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
          theme.palette.mode === "dark" ? "#1A2027" : green[100],
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={4} align="center">
          <Stack direction="column" alignItems="center" spacing={1}>
            <PendingActionsIcon sx={{ color: green[900] }} />
            <Typography
              gutterBottom
              variant="subtitle1"
              style={{ fontSize: "1rem", color: green[900] }}
            >
              {jobTitle}
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
              {/* <Typography
                gutterBottom
                style={{
                  fontSize: "0.95rem",
                  color: green[900],
                }}
              >
                {jobTitle}
              </Typography> */}
              <Typography
                style={{
                  fontFamily: "Georgia",
                  fontSize: "0.8rem",
                  color: blue[900],
                  fontStyle: "italic",
                }}
              >
                Applied {days} days ago
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
