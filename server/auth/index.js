const HttpStatus = require('http-status-codes');

const { Participant } = require('../../db/index');

const authenticateUser = (email, plainTextPassword, done) => {
  Participant
    .findOne({
      where: { email }
    })
    .then((user, err) => {
      if (err) {
        done(err);
        return;
      }

      if (!user) {
        done(null, false, { message: 'Username or password incorrect' });
        return;
      }
      user
        .verifyPassword(plainTextPassword)
        .then(function (passwordsMatch) { // eslint-disable-line
          if (passwordsMatch) {
            done(null, user);
          } else {
            done(null, false, { message: 'Username or password incorrect' });
          }
        });
    })
    .catch(done);
};

const ensureLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
    return;
  }
  res.sendStatus(HttpStatus.UNAUTHORIZED);
};

module.exports = {
  ensureLoggedIn,
  authenticateUser
};
