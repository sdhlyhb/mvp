import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import { orange, blue, grey } from "@mui/material/colors";
import { IconButton, Button } from "@mui/material";

export default function InterviewingJobCard() {
  return (
    <Paper
      sx={{
        p: 2,
        margin: "3px",
        maxWidth: 300,
        maxHeight: 100,
        flexGrow: 0.5,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : blue[200],
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <Stack direction="column" alignItems="center" spacing={1}>
            <PhoneInTalkIcon />
            <Typography
              gutterBottom
              variant="subtitle1"
              color="text.primary"
              style={{ fontSize: "0.6rem" }}
            >
              Interviewing
            </Typography>
          </Stack>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography
                gutterBottom
                variant="subtitle1"
                style={{
                  color: blue[900],
                  fontWeight: "500",
                }}
              >
                Software Engineer
              </Typography>
              <Typography
                variant="body2"
                style={{
                  color: blue[900],
                  fontStyle: "italic",
                  fontFamily: "Georgia, 'Times New Roman', Times, serif",
                }}
              >
                Applied 23 days ago
              </Typography>
            </Grid>
            <Stack direction="row" alignItems="center" spacing={8}>
              <Button aria-label="delete" size="small">
                view
              </Button>
              <IconButton aria-label="delete" size="large">
                <DeleteIcon />
              </IconButton>
            </Stack>
          </Grid>
          <Grid item>
            <Typography
              variant="subtitle1"
              component="div"
              color="text.primary"
              style={{ fontSize: "0.9rem" }}
            >
              @Amazon
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
