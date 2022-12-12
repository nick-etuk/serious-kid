import express from "express";
import { getQuestions } from "./questions/get-questions";
const cors = require("cors");

import { getBackendChanges } from "./sync-db";
import { log } from "./utils/log";

const app = express();
app.use(cors());
const port = 3000;

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "*",
};

app.get("/pull", async (req, res) => {
  const changes = await getBackendChanges();
  //log(0, "=>pull.changes:", changes, true);

  const response = {
    statusCode: 200,
    headers: headers,
    body: changes,
  };
  res.send(response);
});

app.get("/push", async (req, res) => {
  console.log("=>push request:");
  console.log(req);

  const response = {
    statusCode: 200,
    headers: headers,
    body: {},
  };
  res.send(response);
});

app.get("/questions", async (req, res) => {
  console.log("=>questions:");
  log(0, "snippets:", req.query.s, true);
  const questions = await getQuestions(req.query.s as string);
  const response = {
    statusCode: 200,
    headers: headers,
    body: questions,
  };
  res.send(response);
});

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
