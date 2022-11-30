import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "@mui/material/Button";

class InterviewDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
    };
  }

  handleDateSelect(date) {
    this.setState({
      startDate: date,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.updateToInterviewing(e, this.props.curJob._id);
   this.props.updateInterviewDate(this.props.curJob._id, this.state.startDate);
    // this.props.close(e);
  }

  render() {
    return (
      <div className="interview-date">
        <form id="itw-date-form">
          <label>Interview Date</label>
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleDateSelect.bind(this)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa"
          />
          <Button
            variant="contained"
            size="small"
            onClick={this.handleSubmit.bind(this)}
          >
            update date
          </Button>
        </form>
      </div>
    );
  }
}

export default InterviewDate;
