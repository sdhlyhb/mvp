const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/jobFetcher', { 'useNewUrlParser': true, 'useUnifiedTopology': true, 'useFindAndModify': false, 'useCreateIndex': true});

let jobSchema = new mongoose.Schema({
  // TODO: your schema here!
  job_id: {type: Number, unique: true, required: true, index: true},


});