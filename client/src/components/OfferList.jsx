import React from "react";

import OfferEntry from "./OfferEntry.jsx";

function OfferList(props) {
  return (
    <div className="offer-list">
      <h3>OFFER List</h3>
      {props.offers.map((offer) => (
        <OfferEntry key={offer._id} offer={offer} />
      ))}
    </div>
  );
}

export default OfferList;
