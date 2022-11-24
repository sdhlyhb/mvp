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
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { yellow, blue, orange } from "@mui/material/colors";
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
import PendingJobEntryCard from "./Components/PendingJobEntryCard.jsx";
import RejJobEntryCard from "./Components/RejJobEntryCard.jsx";

const style1 = {
  verticalAlign: "top",
  border: "1px solid",
  margin: "5px",
  backgroundColor: "white",
  width: "auto",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  minHeight: "90vh",
  maxHeight: "95vh",
};
const listContainerStyle = {
  verticalAlign: "top",
  marginTop: "45px",
  backgroundColor: "white",
  maxWidth: "450px",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  minHeight: "90vh",
  maxHeight: "95vh",
  overflowY: "scroll",
  overflowX: "hidden",
};

const gridStyle = {
  position: "fixed",
  minWidth: "330px",
  maxWidth: "345px",
  height: "45px",
  backgroundColor: "white",
  marginTop: "0",
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allApplications: [],
      curJob: null,
      detailPopSeen: false,
      updatePopSeen: false,
      appToUpdate: null,
      appToUpdate_id: null,
      rejected: [],
      interviews: [],
      interviewPopSeen: false,
      offers: [],
      searchKey: "",
    };
  }

  componentDidMount() {
    this.displayApplications();
    this.displayInterviews();
    this.displayOffers();
    this.displayRejected();
  }

  displayApplications() {
    axios
      .get("/api/allApplications")
      .then((allJobs) => {
        console.log("This is all the job applications:", allJobs.data);
        this.setState({ allApplications: allJobs.data });
      })
      .catch((err) => console.log("Err updating the status!", err));
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
      .then(() => this.displayApplications())
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
      .patch(`/api/allApplications/:${_id}/notes`, updateData)
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
      detailPopSeen: true,
      updatePopSeen: false,
      interviewPopSeen: false,
    });
  }

  clickCloseIcon(e) {
    this.setState({
      updatePopSeen: false,
    });
  }

  clickCloseDetailsIcon(e) {
    this.setState({
      detailPopSeen: false,
      updatePopSeen: false,
      interviewPopSeen: false,
    });
  }

  clickRejBtn(e) {
    const _id = e.currentTarget.id.split("-")[0];
    const updateStatusData = { _id: `${_id}`, newStatus: "Rejected" };
    axios
      .patch(`/api/allApplications/:${_id}/status`, updateStatusData)
      .then((response) => {
        console.log("Sucess update the status to rejected!");
        this.displayRejected();
      })
      .then(() => {
        document.getElementById(`${_id}-listDiv`).className = "";

        document.getElementById(`${_id}-listDiv`).classList.add("crossed-line");

        this.displayInterviews();

        this.displayApplications();
      })
      .catch((err) => console.log("err updating status to rejected!", err));
  }

  clickInterviewBtn(e) {
    const _id = e.currentTarget.id.split("-")[0];
    const updateStatusData = { _id: `${_id}`, newStatus: "Interviewing" };
    axios
      .patch(`/api/allApplications/:${_id}/status`, updateStatusData)
      .then((response) => {
        console.log("Sucess update the status to interviewing!");

        this.setState({
          interviewPopSeen: true,
        });
      })
      .then(() => {
        this.displayInterviews();
        document.getElementById(`${_id}-listDiv`).className = "";

        document.getElementById(`${_id}-listDiv`).classList.add("highlight");
      })
      .then(() => {
        this.displayApplications();
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
        `/api/allApplications/:${_id}/interview_date`,
        updateInterviewDateData
      )
      .then((response) => {
        console.log("Sucess update the interview date!");

        this.displayInterviews();
      })
      .then(() => {
        this.displayApplications();
      })
      .catch((err) => console.log("err updating interview date!", err));
  }

  clickOfferBtn(e) {
    const _id = e.currentTarget.id.split("-")[0];
    const updateStatusData = { _id: `${_id}`, newStatus: "OFFER" };
    axios
      .patch(`/api/allApplications/:${_id}/status`, updateStatusData)
      .then((response) => {
        console.log("Sucess update the status to OFFER!");
        this.displayOffers();
      })
      .then(() => {
        this.displayInterviews();

        this.displayApplications();
        document.getElementById(`${_id}-listDiv`).className = "";
        document
          .getElementById(`${_id}-listDiv`)
          .classList.add("offer-highlight");
      })
      .catch((err) => console.log("err updating status to OFFER!", err));
  }

  search(keyword) {
    const allApplicationsObjs = this.state.allApplications;

    if (keyword.length < 2) {
      this.displayApplications();
    }
    const filtered = allApplicationsObjs.filter(
      (obj) =>
        obj.job_title.toLowerCase().includes(keyword.toLowerCase()) ||
        obj.company_name.toLowerCase().includes(keyword.toLowerCase()) ||
        obj.notes.toLowerCase().includes(keyword.toLowerCase()) ||
        obj.status.toLowerCase().includes(keyword.toLowerCase())
    );

    this.setState({ allApplications: filtered });
  }

  onChangeKeyword(e) {
    const keyword = e.target.value;
    this.setState({ searchKey: keyword });
  }

  clickViewAllBtn(e) {
    this.displayApplications();
    this.setState({ searchKey: "" });
  }

  /** *********** rendering parts **************** */

  render() {
    return (
      <div id="main">
        <Navbar />
        <div className="row-1">
          <Box
            style={{
              ...listContainerStyle,
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
              <Typography style={{ padding: "10px" }}>
                All applications: 0
              </Typography>
            </Grid>

            <Box style={{ ...listContainerStyle }}>
              <OfferJobEntryCard />
              <RejJobEntryCard />
              <RejJobEntryCard />
              <PendingJobEntryCard />
              <InterviewingJobEntryCard />
              <PendingJobEntryCard />
              <InterviewingJobEntryCard />
              <PendingJobEntryCard />
              <Fab
                size="small"
                sx={{
                  color: blue[700],
                  position: "absolute",
                  bottom: 730,
                }}
              >
                <AddIcon />
              </Fab>
            </Box>
          </Box>

          <Box style={{ ...style1 }}>
            <Grid style={{ ...gridStyle }}>
              <Typography style={{ padding: "10px" }}>Offers: 0</Typography>
            </Grid>
            <Box style={{ ...listContainerStyle }}>
              <OfferJobEntryCard />
              <OfferJobEntryCard />
              <OfferJobEntryCard />
              <OfferJobEntryCard />
              <OfferJobEntryCard />
              <OfferJobEntryCard />
              <OfferJobEntryCard />
              <OfferJobEntryCard />
            </Box>
          </Box>

          <Box style={{ ...style1 }}>
            <Grid style={{ ...gridStyle }}>
              <Typography style={{ padding: "10px" }}>
                Interviewing: 0
              </Typography>
            </Grid>
            <Box style={{ ...listContainerStyle }}>
              <InterviewingJobEntryCard />
              <InterviewingJobEntryCard />
              <InterviewingJobEntryCard />
              <InterviewingJobEntryCard />
              <InterviewingJobEntryCard />
            </Box>
          </Box>
          <Box style={{ ...style1 }}>
            <Grid style={{ ...gridStyle }}>
              <Typography style={{ padding: "10px" }}>Pending: 0</Typography>
            </Grid>
            <Box style={{ ...listContainerStyle }}>
              <PendingJobEntryCard />
              <PendingJobEntryCard />
              <PendingJobEntryCard />
              <PendingJobEntryCard />
              <PendingJobEntryCard />
              <PendingJobEntryCard />
              <PendingJobEntryCard />
            </Box>
          </Box>
        </div>

        {/* <div className="row-1">
          <Messages
            applications={this.state.allApplications}
            interviews={this.state.interviews}
            rejects={this.state.rejected}
            offers={this.state.offers}
          />
          <InterviewingList
            interviews={this.state.interviews}
            clickRejBtn={this.clickRejBtn.bind(this)}
            clickOfferBtn={this.clickOfferBtn.bind(this)}
          />
          <OfferJobEntryCard />
        </div>

        <div className="row-2">
          <JobWebsites />
          <OfferList offers={this.state.offers} />
        </div>

        <div className="row-3">
          <AddApplication handleAddition={this.addNewApplication.bind(this)} />
          <AppliedList
            jobApps={this.state.allApplications}
            popDetails={this.clickApplication.bind(this)}
            delete={this.deleteOne.bind(this)}
            search={this.search.bind(this)}
            onChangeKeyword={this.onChangeKeyword.bind(this)}
            keyword={this.state.searchKey}
            clickViewAllBtn={this.clickViewAllBtn.bind(this)}
          />
        </div>

        {this.state.detailPopSeen ? (
          <ApplicationDetails
            clickedJob={this.state.curJob}
            clickUpdateBtn={this.clickUpdateBtn.bind(this)}
            clickRejBtn={this.clickRejBtn.bind(this)}
            clickInterviewBtn={this.clickInterviewBtn.bind(this)}
            clickCloseDetailsIcon={this.clickCloseDetailsIcon.bind(this)}
            updateDetails={this.state.updatePopSeen}
            updateNotes={this.updateNotes.bind(this)}
          />
        ) : null}

        {this.state.interviewPopSeen ? (
          <InterviewDate
            updateInterviewDate={this.updateInterviewDate.bind(this)}
            curJob={this.state.curJob}
            close={this.clickCloseDetailsIcon.bind(this)}
          />
        ) : null} */}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
