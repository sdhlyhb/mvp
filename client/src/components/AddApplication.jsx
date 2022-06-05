import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


class AddApplication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date()
    };
    this.handleDateSelect = this.handleDateSelect.bind(this);

  }

  handleDateSelect(date) {
    this.setState({
      startDate: date
    })
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

          <input type="submit" value="Submit" />

        </form>

      </div>

    )
  }



}







export default AddApplication;