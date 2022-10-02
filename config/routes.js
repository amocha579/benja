'use strict';

/**
 * Module dependencies.
 */

const http = require("http");
const express = require("express"); // backend framework for our node server.
const session = require("express-session"); // library that stores info about each connected user
const mongoose = require("mongoose"); // library to connect to MongoDB
const home = require('../app/controllers/home');
// import models so we can interact with the database
const User = require("../app/models/user");
const path = require("path"); // provide utilities for working with file and directory paths

const mongoConnectionURL = "mongodb+srv://aileen:aileen@cluster0.1wcuyod.mongodb.net/?retryWrites=true&w=majority";
const databaseName = "benja";

/**
 * Expose
 */

mongoose
 .connect(mongoConnectionURL, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   dbName: databaseName,
 })
 .then(() => console.log("Connected to MongoDB"))
 .catch((err) => console.log(`Error connecting to MongoDB: ${err}`));

module.exports = function(app) {
  app.get('/', home.index);
  app.get("/testing", function(req, res) {
    res.render('home/testing.pug', { title: 'testing' });
  });

  app.get("/test_api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

  app.get("/get_questions", (req, res) => {
    const questions = require('./questions.json');
    res.json(questions);
  });

  app.get("/api/whoami", (req, res) => {
    if (!req.user) {
      // not logged in
      return res.send({});
    }
  
    res.send(req.user);
  });

  app.get("*", (req, res) => {
    res.sendFile(path.join(reactPath, "index.html"));
  });

  app.use(express.json());
  app.post("/api/questionAnswer", (req, res) => {
    console.log("THIS IS REQ: ", req);
    /*User.updateOne({_id: "hiiii"}, {listChoices: req.body.answers}, {upsert: true}).then((user) => {
      res.send(user);
    });*/
    User.deleteOne({id: req.body.user._id});
    const newUser = new User({
      //_id: "63399e7182d8f45a3871bb6b",
      _id: req.body.user._id,
      name: req.body.user.name,
      //googleid: "asdfasdf",
      listChoices: req.body.listChoices,
    })
    newUser.save().then((user) => {
      res.send(user);
    });
  });

  const reactPath = path.resolve(__dirname, "..", "client", "dist");
  app.use(express.static(reactPath));

  


  /**
   * Error handling
   */

  app.use(function(err, req, res, next) {
    // treat as 404
    if (
      err.message &&
      (~err.message.indexOf('not found') ||
        ~err.message.indexOf('Cast to ObjectId failed'))
    ) {
      return next();
    }
    console.error(err.stack);
    // error page
    res.status(500).render('500', { error: err.stack });
  });

  // assume 404 since no middleware responded
  app.use(function(req, res) {
    res.status(404).render('404', {
      url: req.originalUrl,
      error: 'Not found'
    });
  });
};
