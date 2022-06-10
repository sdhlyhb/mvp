import React from 'react';


const JobWebsites = (props) => {
  let LinkedInUrl = 'https://www.linkedin.com/jobs/search/?distance=25.0&geoId=90000052&keywords=javascript';
  let IndeedUrl = 'https://www.indeed.com/jobs?q=javascript&l=Atlanta%2C%20GA&sc=0kf%3Aexplvl(ENTRY_LEVEL)&vjk=af0f2c14e9c9cff0&advn=2324357231341452';
  let GoogleUrl = 'https://careers.google.com/jobs/results/?distance=50&location=Atlanta,%20GA,%20USA&q=javascript';
  let DiceUrl = 'https://www.dice.com/jobs?q=javascript&location=Atlanta,%20GA,%20USA';
  return (
    <div>
      <h3>Searching Shortcuts</h3>
      <span><a href={LinkedInUrl} target='popup'>LinkedIn</a></span> {"   "}
      <span><a href={IndeedUrl} target='popup'>Indeed</a></span>{"   "}
      <span><a href={GoogleUrl} target='popup'>Google Careers</a></span>{"   "}
      <span><a href={DiceUrl} target='popup'>Dice</a></span>



    </div>
  )

}

export default JobWebsites;