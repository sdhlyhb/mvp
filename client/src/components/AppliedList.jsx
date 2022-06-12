import React from 'react';
import JobEntry from './JobEntry.jsx';
import FileDownloadTwoToneIcon from '@mui/icons-material/FileDownloadTwoTone';
import FindInPageTwoToneIcon from '@mui/icons-material/FindInPageTwoTone';
import Button from '@mui/material/Button';
import ListAltIcon from '@mui/icons-material/ListAlt';


const AppliedList = (props) => {
  let today = new Date().toLocaleString('en-US');

  return(
    <div className="application-list">
      <h3>Applications List</h3>
      <Button variant="outlined" size='small'><a href='/api/allApplications/report'  download ={`Application_Record_${today}.csv`}><FileDownloadTwoToneIcon />Full Record</a></Button>
      <br />
      <input type="text"  placeholder="search...." value = {props.keyword} onChange = {props.onChangeKeyword}></input>
      <Button size='small' onClick = {e => {props.search(props.keyword)}}><FindInPageTwoToneIcon /></Button>
      <Button size='small' onClick = {props.clickViewAllBtn }><ListAltIcon />All</Button>





      {props.jobApps.map(jobApp => <JobEntry
        key={jobApp._id}
        jobApp={jobApp}
        clickAndPopDetails={props.popDetails}
        deleteApp = {props.delete}


      />)}




    </div>
  )

  }



  export default AppliedList;