const express = require("express");

// const db = require("../data/dbConfig.js");

const AccountRouter = require("../account/accountRouter");

const server = express();

server.use(express.json());

server.use("/api/account", AccountRouter);

server.get("/", (req, res) => {
  res.status(200).json({ api: "up" });
});

module.exports = server;
