const bodyParser = require('body-parser');
const express = require('express');
const session = require('express-session');
const morgan = require('morgan');
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const { authenticateUser } = require('./auth/index');
const { Participant } = require('../db');

const app = express();

// Use express-session to store user's session
app.use(session({
  secret: 'elmwood steel terracotta',
  resave: false,
  saveUninitialized: false
}));

passport.use(new LocalStrategy({
  usernameField: 'email'
}, authenticateUser));

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  function createError() {
    return new Error('Failed to restore session');
  }

  function handleError() {
    done(createError(), null);
  }

  Participant
    .findById(id)
    .then(function(user) {
      if (!user) {
        handleError();
        return;
      }
      done(null, user);
    }, handleError)
    .catch(handleError);
});

// Setup logger
app.use(morgan(
  ':remote-addr - :remote-user [:date[clf]] ' +
  '":method :url HTTP/:http-version" :status ' +
  ':res[content-length] :response-time ms'));

// Parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Json parser
app.use(bodyParser.json());

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Wire authentication
app.use(passport.initialize());
app.use(passport.session());

// Serve our api
app.use('/api', require('./api'));

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

module.exports = app;
