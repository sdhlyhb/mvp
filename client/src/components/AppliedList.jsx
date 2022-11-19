import React, { useEffect, useState } from "react";
import FileDownloadTwoToneIcon from "@mui/icons-material/FileDownloadTwoTone";
import FindInPageTwoToneIcon from "@mui/icons-material/FindInPageTwoTone";
import Button from "@mui/material/Button";
import ListAltIcon from "@mui/icons-material/ListAlt";
import JobEntry from "./JobEntry.jsx";

function AppliedList(props) {
  const today = new Date().toLocaleString("en-US");
  const [searchKeywords, setSearchKeywords] = useState("");
  useEffect(() => {
    props.search(searchKeywords);
  }, [searchKeywords]);

  return (
    <div className="application-list">
      <h3>Applications Record</h3>
      <Button variant="outlined" size="small">
        <a
          href="/api/allApplications/report"
          download={`Application_Record_${today}.csv`}
        >
          <FileDownloadTwoToneIcon />
          Full Record
        </a>
      </Button>
      <br />
      <input
        type="text"
        placeholder="Search by keywords..."
        value={searchKeywords}
        onChange={(e) => setSearchKeywords(e.target.value)}
      />
      {/* <Button
        size="small"
        onClick={(e) => {
          props.search(props.keyword);
        }}
      >
        <FindInPageTwoToneIcon />
      </Button> */}
      <Button
        size="small"
        onClick={(e) => {
          setSearchKeywords("");
          props.clickViewAllBtn;
        }}
      >
        <ListAltIcon />
        All
      </Button>

      {props.jobApps.map((jobApp) => (
        <JobEntry
          key={jobApp._id}
          jobApp={jobApp}
          clickAndPopDetails={props.popDetails}
          deleteApp={props.delete}
        />
      ))}
    </div>
  );
}

export default AppliedList;
