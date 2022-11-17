const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/applicationTracker", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const applicationSchema = new mongoose.Schema({
  job_title: String,
  company_name: String,
  application_date: { type: Date, default: Date.now },
  interview_date: { type: Date, default: null },
  job_type: String,
  location_type: { type: String, default: "On-site" },
  job_url: String,
  status: { type: String, default: "Pending" },
  notes: String,
});

const shortcutSchema = new mongoose.Schema(
  {
    search_url: {
      type: String,
    },
    keywords: {
      type: String,
    },
  },
  { timestamp: true }
);

const Application = mongoose.model("Application", applicationSchema);
const Shortcut = mongoose.model("Shortcut", shortcutSchema);

const saveOneApplication = (obj) => Application.create(obj);

const saveOneShortcut = (obj) => Shortcut.create(obj);

const showAll = () => Application.find({}).sort({ application_date: -1 });

const showAllShortcuts = () => Shortcut.find({}).sort({ createAt: -1 });

const deleteOneApplication = (obj) => Application.deleteOne(obj);

const updateNotes = (notesString, _id) =>
  Application.findOneAndUpdate(
    { _id },
    { $set: { notes: notesString } },
    { upsert: true }
  );

const updateStatus = (newStatus, _id) =>
  Application.findOneAndUpdate(
    { _id },
    { $set: { status: newStatus } },
    { upsert: true }
  );

const updateInterviewDate = (newDate, _id) =>
  Application.findOneAndUpdate(
    { _id },
    { $set: { interview_date: newDate } },
    { upsert: true }
  );

const getAllInterviewingJobs = () =>
  Application.find({ status: "Interviewing" }).sort({ interview_date: 1 });

const getAllOffers = () =>
  Application.find({ status: "OFFER" }).sort({ interview_date: 1 });

const getAllRejected = () =>
  Application.find({ status: "Rejected" }).sort({ application_date: -1 });

module.exports = {
  saveOneApplication,
  showAll,
  deleteOneApplication,
  updateNotes,
  updateStatus,
  getAllInterviewingJobs,
  updateInterviewDate,
  getAllOffers,
  getAllRejected,
  saveOneShortcut,
  showAllShortcuts,
};
