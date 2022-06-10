const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/applicationTracker', { 'useNewUrlParser': true, 'useUnifiedTopology': true});

let applicationSchema = new mongoose.Schema({
  // TODO: your schema here!
  // job_id: {type: Number, unique: true, required: true, index: true},
  job_title: String,
  company_name: String,
  application_date: {type: Date, default: Date.now},
  interview_date:{type: Date, default:null},
  job_type: String,
  location_type: {type: String, default: "On-site" },
  job_url: String,
  status: {type: String, default: "Pending"},
  notes: String
});

let Application = mongoose.model('Application', applicationSchema);

let saveOneApplication = (obj) => {

  return Application.create(obj);

}

let showAll = () => {
  return Application.find({}).sort({application_date: -1});
}

let deleteOneApplication = (obj) => {
  return Application.deleteOne(obj);
}

let updateNotes = (notesString, _id) => {
  return Application.findOneAndUpdate({'_id': _id}, {$set:{notes: notesString}},{upsert: true} );
}

let updateStatus = (newStatus, _id) => {
  return Application.findOneAndUpdate({'_id': _id}, {$set:{status: newStatus}},{upsert: true} );

}

let updateInterviewDate = (newDate, _id) => {
  return Application.findOneAndUpdate({'_id': _id}, {$set:{interview_date: newDate}},{upsert: true} );

}

let getAllInterviewingJobs = () => {
  return Application.find({'status': 'Interviewing'}).sort({interview_date: 1});
}

let getAllOffers = () => {
  return Application.find({'status': 'OFFER'}).sort({interview_date: 1});
}

let getAllRejected = () => {
  return Application.find({'status': 'Rejected'}).sort({application_date: -1});
}

// let getDataByKeyword = (keyword) => {
//   return Application.find($or:[{"job_title": keyword},{"company_name": keyword},{"job_type": keyword}, {"location_type": keyword} ]);
// }


module.exports = {
  saveOneApplication,
  showAll,
  deleteOneApplication,
  updateNotes,
  updateStatus,
  getAllInterviewingJobs,
  updateInterviewDate,
  getAllOffers,
  getAllRejected


};