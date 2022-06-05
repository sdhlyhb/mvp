import React from 'react';
import JobEntry from './JobEntry.jsx';

const AppliedList = (props) => {

  return(
        <div className="application-list">
      <h3>This is the application list</h3>
      <JobEntry />
      <JobEntry />
      <JobEntry />


    </div>
  )

  }



  export default AppliedList;