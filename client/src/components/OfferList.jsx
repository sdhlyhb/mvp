import React from "react";

import OfferEntry from "./OfferEntry.jsx";

function OfferList(props) {
  return (
    <>
      {props.offers.map((offer) => (
        <OfferEntry key={offer._id} offer={offer} />
      ))}
    </>
  );
}

export default OfferList;
