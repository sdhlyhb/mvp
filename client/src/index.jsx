import React from 'react';
import ReactDOM from 'react-dom';
import JobWebsites from './Components/JobWebsites.jsx';
import AddApplication from './Components/AddApplication.jsx';
import AppliedList from './Components/AppliedList.jsx';
class App extends React.Component {

  render() {
    return(

      <div>
        <h1>Job Application Tracker</h1>

        <div>
          <JobWebsites />
        </div>
        <AddApplication />
        <AppliedList />

      </div>


    )
  }




};







ReactDOM.render(<App />, document.getElementById('app'));