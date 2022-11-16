import React from "react";
import CelebrationIcon from "@mui/icons-material/Celebration";

function OfferEntry(props) {
  return (
    <div>
      <CelebrationIcon />
      {props.offer.job_title} @ {props.offer.company_name}
    </div>
  );
}

export default OfferEntry;
