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
} from "@mui/material";

const style = {
  margin: "10vh auto auto auto",
  width: 600,
  height: 300,
  bgcolor: grey[100],
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

  const deleteShortcutClick = async (e) => {
    e.preventDefault();
    const objId = e.currentTarget.id;
    try {
      const response = await axios.delete("/api/shortcuts/" + objId);
      setShortcutsUrls(response.data);
    } catch (err) {
      console.log("Err deleting a shortcut record!", err);
    }

  }

  const baseUrls = shortcutUrls?.map(urlObj => urlObj.search_url.split("/jobs")[0]);

  return (
    <div className="search-shortcuts">
      <h3>Searching Shortcuts</h3>
      <div>
        {baseUrls?.map((url, i) => (<li key={i}>
          <img
            width="20"
            height="20"
            src={"//f5.allesedv.com/20/" + `${url}`}
          />
          <a href={shortcutUrls[i].search_url}>
            {shortcutUrls[i].keywords}

          </a>
          <button id={shortcutUrls[i]._id} onClick = {e => {deleteShortcutClick(e)}}>delete</button>
        </li>))}
        <button onClick={e => setAddPop(true)}>ADD</button>

      </div>

      {addPop
        ? (
          <Modal open={addPop} onClose={closeModal}>
            <Paper sx={style} align="center">
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


              <Button variant="contained" style={{  marginTop: 20  }} onClick={(e) => {handleSubmitUrl(e); setAddPop("false");}}>Add New Shortcut</Button>

            </Paper>
          </Modal>
        )

        // (<div>
        //   <input
        //     type="text"
        //     name="shortcut"
        //     placeholder="Enter the shortcut url..."
        //     value={newShortcut}
        //     onChange={(e) => setNewShortcut(e.target.value)}
        //   />
        //   <input
        //     type="text"
        //     name="search-keywords"
        //     placeholder="Enter the keywords of your search..."
        //     value={newKeywords}
        //     onChange={(e) => setNewKeywords(e.target.value)}
        //   />

        //   <button onClick={(e) => {handleSubmitUrl(e); setAddPop("false");}}>Add New Shortcut</button>
        // </div>)
        : null


      }

    </div>
  );
}

export default JobWebsites;
