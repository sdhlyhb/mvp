import React from 'react';
import JobEntry from './JobEntry.jsx';

const AppliedList = (props) => {

  return(
        <div className="application-list">
      <h3>This is the application list</h3>
      {props.jobApps.map(jobApp => <JobEntry
      key = {jobApp._id}
      jobApp = {jobApp}
      clickAndPopDetails = {props.popDetails}


      /> )}




    </div>
  )

  }



  export default AppliedList;