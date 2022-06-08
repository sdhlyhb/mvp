import React, {component} from 'react';
import ReactDOM from 'react-dom';
import JobWebsites from './Components/JobWebsites.jsx';
import AddApplication from './Components/AddApplication.jsx';
import AppliedList from './Components/AppliedList.jsx';
import ApplicationDetails from './Components/ApplicationDetails.jsx'
import UpdateNotes from './Components/UpdateNotes.jsx';
import InterviewingList from './Components/InterviewingList.jsx';
import axios from 'axios';




class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allApplications: [],
      curJob: null,
      detailPopSeen: false,
      updatePopSeen: false,
      appToUpdate:null,
      appToUpdate_id: null,
      rejected:[],
      interviews:[]

    }
  }

  componentDidMount() {
    this.displayApplications();
    this.displayInterviews();
  }







  displayApplications() {
    axios.get('/api/allApplications')
      .then(allJobs => {
        console.log('This is all the job applications:', allJobs.data);
        this.setState({allApplications: allJobs.data});
      })
      .catch(err => console.log('Err updating the status!', err));
  };


  displayInterviews() {
    axios.get('/api/interviewing')
    .then(jobs => {
      this.setState({
        interviews: jobs.data
      })
    }).catch(err => console.log('Err getting jobs from API', err))
  };





  addNewApplication(newAppData) {
    axios.post('/api/allApplications', newAppData)
      .then(response => {
        console.log('Sucess adding a new application!');
        this.displayApplications();
    })
      .catch(err => console.log('Err adding a new application!'))

  };


  deleteOne(applicationObj) {
    let _id = applicationObj._id;
    console.log('this is _id:', _id);
    axios.delete(`/api/allApplications/;${_id}`, {data:{_id: `${_id}`}})
      .then(res => {
        console.log('Success Deleted current application!');
      })
      .then(() => this.displayApplications())
      .catch(err => console.log('Err Deleting!', err))

  };

  clickUpdateBtn(e) {
    e.preventDefault();
    var _id = this.state.curJob._id;
    var applicationToUpdate = this.state.curJob;
    this.setState({
      appToUpdate: applicationToUpdate,
      appToUpdate_id: _id,
      updatePopSeen: !this.state.updatePopSeen

    })
  };

  updateNotes(_id, newNotes) {
    let updateData = {_id: `${_id}`, newNotes: newNotes};
    axios.patch(`/api/allApplications/:${_id}/notes`, updateData)
      .then(response => {
        console.log('Sucess updating the notes!', response); //reponse empty
        let updated = this.state.allApplications.filter(ele=> ele._id ===_id)[0];
        this.setState({
          curJob: updated,
          updatePopSeen:false,
          detailPopSeen:false
        });


      })
      .then(() => this.displayApplications())
      .catch(err => console.log('Err updating the notes!', err));
  }








  clickApplication(jobTile, company) {
    let matched = this.state.allApplications.filter(ele => {
      return (ele.job_title === jobTile && ele.company_name === company );
    })
    this.setState({
      curJob: matched[0],
      detailPopSeen:true,
      updatePopSeen:false
    })


  };

  clickCloseIcon(e) {
    this.setState({
      updatePopSeen: false
    })
  }

  clickCloseDetailsIcon(e) {
    this.setState({
      detailPopSeen: false,
      updatePopSeen: false
    })
  }

  clickRejBtn(e) {
    var _id = e.currentTarget.id.split('-')[0];
    let updateStatusData = {_id: `${_id}`, newStatus: "Rejected"};
    axios.patch(`/api/allApplications/:${_id}/status`, updateStatusData)
      .then(response => {
        console.log('Sucess update the status to rejected!');
        var curRejJob = this.state.allApplications.filter(ele => ele._id===_id)[0];
        var rejJobs = this.state.rejected.concat(curRejJob);
        this.setState({
          rejected: rejJobs,
          detailPopSeen:false
        });
      })
      .then(()=> {

        document.getElementById(_id+'-listDiv').classList.add('crossed-line');
        this.displayInterviews();


        this.displayApplications();

      })
      .catch(err => console.log("err updating status to rejected!", err))

  }


  clickInterviewBtn(e) {
    var _id = e.currentTarget.id.split('-')[0];
    let updateStatusData = {_id: `${_id}`, newStatus: "Interviewing"};
    axios.patch(`/api/allApplications/:${_id}/status`, updateStatusData)
      .then(response => {
        console.log('Sucess update the status to interviewing!');
        document.getElementById(_id+'-listDiv').classList.remove('crossed-line');

      })
      .then(
        () => {
          this.displayInterviews();
        }

      )
      .then(() => {

        // document.getElementById(_id+'-listDiv').classList.add('crossed-line');


        this.displayApplications();

      })
      .catch(err => console.log("err updating status to interviewing!", err))

  }







  render() {
    return(

      <div>
        <h1>Job Application Tracker</h1>

        <div>
          <JobWebsites />
        </div>
        <AddApplication handleAddition = {this.addNewApplication.bind(this)}/>

        <AppliedList
          jobApps={this.state.allApplications}
          popDetails={this.clickApplication.bind(this)}
          delete = {this.deleteOne.bind(this)}
        />

        {this.state.detailPopSeen?
         <ApplicationDetails
        clickedJob = {this.state.curJob}
        clickUpdateBtn = {this.clickUpdateBtn.bind(this)}
        clickRejBtn = {this.clickRejBtn.bind(this)}
        clickInterviewBtn = {this.clickInterviewBtn.bind(this)}
        clickCloseDetailsIcon = {this.clickCloseDetailsIcon.bind(this)}

        /> : null}


        {this.state.updatePopSeen? <UpdateNotes
          _id={this.state.appToUpdate_id}
          clickCloseIcon = {this.clickCloseIcon.bind(this)}


          updateNotes={this.updateNotes.bind(this)}


        /> : null}

        <InterviewingList interviews = {this.state.interviews}/>

      </div>


    )
  }




};







ReactDOM.render(<App />, document.getElementById('app'));