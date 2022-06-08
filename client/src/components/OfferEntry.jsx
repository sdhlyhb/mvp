import React from 'react';

const OfferEntry = (props) => {

  return (
    <div>
      {props.offer.job_title} @ {props.offer.company_name}
    </div>
  )
}

export default OfferEntry;