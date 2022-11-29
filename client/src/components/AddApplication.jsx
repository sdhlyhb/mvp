import React from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { yellow, blue, orange, red, grey } from "@mui/material/colors";
import {
  IconButton,
  Button,
  Modal,
  Box,
  Grid,
  Tooltip,
  Typography,
  Link,
  TextField,
  styled,
  Paper,
  Chip,
  Stack,
  Avatar,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

class AddApplication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobTitle: null,
      companyName: null,
      startDate: dayjs(new Date().toISOString()),
      selectedOption: "", // job type
      locType: "On-site", // default
      postUrl: null,
      notes: null,
    };
    this.handleTitleInput = this.handleTitleInput.bind(this);
    this.handleCompanyNameInput = this.handleCompanyNameInput.bind(this);
    this.handleDateSelect = this.handleDateSelect.bind(this);
    this.onValueChange = this.onValueChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleLocTypeInputChange = this.handleLocTypeInputChange.bind(this);
    this.handlePostUrlInputChange = this.handlePostUrlInputChange.bind(this);
    this.handleNotesInputChange = this.handleNotesInputChange.bind(this);
  }

  handleTitleInput(e) {
    this.setState({
      jobTitle: e.target.value,
    });
  }

  handleCompanyNameInput(e) {
    this.setState({
      companyName: e.target.value,
    });
  }

  handleDateSelect(date) {
    this.setState({
      startDate: date,
    });
  }

  onValueChange(e) {
    this.setState({
      selectedOption: e.target.value,
    });
  }

  handleLocTypeInputChange(e) {
    this.setState({
      locType: e.target.value,
    });
  }

  handlePostUrlInputChange(e) {
    this.setState({
      postUrl: e.target.value,
    });
  }

  handleNotesInputChange(e) {
    const notes = e.target.value;
    let processed = notes.replace(/\n/g, " ").replace(/\r/g, " ");
    processed = processed.replace(/, /g, "").replace(",", ";");
    this.setState({
      notes: processed,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const data = {
      job_title: this.state.jobTitle,
      company_name: this.state.companyName,
      application_date: this.state.startDate,
      job_type: this.state.selectedOption,
      location_type: this.state.locType,
      job_url: this.state.postUrl,
      notes: this.state.notes,
    };
    this.props.handleAddition(data);
    this.setState({
      job_title: "",
      company_name: "",
      job_url: "",
      notes: "",
    });
  }

  handleReset(e) {
    e.preventDefault();
    this.setState({
      job_title: "",
      company_name: "",
      job_url: "",
      notes: "",
    });
  }

  render() {
    return (
      <div>
        <form id="app-form">
          <Typography
            style={{
              fontFamily: "Arial",
              fontSize: "1rem",
              color: blue[700],
              fontWeight: 600,
            }}
            gutterBottom
          >
            Add a New Job Application
          </Typography>
          <Box>
            <Grid container xs={12} spacing={2}>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  label="Job Title"
                  name="jobTitle"
                  value={this.state.job_title}
                  onChange={this.handleTitleInput}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  label="Company"
                  name="Company"
                  value={this.state.company_name}
                  onChange={this.handleCompanyNameInput}
                />
              </Grid>
              <Grid item xs={12}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    label="Application Date"
                    inputFormat="MM/DD/YYYY"
                    value={this.state.startDate}
                    onChange={this.handleDateSelect}
                    renderInput={(params) => <TextField {...params} />}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12}>
                <FormControl>
                  <FormLabel>Job Type</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="jobType-radio-buttons-group-label"
                    defaultValue=""
                    name="jobType"
                    value={this.state.selectedOption}
                    onChange={this.onValueChange}
                  >
                    <FormControlLabel
                      value="Full-Time"
                      control={<Radio />}
                      label="Full-Time"
                    />
                    <FormControlLabel
                      value="Part-Time"
                      control={<Radio />}
                      label="Part-Time"
                    />
                    <FormControlLabel
                      value="Contractor"
                      control={<Radio />}
                      label="Contractor"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item={12}>
                <FormControl>
                  <FormLabel>Location Type</FormLabel>
                  <RadioGroup
                    row
                    aria-labelledby="locType-radio-buttons-group-label"
                    defaultValue="On-site"
                    name="locType"
                    value={this.state.locType}
                    onChange={this.handleLocTypeInputChange}
                  >
                    <FormControlLabel
                      value="On-site"
                      control={<Radio />}
                      label="On-Site"
                    />
                    <FormControlLabel
                      value="Remote"
                      control={<Radio />}
                      label="Remote"
                    />
                    <FormControlLabel
                      value="Hybrid"
                      control={<Radio />}
                      label="Hybrid"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12} >
                <TextField
                fullWidth
                  variant="outlined"
                  label="Job Post URL"
                  name="jobPostUrl"
                  value={this.state.job_url}
                  onChange={this.handlePostUrlInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                fullWidth
                  multiline
                  rows={4}
                  maxRows={20}
                  variant="outlined"
                  label="Notes"
                  name="notes"
                  value={this.state.notes}
                  onChange={this.handleNotesInputChange}
                />
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  size="small"
                  onClick={this.handleSubmit}
                >
                  Submit
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={this.handleReset}
                >
                  reset
                </Button>
              </Grid>
            </Grid>
          </Box>
        </form>
        {/* <form id="app-form">
          <h3>Add New Job Application</h3>
          <label>Job Title</label>
          <br />
          <input
            type="text"
            name="jobTitle"
            value={this.state.job_title}
            onChange={this.handleTitleInput}
          />
          <br />
          <label>Company</label>
          <br />
          <input
            type="text"
            name="Company"
            value={this.state.company_name}
            onChange={this.handleCompanyNameInput}
          />
          <br />
          <label>Application Date</label>
          <DatePicker
            selected={this.state.startDate}
            onSelect={this.handleDateSelect} // when day is clicked
          />
          <label>Job type</label>
          <div>
            <input
              type="radio"
              value="Full-Time"
              name="jobtype"
              checked={this.state.selectedOption === "Full-Time"}
              onChange={this.onValueChange}
            />{" "}
            Full-Time
            <input
              type="radio"
              value="Part-Time"
              name="jobtype"
              checked={this.state.selectedOption === "Part-Time"}
              onChange={this.onValueChange}
            />{" "}
            Part-time
            <input
              type="radio"
              value="Contract"
              name="jobtype"
              checked={this.state.selectedOption === "Contract"}
              onChange={this.onValueChange}
            />{" "}
            Contract
          </div>

          <label>Location type </label>
          <div>
            <input
              type="checkbox"
              value="On-site"
              name="locType"
              onChange={this.handleLocTypeInputChange}
              checked={this.state.locType === "On-site"}
            />{" "}
            On-site
            <input
              type="checkbox"
              value="Remote"
              name="locType"
              onChange={this.handleLocTypeInputChange}
              checked={this.state.locType === "Remote"}
            />{" "}
            Remote
            <input
              type="checkbox"
              value="Hybrid"
              name="locType"
              onChange={this.handleLocTypeInputChange}
              checked={this.state.locType === "Hybrid"}
            />{" "}
            Hybrid
          </div>

          <label>Job Post URL</label>
          <br />
          <input
            type="text"
            name="jobPostUrl"
            value={this.state.job_url}
            onChange={this.handlePostUrlInputChange}
          />
          <br />

          <label>Notes</label>
          <br />
          <textarea
            type="text"
            name="notes"
            value={this.state.notes}
            onChange={this.handleNotesInputChange}
          />
          <br />

          <Button variant="contained" size="small" onClick={this.handleSubmit}>
            Add New Application
          </Button>
        </form> */}
      </div>
    );
  }
}

export default AddApplication;
