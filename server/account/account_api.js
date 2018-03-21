const router = require('express').Router();
const HttpStatus = require('http-status-codes');
const _ = require('lodash');
const passport = require('passport');

const { ensureLoggedIn } = require('../auth/index');
const { Participant, Sequelize: { UniqueConstraintError } } = require('../../db');
const ParticipantValidation = require('./validation');

/**
 * Helper function that removes null fields from the participant object so that it
 * can be updated with the Participant model.
 */
function pruneUnsetParticipantFields(participant) {
  const cleanParticipant = _.pick(participant, ['name', 'password']);
  if (!cleanParticipant.name) {
    delete cleanParticipant.name;
  }
  if (!cleanParticipant.password) {
    delete cleanParticipant.password;
  }
  return cleanParticipant;
}

/**
 * POST /api/v1/account/register
 * {
 *   "name": "Eric Example",
 *   "email": "eric@example.com",
 *   "password": "neveryoumindmypassword"
 * }
 *
 * Creates a new participant that can log in to the service
 */
router.post(
  '/register',
  ParticipantValidation.requireParticipantName,
  ParticipantValidation.validatePasswordMatchesConfirmation,
  (req, res) => {
    const newParticipant = req.body;
    Participant
      .create(newParticipant)
      .then(participant => {
        res.status(HttpStatus.CREATED).json(participant);
      })
      .catch(err => {
        if (err instanceof UniqueConstraintError) {
          res.sendStatus(HttpStatus.CONFLICT);
          return;
        }
        res.sendStatus(HttpStatus.BAD_REQUEST);
      });
  });

/**
 * GET /api/v1/account/
 *
 * Returns the logged in participant's data.
 */
router.get('/', ensureLoggedIn, (req, res, next) => {
  const { user } = req;
  Participant
    .findById(user.id)
    .then(participant => {
      if (!participant) {
        res.sendStatus(HttpStatus.NOT_FOUND);
        return;
      }
      res.status(HttpStatus.OK).json(participant);
    })
    .catch(next);
});

/**
 * PUT /api/v1/account/
 * {
 *  "name": "Eric Example",                      // optional, but cannot be set to empty
 *  "currentPassword": "neveryoumindmypassword", // required if "password" is set
 *  "password": "newPassword",                   // optional, new value for password
 *  "passwordConfirm": "newPassword"             // required when changing password
 * }
 *
 * Saves the changes to the participant data
 */
router.put(
  '/',
  ensureLoggedIn,
  ParticipantValidation.validateParticipantNameNotEmpty,
  ParticipantValidation.validatePasswordMatchesConfirmation,
  ParticipantValidation.validateCurrentPassword,
  function(req, res) {
    const { user } = req;
    const participantData = pruneUnsetParticipantFields(_.pick(req.body, ['name', 'password']));

    Participant
      .findById(user.id)
      .then(participant => {
        if (!participant) {
          res.sendStatus(HttpStatus.NOT_FOUND);
          return;
        }
        participant
          .update(participantData)
          .then(updatedParticipant => {
            res.status(HttpStatus.OK).json(updatedParticipant);
          });
      })
      .catch(() => {
        res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }
);

/**
 * POST /api/v1/account/login
 * {
 *  "email": "eric@example.com",
 *  "password": "neveryoumindmypassword"
 * }
 *
 * Authenticates the participant. If login is successful, the session id is set as a
 * cookie in the response by express-session.
 */
router.post('/login', (req, res, next) => {
  const authenticate = passport.authenticate('local', {}, (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ success: false, message: info.message });
    }

    return req.logIn(user, loginErr => {
      if (loginErr) {
        return res
          .status(HttpStatus.UNAUTHORIZED)
          .json({ success: false, message: loginErr });
      }
      return res.sendStatus(HttpStatus.OK);
    });
  });

  authenticate(req, res, next);
});

/**
 * POST /api/v1/account/logout
 *
 * Logs the participant out and clears the session.
 */
router.post('/logout', (req, res) => {
  req.logout();
  res.sendStatus(HttpStatus.OK);
});

module.exports = router;
