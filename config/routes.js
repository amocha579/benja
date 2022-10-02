'use strict';

/**
 * Module dependencies.
 */

const home = require('../app/controllers/home');

/**
 * Expose
 */

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
