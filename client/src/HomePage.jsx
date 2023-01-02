/* eslint-disable no-console */
import React, { component } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import {
  IconButton,
  Button,
  Modal,
  Box,
  Grid,
  AppBar,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { yellow, blue, orange, green } from "@mui/material/colors";
import Fab from "@mui/material/Fab";
import Navbar from "./Components/Navbar.jsx";
import JobWebsites from "./Components/JobWebsites.jsx";
import AddApplication from "./Components/AddApplication.jsx";
import AppliedList from "./Components/AppliedList.jsx";
import ApplicationDetails from "./Components/ApplicationDetails.jsx";
import InterviewingList from "./Components/InterviewingList.jsx";
import Messages from "./Components/Messages.jsx";
import InterviewDate from "./Components/InterviewDate.jsx";
import OfferList from "./Components/OfferList.jsx";
import OfferJobEntryCard from "./Components/OfferJobCard.jsx";
import InterviewingJobEntryCard from "./Components/InterviewingJobCard.jsx";
import PendingEntry from "./Components/PendingEntry.jsx";
import RejJobEntryCard from "./Components/RejJobEntryCard.jsx";


const style1 = {
  verticalAlign: "top",
  border: "2px solid White",
  margin: "5px",
  backgroundColor: "white",
  maxWidth: "500",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "91vh",
  borderRadius: "8px",
};
const listContainerStyle = {
  verticalAlign: "top",
  marginTop: "70px",
  backgroundColor: "white",
  minWidth: "350px",
  maxWidth: "400px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  height: "85vh",
  overflow: "auto",
  scrollbarWidth: "thin",
};

const gridStyle = {
  position: "fixed",
  minWidth: "330px",
  maxWidth: "345px",
  height: "45px",
  backgroundColor: "white",
  marginTop: "0",
};

class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allApplications: [],
      displayed: [],
      curJob: null,
      addNewAppPop: false,
      updatePopSeen: false,
      searchKeywords:"",
      pending: [],
      rejected: [],
      interviews: [],
      offers: [],
    };
  }

  componentDidMount() {
    this.displayApplications();
    this.displayInterviews();
    this.displayOffers();
    this.displayRejected();
    this.displayPending();
  }

  displayApplications() {
    axios
      .get("/api/allApplications")
      .then((allJobs) => {
        // console.log("This is all the job applications:", allJobs.data);
        this.setState({
          allApplications: allJobs.data,
          displayed: allJobs.data,
        });
      })
      .catch((err) => console.log("Err updating the status!", err));
  }

  displayPending() {
    axios
      .get("/api/pending")
      .then((jobs) => {
        this.setState({
          pending: jobs.data,
        });
      })
      .catch((err) => console.log("Err getting jobs from API", err));
  }

  displayInterviews() {
    axios
      .get("/api/interviewing")
      .then((jobs) => {
        this.setState({
          interviews: jobs.data,
        });
      })
      .catch((err) => console.log("Err getting jobs from API", err));
  }

  displayOffers() {
    axios
      .get("/api/offers")
      .then((jobs) => {
        this.setState({
          offers: jobs.data,
        });
      })
      .catch((err) => console.log("Err getting jobs from API", err));
  }

  displayRejected() {
    axios
      .get("/api/rejected")
      .then((jobs) => {
        this.setState({
          rejected: jobs.data,
        });
      })
      .catch((err) => console.log("Err getting jobs from API", err));
  }

  addNewApplication(newAppData) {
    axios
      .post("/api/allApplications", newAppData)
      .then((response) => {
        console.log("Sucess adding a new application!");
        this.displayApplications();
        this.displayPending();
      })
      .catch((err) => console.log("Err adding a new application!"));
  }

  deleteOne(applicationObj) {
    const { _id } = applicationObj;
    console.log("this is _id:", _id);
    axios
      .delete(`/api/allApplications/:${_id}`, { data: { _id: `${_id}` } })
      .then((res) => {
        console.log("Success Deleted current application!");
      })
      .then(() => {
        this.displayApplications();
        this.displayInterviews();
        this.displayPending();
        this.displayOffers();
      })
      .catch((err) => console.log("Err Deleting!", err));
  }

  clickUpdateBtn(e) {
    e.preventDefault();
    const { _id } = this.state.curJob;
    const applicationToUpdate = this.state.curJob;
    this.setState({
      appToUpdate: applicationToUpdate,
      appToUpdate_id: _id,
      updatePopSeen: !this.state.updatePopSeen,
    });
  }

  updateNotes(_id, newNotes) {
    const updateData = { _id: `${_id}`, newNotes };
    axios
      .patch(`/api/allApplications/${_id}/notes`, updateData)
      .then((response) => {
        console.log("Sucess updating the notes!", response); // reponse empty
        const updated = this.state.allApplications.filter(
          (ele) => ele._id === _id
        )[0];
        this.setState({
          curJob: updated,
        });
      })
      .then(() => this.displayApplications())
      .catch((err) => console.log("Err updating the notes!", err));
  }

  clickApplication(jobTile, company) {
    const matched = this.state.allApplications.filter(
      (ele) => ele.job_title === jobTile && ele.company_name === company
    );
    this.setState({
      curJob: matched[0],
      updatePopSeen: false,
    });
  }



  clickCloseDetailsIcon(e) {
    this.setState({
      updatePopSeen: false,
    });
  }

  clickRejBtn(e) {
    const _id = e.currentTarget.id.split("-")[0];
    const updateStatusData = { _id: `${_id}`, newStatus: "Rejected" };
    axios
      .patch(`/api/allApplications/${_id}/status`, updateStatusData)
      .then((response) => {
        console.log("Sucess update the status to rejected!");
        this.displayRejected();
      })
      .then(() => {
        this.displayInterviews();
        this.displayPending();

        this.displayApplications();
      })
      .catch((err) => console.log("err updating status to rejected!", err));
  }

  clickInterviewBtn(e, _id) {
    // const _id = e.currentTarget.id.split("-")[0];
    const updateStatusData = { _id: `${_id}`, newStatus: "Interviewing" };
    axios
      .patch(`/api/allApplications/${_id}/status`, updateStatusData)
      .then((response) => {
        console.log("Sucess update the status to interviewing!");
        this.displayApplications();
        this.displayInterviews();
        this.displayPending();
      })
      .catch((err) => console.log("err updating status to interviewing!", err));
  }

  updateInterviewDate(_id, interviewDate) {
    const updateInterviewDateData = {
      _id: `${_id}`,
      interviewDate,
    };

    axios
      .patch(
        `/api/allApplications/${_id}/interview_date`,
        updateInterviewDateData
      )
      .then((response) => {
        console.log("Sucess update the interview date!");

        this.displayInterviews();
        this.displayApplications();
        this.displayPending();
      })
      .catch((err) => console.log("err updating interview date!", err));
  }

  onChangeKeyword(e) {
    this.setState({searchKeywords: e.target.value});
  }

  search(keyword) {
    const allApplicationsObjs = this.state.allApplications;
    const displayedList = this.state.displayed;

    if (keyword.length < 2) {
      this.displayApplications();
    }
    const filtered = allApplicationsObjs?.filter(
      (obj) =>
        obj.job_title.toLowerCase().includes(keyword.toLowerCase()) ||
        obj.company_name.toLowerCase().includes(keyword.toLowerCase()) ||
        obj.notes.toLowerCase().includes(keyword.toLowerCase()) ||
        obj.status.toLowerCase().includes(keyword.toLowerCase())
    );

    this.setState({ displayed: filtered });
  }

  handleAddNewAppModalClose(e) {
    this.setState({
      addNewAppPop: false,
    });
  }

  updateToOffer(e, _id) {
    const updateStatusData = { _id: `${_id}`, newStatus: "OFFER" };
    axios
      .patch(`/api/allApplications/${_id}/status`, updateStatusData)
      .then((response) => {
        console.log("Sucess update the status to OFFER!");
        this.displayApplications();
        this.displayInterviews();
        this.displayOffers();
      })
      .catch((err) => console.log("err updating status to OFFER!", err));
  }

  updateOfferDate(_id, offerDate) {
    const updateOfferDateData = {
      _id: `${_id}`,
      offerDate,
    };

    axios
      .patch(`/api/allApplications/${_id}/offer_date`, updateOfferDateData)
      .then((response) => {
        console.log("Sucess update the offer date!");
        this.displayApplications();
        this.displayInterviews();
        this.displayOffers();
      })
      .catch((err) => console.log("err updating interview date!", err));
  }

  /** *********** rendering parts **************** */

  render() {
    return (
      <div id="main">
        <Navbar
          onChangeKeyword = {this.onChangeKeyword.bind(this)}
          searchKeywords = {this.state.searchKeywords}
          search={this.search.bind(this)}
          data={[
            this.state.interviews.length,
            this.state.pending.length,
            this.state.offers.length,
            this.state.rejected.length,
          ]}
        />
        <div className="row-1">
          <Box
            style={{
              ...style1,
              marginTop: "5px",
              marginRight: "10px",
            }}
          >
            <Messages
              applications={this.state.allApplications}
              interviews={this.state.interviews}
              rejects={this.state.rejected}
              offers={this.state.offers}
            />
            <JobWebsites />
          </Box>

          <Box style={{ ...style1 }}>
            <Grid style={{ ...gridStyle }}>
              {this.state.searchKeywords.length < 2
              ? <Typography style={{ padding: "10px", fontWeight: "600" }}>
              All applications: {this.state.allApplications.length}
            </Typography>
            : <Typography style={{ padding: "10px", fontWeight: "600" }}>
            Filtered Applications: {this.state.displayed.length}
          </Typography>

              }

              <Tooltip title="Add an application">
                <Fab
                  size="small"
                  sx={{
                    color: blue[700],
                    position: "absolute",
                    bottom: -10,
                    right: 20,
                  }}
                >
                  <AddIcon
                    onClick={(e) => this.setState({ addNewAppPop: true })}
                  />
                </Fab>
              </Tooltip>
            </Grid>

            <Box style={{ ...listContainerStyle }}>
              <AppliedList
                jobApps={this.state.displayed}
                popDetails={this.clickApplication.bind(this)}
                delete={this.deleteOne.bind(this)}
                clickUpdateBtn={this.clickUpdateBtn.bind(this)}
                clickRejBtn={this.clickRejBtn.bind(this)}
                clickInterviewBtn={this.clickInterviewBtn.bind(this)}
                clickCloseDetailsIcon={this.clickCloseDetailsIcon.bind(this)}
                updateDetails={this.state.updatePopSeen}
                updateNotes={this.updateNotes.bind(this)}
                updateInterviewDate={this.updateInterviewDate.bind(this)}
              />
            </Box>
          </Box>
          <Box style={{ ...style1 }}>
            <Grid style={{ ...gridStyle }}>
              <Typography
                style={{
                  padding: "10px",
                  color: green[900],
                  fontWeight: "600",
                }}
              >
                Pending: {this.state.pending.length}
              </Typography>
            </Grid>
            <Box style={{ ...listContainerStyle }}>
              {this.state.pending.map((app) => (
                <PendingEntry
                  key={app._id}
                  curJob={app}
                  companyName={app.company_name}
                  jobTitle={app.job_title}
                  timeStamp="xxxxdays"
                />
              ))}

              {/* <PendingJobEntryCard /> */}
            </Box>
          </Box>

          <Box style={{ ...style1 }}>
            <Grid style={{ ...gridStyle }}>
              <Typography
                style={{ padding: "10px", color: blue[900], fontWeight: "600" }}
              >
                Interviewing: {this.state.interviews.length}
              </Typography>
            </Grid>
            <Box style={{ ...listContainerStyle }}>
              <InterviewingList
                interviews={this.state.interviews}
                clickRejBtn={this.clickRejBtn.bind(this)}
                // clickOfferBtn={this.clickOfferBtn.bind(this)}
                updateOfferDate={this.updateOfferDate.bind(this)}
                updateToOffer={this.updateToOffer.bind(this)}
              />
            </Box>
          </Box>

          <Box style={{ ...style1 }}>
            <Grid style={{ ...gridStyle }}>
              <Typography
                style={{
                  padding: "10px",
                  color: orange[900],
                  fontWeight: "600",
                }}
              >
                Offers: {this.state.offers.length}
              </Typography>
            </Grid>
            <Box style={{ ...listContainerStyle }}>
              <OfferList offers={this.state.offers} />
            </Box>
          </Box>

          {this.state.addNewAppPop ? (
            <Modal
              open={this.state.addNewAppPop}
              onClose={this.handleAddNewAppModalClose.bind(this)}
            >
              <Box>
                {" "}
                <AddApplication
                  handleAddition={this.addNewApplication.bind(this)}
                />{" "}
              </Box>
            </Modal>
          ) : null}
        </div>
      </div>
    );
  }
}

export default HomePage
