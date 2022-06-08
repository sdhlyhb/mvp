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

});

app.post('/api/allApplications', (req, res) => {
  console.log('this is the POST req.body:', req.body);
  let jobData = req.body;
  return db.saveOneApplication(jobData)
    .then((response) => {
      console.log('Sucess post an application!');
      res.status(201).send('Success Posting!');
    })
    .catch(err => {
      console.log('Err posting!', err);
      res.status(501).send(err);

    })
});

app.patch('/api/allApplications', (req, res) => {
  console.log('This is the PATCH req.body:', req.body);
  console.log('This is req.params in PATCH:', req.params);
  let newNotes = req.body.newNotes;
  let _id = req.body._id;
  return db.updateNotes(newNotes, _id)
    .then(response => {
      console.log('Success Update notes!');
      res.status(201).send(response);
    })
    .catch(err => {
      console.log('Err updating notes', err);
      res.status(501).send(err);
    })
})

app.delete('/api/allApplications', (req, res) => {
  console.log('This is req.body in DELETE:', req.body);
  console.log('This is req.params in DELETE:', req.params);
  let objToDelete = req.body;
  db.deleteOneApplication(objToDelete)
    .then((response) => {
      console.log('Success deleted one application!');
      return db.showAll();
    })
    .then((result) => res.status(200).send(result))
    .catch(err => {
      console.log('Err Deleting one application!', err);
      res.status(422).send(err); //422: unprocessable entity
    })
})





let port = 3001;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});