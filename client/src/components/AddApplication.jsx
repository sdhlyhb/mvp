import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


class AddApplication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(),
      selectedOption: ''
    };
    this.handleDateSelect = this.handleDateSelect.bind(this);
    this.onValueChange = this.onValueChange.bind(this);

  }

  handleDateSelect(date) {
    this.setState({
      startDate: date,

    })
  }

  onValueChange(event) {
    this.setState({
      selectedOption: event.target.value
    });
  }




  render() {
    return (
      <div>
        <h3>This is the add new job Application part</h3>
        <form>
          <label>Job Title</label>
          <input type="text" name="jobTitle" />
          <br></br>
          <label>Company</label>
          <input type="text" name="Company" />
          <br></br>
          <label>Application Date</label>
          <DatePicker
            selected={this.state.startDate}
            onSelect={this.handleDateSelect} //when day is clicked

          />
          <label>Job type</label>
          <div >
            <input type="radio" value="Full-Time" name="jobtype" checked={this.state.selectedOption === "Full-Time"} onChange={this.onValueChange}/> Full-Time
            <input type="radio" value="Part-Time" name="jobtype" checked={this.state.selectedOption === "Part-Time"} onChange={this.onValueChange}/> Part-time
            <input type="radio" value="Contract" name="jobtype" checked={this.state.selectedOption === "Contract"} onChange={this.onValueChange}/> Contract
          </div>

          <label>Job Post URL</label>
          <input type="text" name="jobPostUrl"></input>
          <br></br>

          <label>Notes</label>
          <input type="text" name="notes"></input>

          <input type="submit" value="Submit" />

        </form>

      </div>

    )
  }



}







export default AddApplication;