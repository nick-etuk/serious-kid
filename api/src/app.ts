import express from "express";
import { getQuestionsBySnippet } from "./questions/get-questions-by-snippet";
import { getSnippets } from "./snippets/get-snippets";
import { getQuestions } from "./questions/get-questions";
import { getAnswers } from "./answers/get-answers";
const cors = require("cors");
const path = require("path");

import { getBackendChanges, getDictionary } from "./sync-db";
import { log } from "./utils/log";
import { getStack } from "./stack/get-stack";

const logLevel = 1;

const app = express();
app.use(cors());
const port = 3000;

const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "*",
};

//app.use("/image", express.static(path.join(__dirname, "public", "images")));
app.use(express.static("public"));

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

app.get("/snippets", async (req, res) => {
    log(logLevel, "=>snippets:", req.query.s, true);
    const result = await getSnippets(req.query.s as string);
    const response = {
        statusCode: 200,
        headers: headers,
        body: result,
    };
    res.send(response);
});

app.get("/stack", async (req, res) => {
    log(logLevel, "=>stack:", req.query.s, true);
    const result = await getStack(req.query.s as string);
    const response = {
        statusCode: 200,
        headers: headers,
        body: result,
    };
    res.send(response);
});

app.get("/questions", async (req, res) => {
    log(logLevel, "questions:", req.query.s, true);
    const result = await getQuestions(req.query.s as string);
    const response = {
        statusCode: 200,
        headers: headers,
        body: result,
    };
    res.send(response);
});

app.get("/questions-by-snippet", async (req, res) => {
    log(0, "questions-by-snippet:", req.query.s, true);
    const result = await getQuestionsBySnippet(req.query.s as string);
    const response = {
        statusCode: 200,
        headers: headers,
        body: result,
    };
    res.send(response);
});

app.get("/answers", async (req, res) => {
    log(logLevel, "=>answers:", req.query.s, true);
    const result = await getAnswers(req.query.s as string);
    const response = {
        statusCode: 200,
        headers: headers,
        body: result,
    };
    res.send(response);
});

app.get("/dict", async (req, res) => {
    log(logLevel, "=>dict:", req.query.s, true);
    const result = await getDictionary(req.query.s as string);
    const response = {
        statusCode: 200,
        //headers: headers,
        body: result,
    };
    res.send(response);
});

app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
