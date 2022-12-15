const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const { startDatabase } = require("./database/mongo");
const {
  insertRecord,
  getRecords,
  deleteRecord,
  updateRecord,
} = require("./database/dataFeed");

// defining the Express app
const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan("combined"));

// defining an endpoint to return all records
app.get("/", async (req, res) => {
  res.send(await getRecords());
});

app.post("/", async (req, res) => {
  const newRecord = req.body;
  await insertRecord(newRecord);
  res.send({ message: "New record inserted." });
});

// endpoint to delete a record
app.delete("/:id", async (req, res) => {
  await deleteRecord(req.params.id);
  res.send({ message: "Record removed." });
});

// endpoint to update a record
app.put("/:id", async (req, res) => {
  const updatedRecord = req.body;
  await updateRecord(req.params.id, updatedRecord);
  res.send({ message: "Record updated." });
});

// start the in-memory MongoDB instance
startDatabase().then(async () => {
  // start the server
  app.listen(3001, async () => {
    console.log("listening on port 3001");
  });
});
