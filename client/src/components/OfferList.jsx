import React from 'react';

import OfferEntry from './OfferEntry.jsx';

const OfferList = (props) => {

  return(
    <div className="offer-list">
      <h3>This is the offer list</h3>
      {props.offers.map(offer => <OfferEntry
        key={offer._id}
        offer={offer}



      />)}





    </div>
  )

  }



  export default OfferList;