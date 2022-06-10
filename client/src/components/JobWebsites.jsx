import React from 'react';


const JobWebsites = (props) => {
  let LinkedInUrl = 'https://www.linkedin.com/jobs/search/?distance=25.0&geoId=90000052&keywords=javascript';
  let IndeedUrl = 'https://www.indeed.com/jobs?q=javascript&l=Atlanta%2C%20GA&sc=0kf%3Aexplvl(ENTRY_LEVEL)&vjk=af0f2c14e9c9cff0&advn=2324357231341452';
  let GoogleUrl = 'https://careers.google.com/jobs/results/?distance=50&location=Atlanta,%20GA,%20USA&q=javascript';
  let ZipRecruiterUrl = 'https://www.ziprecruiter.com/jobs-search?search=javascript&location=Atlanta,%20GA';
  let baseUrls = [LinkedInUrl.split('/jobs')[0], IndeedUrl.split('/jobs')[0], GoogleUrl.split('/jobs')[0],ZipRecruiterUrl.split('/jobs')[0]]
  return (
    <div>
      <h3>Searching Shortcuts</h3>
      <span><img src={baseUrls[0]+'/favicon.ico'}/><a href={LinkedInUrl} target='popup'>LinkedIn</a></span> {"   "}
      <span><img src={baseUrls[1]+'/images/favicon.ico'}/><a href={IndeedUrl} target='popup'>Indeed</a></span>{"   "}
      <span><img src={baseUrls[2]+'/favicon.ico'}/><a href={GoogleUrl} target='popup'>Google Careers</a></span>{"   "}
      <span><img src={baseUrls[3]+'/favicon.ico'}/><a href={ZipRecruiterUrl} target='popup'>ZipRecruiter</a></span>



    </div>
  )

}

export default JobWebsites;