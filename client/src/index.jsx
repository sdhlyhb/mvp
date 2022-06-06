import React from 'react';
import ReactDOM from 'react-dom';
import JobWebsites from './Components/JobWebsites.jsx';
import AddApplication from './Components/AddApplication.jsx';
import AppliedList from './Components/AppliedList.jsx';
import axios from 'axios';




class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allApplications: []

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
  }


  render() {
    return(

      <div>
        <h1>Job Application Tracker</h1>

        <div>
          <JobWebsites />
        </div>
        <AddApplication />
        <AppliedList jobApps = {this.state.allApplications}/>

      </div>


    )
  }




};







ReactDOM.render(<App />, document.getElementById('app'));