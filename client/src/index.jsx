import React, {component} from 'react';
import ReactDOM from 'react-dom';
import JobWebsites from './Components/JobWebsites.jsx';
import AddApplication from './Components/AddApplication.jsx';
import AppliedList from './Components/AppliedList.jsx';
import ApplicationDetails from './Components/ApplicationDetails.jsx'
import axios from 'axios';




class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allApplications: [],
      curJob: null,
      detailPopSeen: false

    }
  }

  componentDidMount() {
    this.displayApplications();
  }







  displayApplications() {
    axios.get('/api/allApplications')
      .then(allJobs => {
        console.log('This is all the job applications:', allJobs.data);
        this.setState({allApplications: allJobs.data});
      })
      .catch(err => console.log('Err updating the status!', err));
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
    axios.delete(`/api/allApplications`, {data:{_id: `${_id}`}})
      .then(res => {
        console.log('Success Deleted current application!');
      })
      .then(() => this.displayApplications())
      .catch(err => console.log('Err Deleting!', err))

  }








  clickApplication(jobTile, company) {
    let matched = this.state.allApplications.filter(ele => {
      return (ele.job_title === jobTile && ele.company_name === company );
    })
    this.setState({
      curJob: matched[0],
      detailPopSeen:!this.state.detailPopSeen
    })


  };



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

        {this.state.detailPopSeen? <ApplicationDetails clickedJob = {this.state.curJob}/> : null}

      </div>


    )
  }




};







ReactDOM.render(<App />, document.getElementById('app'));