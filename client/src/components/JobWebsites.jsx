import React, { useEffect, useState } from "react";
import axios from "axios";
import { yellow, blue, orange, red, grey } from "@mui/material/colors";
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
  Paper,
  Chip,
  Stack,
  Avatar
} from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AppShortcutIcon from '@mui/icons-material/AppShortcut';

const style = {
  margin: "2vh auto auto auto",
  minWidth: 290,
  maxWidth: 300,
  maxHeight: 500,
  bgcolor: grey[100],
  p: 2,
};
const stackStyle = {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    listStyle: 'none',
    minHeight: 100,
    p: 0.5,
    m: 0,

};

const ListItem = styled('li')(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const modalStyle = {
  margin: "20vh auto auto auto",
  minWidth: 300,
  maxWidth: 600,
  maxHeight: 500,
  bgcolor: grey[200],
  p:3,

};

function JobWebsites() {
  const [shortcutUrls, setShortcutsUrls] = useState([]);
  const [newShortcut, setNewShortcut] = useState("");
  const [newKeywords, setNewKeywords] = useState("");
  const [addPop, setAddPop] = useState(false);
  const closeModal = (e) => {setAddPop(false)};


  const getUrls = async () => {
    try {
      const response = await axios.get(
        "/api/shortcuts"
      );
      console.log("this is urls data:", response.data);
      setShortcutsUrls(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUrls();
  }, [])




  const handleSubmitUrl = async (e) => {
    e.preventDefault();
    const shotcutObj = {
      search_url: newShortcut,
      keywords: newKeywords,
    };

    try {
      const response = await axios.post("/api/shortcuts", shotcutObj);
      console.log("response:", response.data);
      getUrls();
      console.log("urls:", shortcutUrls);
      setNewShortcut("");
      setNewKeywords("");
    } catch (err) {
      console.log("Err adding new shortcut url!", err);
    }
  };

  const deleteShortcutClick = async (e, objId) => {
    e.preventDefault();
    // const objId = e.currentTarget.id;
    try {
      const response = await axios.delete("/api/shortcuts/" + objId);
      setShortcutsUrls(response.data);
    } catch (err) {
      console.log("Err deleting a shortcut record!", err);
    }

  }

  const baseUrls = shortcutUrls?.map(urlObj => urlObj.search_url.split("/jobs")[0]);

  return (
    <Paper sx ={style}>
      <AppShortcutIcon sx={{ fontSize: 30 }}/>
      <Typography sx={{ fontSize: 20 }} color="text.primary" gutterBottom>Searching Shortcuts</Typography>
      <Paper sx={stackStyle} component="ul">
      {baseUrls.map((url, i) => {

        return (
          <ListItem key={i}>
            <Chip
              variant="outlined"
              color="primary"
              label={shortcutUrls[i].keywords}
              avatar={<Avatar alt="favcon" src={"//f5.allesedv.com/20/" + `${url}`} />}
              onDelete={e => deleteShortcutClick(e, shortcutUrls[i]._id)}
              component={Link}
              target="_blank"
              href={shortcutUrls[i].search_url}
              sx={{
                ':hover': {
                bgcolor: blue[300], // theme.palette.primary.main
                color: 'white',

              }}}
            />
          </ListItem>
        );
      })}

        </Paper>

      <Tooltip title="Add a new shortcut url">
          <IconButton onClick={e => setAddPop(true)}>
            <AddCircleOutlineIcon
              sx={{
                fontSize: 30,
                ':hover': {
                color: blue[700],

              }}}

          /></IconButton>
        </Tooltip>

      {addPop
        ? (
          <Modal open={addPop} onClose={closeModal}>
            <Paper sx={modalStyle} align="center">
                <TextField
                  style={{ backgroundColor: "white", width: 600,  }}
                  multiline
                  maxRows={10}
                  placeholder="Enter the shortcut url..."
                  value={newShortcut}
                  onChange={(e) => {
                    setNewShortcut(e.target.value);
                  }} >

                </TextField>
                <TextField
                  style={{ backgroundColor: "white", width: 600, marginTop: 20  }}
                  multiline
                  maxRows={10}
                  placeholder="Enter the keywords of your search..."
                  value={newKeywords}
                  onChange={(e) => setNewKeywords(e.target.value)}
                >

                </TextField>


              <Button variant="contained"
               style={{  marginTop: 20  }}
               onClick={(e) => {handleSubmitUrl(e); setAddPop("false");}}>Add New Shortcut</Button>

            </Paper>
          </Modal>
        )
        : null


      }

    </Paper>
  );
}

export default JobWebsites;
