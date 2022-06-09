import React from 'react';
import JobEntry from './JobEntry.jsx';

const AppliedList = (props) => {
  let today = new Date().toLocaleString('en-US');

  return(
    <div className="application-list">
      <h3>This is the application list</h3>
      <a href='/api/allApplications/report'  download ={`Application_Record_${today}.csv`}>Click to download</a>
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