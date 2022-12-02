import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CelebrationIcon from "@mui/icons-material/Celebration";
import Stack from "@mui/material/Stack";
import { yellow, blue, orange } from "@mui/material/colors";
import { IconButton, Button, Modal, Box } from "@mui/material";

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

function OfferEntry(props) {
  const applicationDate = new Date(
    props.offer.application_date
  ).toLocaleDateString();
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
          theme.palette.mode === "dark" ? "#1A2027" : yellow[300],
      }}
    >
      <Grid container spacing={4}>
        <Grid item xs={4} align="center">
          <Stack direction="column" alignItems="center" spacing={1}>
            <CelebrationIcon sx={{ color: orange[800] }} />
            <Typography
              gutterBottom
              variant="subtitle1"
              style={{
                fontSize: "0.9rem",
                color: orange[800],
                fontStyle: "italic",
                fontWeight: "500",
              }}
            >
              {props.offer.job_title}
            </Typography>
            <Grid item>
              <Typography
                variant="subtitle2"
                component="div"
                color="text.primary"
                style={{ fontSize: "0.75rem", fontStyle: "italic" }}
              >
                @{props.offer.company_name}
              </Typography>
            </Grid>
          </Stack>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={1}>
            <Grid item xs>
              <Typography
                style={{
                  fontFamily: "Georgia",
                  fontSize: "0.8rem",
                  color: blue[900],
                  fontStyle: "italic",
                }}
              >
                Applied on {applicationDate}
              </Typography>
              <Typography
                style={{
                  fontFamily: "Georgia",
                  fontSize: "0.9rem",
                  color: orange[900],
                  fontStyle: "italic",
                }}
              >
                Offer received on xxxx day
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default OfferEntry;
