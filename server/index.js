const express = require('express');
let app = express();
const db = require('../database/index.js');


app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/../client/dist'));



app.get('/api/allApplications', (req, res) => {
  return db.showAll()
    .then(jobs => {
      console.log('all job applicaitons:', jobs);
      res.send(jobs);
    })
    .catch(err => {
      console.log('err getting all the jobs!', err);
      res.status(404).send(err);
    })

})

app.post('/api/allApplications', (req, res) => {
  console.log('this is the req.body:', req.body);
  let jobData = req.body;
  return db.saveOneApplication(jobData)
    .then((response) => {
      console.log('Sucess post an application!');
      res.status(201).send('Success Posting!');
    })
})




let port = 3001;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});