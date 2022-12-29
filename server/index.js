const express = require("express");

const app = express();
const path = require("path");
const db = require("../database/index.js");
const helpers = require("../helperFns/helpers.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/../client/dist`));

app.get("/api/allApplications", (req, res) =>
  db
    .showAll()
    .then((jobs) => {
      console.log("all job applicaitons:", jobs);
      res.send(jobs);
    })
    .catch((err) => {
      console.log("err getting all the jobs!", err);
      res.status(500).send(err);
    })
);

app.post("/api/allApplications", (req, res) => {
  console.log("this is the POST req.body:", req.body);
  const jobData = req.body;
  return db
    .saveOneApplication(jobData)
    .then((response) => {
      console.log("Sucess post an application!");
      res.status(201).send("Success Posting!");
    })
    .catch((err) => {
      console.log("Err posting!", err);
      res.status(501).send(err);
    });
});

app.patch("/api/allApplications/:_id/notes", (req, res) => {
  console.log("This is the PATCH req.body:", req.body);
  const { newNotes } = req.body;
  const { _id } = req.body;
  return db
    .updateNotes(newNotes, _id)
    .then((response) => {
      console.log("Success Update notes!");
      res.status(201).send(response);
    })
    .catch((err) => {
      console.log("Err updating notes", err);
      res.status(501).send(err);
    });
});

app.patch("/api/allApplications/:_id/status", (req, res) => {
  console.log("This is the PATCH req.body:", req.body);
  const { newStatus } = req.body;
  const { _id } = req.body;
  return db
    .updateStatus(newStatus, _id)
    .then((response) => {
      console.log("Success Update status!");
      res.status(201).send("Sucess update status!");
    })
    .catch((err) => {
      console.log("Err updating status", err);
      res.status(501).send(err);
    });
});

app.patch("/api/allApplications/:_id/interview_date", (req, res) => {
  console.log("This is the PATCH req.body:", req.body);
  const newDate = req.body.interviewDate;
  const { _id } = req.body;
  return db
    .updateInterviewDate(newDate, _id)
    .then((response) => {
      console.log("Success Update interview date!");
      res.status(201).send(response);
    })
    .catch((err) => {
      console.log("Err updating interview date", err);
      res.status(501).send(err);
    });
});

app.patch("/api/allApplications/:_id/offer_date", (req, res) => {
  console.log("This is the PATCH req.body:", req.body);
  const newDate = req.body.offerDate;
  const { _id } = req.body;
  return db
    .updateOfferDate(newDate, _id)
    .then((response) => {
      console.log("Success Update offer date!");
      res.status(201).send(response);
    })
    .catch((err) => {
      console.log("Err updating offer date", err);
      res.status(501).send(err);
    });
});

app.delete("/api/allApplications/:_id", (req, res) => {
  console.log("This is req.body in DELETE:", req.body);
  const objToDelete = req.body;
  db.deleteOneApplication(objToDelete)
    .then((response) => {
      console.log("Success deleted one application!");
      return db.showAll();
    })
    .then((result) => res.status(200).send(result))
    .catch((err) => {
      console.log("Err Deleting one application!", err);
      res.status(500).send(err); // 422: unprocessable entity
    });
});

app.get("/api/interviewing", (req, res) =>
  db
    .getAllInterviewingJobs()
    .then((jobs) => {
      console.log("all interviewing job applicaitons:", jobs);
      res.status(200).send(jobs);
    })
    .catch((err) => {
      console.log("err getting all the interviewing jobs!", err);
      res.status(500).send(err);
    })
);

app.get("/api/pending", (req, res) =>
  db
    .getAllPending()
    .then((jobs) => {
      console.log("all pending job applicaitons:", jobs);
      res.status(200).send(jobs);
    })
    .catch((err) => {
      console.log("err getting all the pending jobs!", err);
      res.status(500).send(err);
    })
);

app.get("/api/offers", (req, res) =>
  db
    .getAllOffers()
    .then((jobs) => {
      console.log("all OFFERS:", jobs);
      res.status(200).send(jobs);
    })
    .catch((err) => {
      console.log("err getting all the OFFERS!", err);
      res.status(500).send(err);
    })
);

app.get("/api/rejected", (req, res) =>
  db
    .getAllRejected()
    .then((jobs) => {
      console.log("all Rejected:", jobs);
      res.status(200).send(jobs);
    })
    .catch((err) => {
      console.log("err getting all the rejected!", err);
      res.status(500).send(err);
    })
);

app.get("/api/allApplications/report", (req, res) =>
  db
    .showAll()
    .then((jobs) => {
      console.log("all job applicaitons:", jobs);
      const csv = helpers.jsonArrToCsv(JSON.parse(JSON.stringify(jobs)));
      res.status(200).send(csv);
    })
    .catch((err) => {
      console.log("err getting all the jobs!", err);
      res.status(500).send(err);
    })
);

app.get("/api/shortcuts", (req, res) =>
  db
    .showAllShortcuts()
    .then((urls) => res.status(200).send(urls))
    .catch((err) => {
      console.log("Err getting shortcuts urls", err);
      res.status(500).send(err);
    })
);

app.post("/api/shortcuts", (req, res) => {
  const urlObj = req.body;
  db.saveOneShortcut(urlObj)
    .then((response) => res.status(200).send(urlObj))
    .catch((err) => {
      console.log("Err adding shortcuts urls", err);
      res.status(500).send(err);
    });
});

app.delete("/api/shortcuts/:id", (req, res) => {
  const objId = req.params.id;
  console.log("this is req.params:", req.params);
  console.log("this is objId:", objId);
  db.deleteOneShortcutById(objId)
    .then((response) => {
      console.log("Success deleted one shortcut!");
      return db.showAllShortcuts();
    })
    .then((result) => res.status(200).send(result))
    .catch((err) => {
      console.log("Err Deleting one shortcut!", err);
      res.status(500).send(err);
    });
});

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

const port = 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
