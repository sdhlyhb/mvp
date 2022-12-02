import React, { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

function OfferDate() {
  const [offerDate, setOfferDate] = useState(new Date());
  const [alertOpen, setAlertOpen] = useState(false);
  const handleUpdateClick = (e) => {};
  const handleAlertOpen = (e) => setAlertOpen(true);
  const handleAlertClose = (e) => setAlertOpen(false);

  return (
    <div className="offer-date">
      <form id="offer-date-form">
        <label>Offer Received Date</label>
        <DatePicker
          selected={offerDate}
          onChange={(date) => setOfferDate(date)}
          timeCaption="time"
          dateFormat="MMMM d, yyyy"
        />
        <Button variant="contained" size="small" onClick={handleUpdateClick}>
          update date
        </Button>
      </form>
      <Snackbar
        open={alertOpen}
        autoHideDuration={6000}
        onClose={handleAlertClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleAlertClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          Offer Received Date Updated!
        </MuiAlert>
      </Snackbar>
    </div>
  );
}

// class OfferDate extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       startDate: new Date(),
//       alertOpen: false,
//     };
//   }

//   handleDateSelect(date) {
//     this.setState({
//       startDate: date,
//     });
//   }

//   handleSubmit(e) {
//     e.preventDefault();
//     this.props.updateToInterviewing(e, this.props.curJob._id);
//    this.props.updateInterviewDate(this.props.curJob._id, this.state.startDate);
//    this.handleAlertOpen(e);
//   }

//   handleAlertOpen(e) {
//     this.setState({
//       alertOpen: true,
//     })
//   }

//   handleAlertClose(e) {
//     this.setState({
//       alertOpen: false,
//     })
//   }

//   render() {
//     return (
//   <div className="interview-date">
//     <form id="itw-date-form">
//       <label>Interview Date</label>
//       <DatePicker
//         selected={this.state.startDate}
//         onChange={this.handleDateSelect.bind(this)}
//         showTimeSelect
//         timeFormat="HH:mm"
//         timeIntervals={15}
//         timeCaption="time"
//         dateFormat="MMMM d, yyyy h:mm aa"
//       />
//       <Button
//         variant="contained"
//         size="small"
//         onClick={this.handleSubmit.bind(this)}
//       >
//         update date
//       </Button>
//     </form>
//     <Snackbar open={this.state.alertOpen} autoHideDuration={6000} onClose={this.handleAlertClose}>
//     <MuiAlert elevation={6} variant="filled" onClose={this.handleAlertClose} severity="success" sx={{ width: '100%' }}>
//       Interview Date Updated!
//     </MuiAlert>
//   </Snackbar>
//   </div>
// );
//   }
// }

export default OfferDate;
