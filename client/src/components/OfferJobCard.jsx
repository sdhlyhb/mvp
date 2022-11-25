import * as React from "react";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import CelebrationIcon from "@mui/icons-material/Celebration";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import { yellow, blue, orange } from "@mui/material/colors";
import { IconButton, Button, Modal, Box } from "@mui/material";
import { styled } from "@mui/material/styles";

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

export default function OfferJobEntryCard() {
  const [deletePop, setDeletePop] = React.useState(false);
  const [detailPop, setDetailPop] = React.useState(false);
  const handleClose = (e) => setDeletePop(false);

  return (
    <Paper
      sx={{
        p: 2,
        margin: "3px",
        maxWidth: 300,
        maxHeight: 100,
        flexGrow: 0.5,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : yellow[300],
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <Stack direction="column" alignItems="center" spacing={1}>
            <CelebrationIcon sx={{ color: orange[900] }} />
            <Typography
              gutterBottom
              variant="subtitle1"
              sx={{ color: orange[900] }}
              style={{ fontSize: "0.8rem" }}
            >
              OFFER
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
                  color: orange[900],
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
                Applied xxx days ago
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
            {detailPop ? <Grid> details! </Grid> : null}
            {deletePop ? (
              <Modal
                open={deletePop}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
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
                    <Button> YES</Button>
                    <Button onClick={handleClose}> Cancel</Button>
                  </Stack>
                </Box>
              </Modal>
            ) : null}
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
