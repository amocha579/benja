/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/
//const Story = require("./models/story");
//const Comment = require("./models/comment");
 
const express = require('express');

// import models so we can interact with the database
const User = require("../app/models/user");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|
router.get("/user", (req, res) => {
  User.findById(req.query.userid).then((user) => {
    res.send(user);
  });
});

router.post("/questionAnswer", (req, res) => {
  const newUser = new User({
    //_id: "63399e7182d8f45a3871bb6b",
    name: "omggg",
    listChoices: req.body.listChoices,
  })
  newUser.save().then((user) => {
    res.send(user);
  });
});

router.get("/lastVisited", (req, res) => {
  User.find({}).then((lastVisited) => res.send(lastVisited));
})

router.post("/lastVisited", (req, res) => {
  User.updateOne({_id: "hiiii"}, {lastVisited: req.body.lastVisited}).then((user) => {
    res.send(user);
  });
});

router.get("/stories", (req, res) => {
  // empty selector means get all documents
  Story.find({location: req.query.location}).then((stories) => res.send(stories));
});

router.post("/story", auth.ensureLoggedIn, (req, res) => {
  const newStory = new Story({
    creator_id: req.user._id,
    creator_name: req.user.name,
    content: req.body.content,
    location: req.body.location,
  });

  newStory.save().then((story) => res.send(story));
});

router.get("/comment", (req, res) => {
  Comment.find({ parent: req.query.parent }).then((comments) => {
    res.send(comments);
  });
});

router.post("/comment", auth.ensureLoggedIn, (req, res) => {
  const newComment = new Comment({
    creator_id: req.user._id,
    creator_name: req.user.name,
    parent: req.body.parent,
    content: req.body.content,
  });

  newComment.save().then((comment) => res.send(comment));
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
