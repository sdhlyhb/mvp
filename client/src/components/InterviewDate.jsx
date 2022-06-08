import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class InterviewDate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),

    };
  }

  handleDateSelect(date) {
    this.setState({
      startDate: date

    })
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.updateInterviewDate(this.props.curJob._id, this.state.startDate);
    this.props.close(e);

  }



  render() {
    return (
      <div>
        <form>
          <label>Interview Date {this.props.curJob._id}</label>
          <DatePicker
            selected={this.state.startDate}
            onChange={this.handleDateSelect.bind(this)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa"

          />
          <button onClick={this.handleSubmit.bind(this)}>Update Interview Date</button>
        </form>


      </div>
    )
  }







}













export default InterviewDate;