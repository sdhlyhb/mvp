import React, { useEffect, useState } from "react";
import {
  IconButton,
  Button,
  Modal,
  Box,
  Grid,
  AppBar,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import JobEntry from "./JobEntry.jsx";

function AppliedList(props) {
  const today = new Date().toLocaleString("en-US");
  // const [searchKeywords, setSearchKeywords] = useState("");
  // useEffect(() => {
  //   props.search(searchKeywords);
  // }, [searchKeywords]);

  return (
    <>
      {props.jobApps.map((jobApp) => (
        <JobEntry
          key={jobApp._id}
          jobApp={jobApp}
          clickAndPopDetails={props.popDetails}
          deleteApp={props.delete}
          clickUpdateBtn={props.clickUpdateBtn}
          clickRejBtn={props.clickRejBtn}
          clickInterviewBtn={props.clickInterviewBtn}
        />
      ))}
    </>
    //   <div className="application-list">
    //     <input
    //       type="text"
    //       placeholder="Search by keywords..."
    //       value={searchKeywords}
    //       onChange={(e) => setSearchKeywords(e.target.value)}
    //     />

    //     <Button
    //       size="small"
    //       onClick={(e) => {
    //         setSearchKeywords("");
    //         props.clickViewAllBtn;
    //       }}
    //     >
    //       <ListAltIcon />
    //       All
    //     </Button>

    //     {props.jobApps.map((jobApp) => (
    //       <JobEntry
    //         key={jobApp._id}
    //         jobApp={jobApp}
    //         clickAndPopDetails={props.popDetails}
    //         deleteApp={props.delete}
    //       />
    //     ))}
    //   </div>
  );
}

export default AppliedList;
