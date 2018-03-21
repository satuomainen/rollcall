const HttpStatus = require('http-status-codes');

const { Participant } = require('../../db');

/**
 * Check that the name field is present and contains a value.
 */
function requireParticipantName(req, res, next) {
  const participantData = Object.assign({}, req.body);

  if (!participantData.name || participantData.name.length < 1) {
    // If there are errors, return without calling next() so that the next request handler will not be called.
    res.status(HttpStatus.BAD_REQUEST).json({ error: 'Name is required' });
    return;
  }

  next();
}

/**
 * Validate that the name field is not empty.
 */
function validateParticipantNameNotEmpty(req, res, next) {
  const participantData = Object.assign({}, req.body);

  if (participantData.name && participantData.name.length < 1) {
    // If there are errors, return without calling next() so that the next request handler will not be called.
    res.status(HttpStatus.BAD_REQUEST).json({ error: 'Name cannot be empty' });
    return;
  }

  next();
}

/**
 * Validate that password matches confirmation if password change is requested. In that case also
 * check that the current password is correct.
 */
function validatePasswordMatchesConfirmation(req, res, next) {
  const participantData = Object.assign({}, req.body);
  const shouldValidatePasswordMatch = participantData.password;

  if (shouldValidatePasswordMatch) {
    const passwordMatchesConfirmation = participantData.password === participantData.passwordConfirm;
    if (!passwordMatchesConfirmation) {
      res.status(HttpStatus.BAD_REQUEST).json({ error: 'New password does not match confirmation' });
      return;
    }
  }
  next();
}

/**
 * Validate that the request contains "currentPassword" and that it matches to logged in
 * participant's password.
 */
function validateCurrentPassword(req, res, next) {
  const participantData = Object.assign({}, req.body);

  if (!participantData.currentPassword) {
    res.sendStatus(HttpStatus.UNAUTHORIZED);
    return;
  }

  Participant
    .findById(req.user.id)
    .then(function(participant) {
      participant
        .verifyPassword(participantData.currentPassword)
        .then(function(currentPasswordMatches) {
          if (currentPasswordMatches) {
            next();
          } else {
            res.sendStatus(HttpStatus.UNAUTHORIZED);
          }
        }, function() {
          res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
        });
    }, function() {
      res.sendStatus(HttpStatus.INTERNAL_SERVER_ERROR);
    });
}

module.exports = {
  requireParticipantName,
  validateParticipantNameNotEmpty,
  validatePasswordMatchesConfirmation,
  validateCurrentPassword
};
