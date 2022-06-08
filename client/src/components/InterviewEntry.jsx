import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFaceLaugh } from '@fortawesome/free-solid-svg-icons';
import { faHeartBroken} from '@fortawesome/free-solid-svg-icons';

const InterviewEntry = (props) => {

  return (
    <div >

      {props.interview.job_title} @ {props.interview.company_name}
      {" "}

      <span> interview on {new Date(props.interview.interview_date).toLocaleString()}</span>
      <button ><FontAwesomeIcon icon={faFaceLaugh} />OFFER</button>
      <button ><FontAwesomeIcon icon={faHeartBroken} />Rej</button>
      {"    "}


      </div>

  )

}

export default InterviewEntry;