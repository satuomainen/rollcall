const request = require('supertest');
const { expect } = require('chai');
const HttpStatus = require('http-status-codes');
const _ = require('lodash');

// Set environment so that test database is used instead of the actual db.
//
// Make sure your PostgreSQL has a database called `rollcall_test` owned
// by the user `rollcall`.
process.env.DATABASE_NAME = 'rollcall_test';

// Make sure to require the DB and the App only after setting the db
// connection details. Otherwise you might get a connection to your dev/prod DB.
const database = require('../../db');
const appUnderTest = require('../../server/app');

const API_BASE = '/api/v1/account';
const agent = request.agent(appUnderTest);

const newUser = {
  name: 'Test User 001',
  email: '09jlknfosjdvwjef@fvi3043rvfmv.4re',
  password: 'fr3e09m309rj',
  passwordConfirm: 'fr3e09m309rj'
};

const existingUser = {
  name: 'Test User 000',
  email: 'kdlovieie3k3kkfkk@vmo3o3fikfk.ed83k',
  password: 'sdkao3292gifg',
  passwordConfirm: 'sdkao3292gifg'
};

function withRegisteredUser(user) {
  return request.agent(appUnderTest)
    .post(`${API_BASE}/register`)
    .send(user)
    .expect(HttpStatus.CREATED);
}

function withLoggedInUser(credentials, test) {
  const loggedInAgent = request.agent(appUnderTest);
  return loggedInAgent
    .post(`${API_BASE}/login`)
    .send(credentials)
    .expect(HttpStatus.OK)
    .then(() => test(loggedInAgent));
}

beforeEach(() => (
  database.sequelize
    // force - Each Model will run DROP TABLE IF EXISTS before it tries to create its own table
    .sync({ force: true })
    .then(() => database.sequelize.models.Participant.create(existingUser))
));

describe('Account API', () => {
  describe('Registration', () => {
    it('POST should return success when registering a valid new user', done => {
      withRegisteredUser(newUser)
        .end((err, res) => {
          if (err) return done(err);
          return database.sequelize.models.Participant
            .findOne({
              where: {
                email: newUser.email
              }
            })
            .then((participant, error) => {
              if (error) return done(error);
              expect(participant.email).to.equal(newUser.email);
              return done();
            });
        });
    });
    it('POST should return error if email is already registered', done => {
      withRegisteredUser(newUser)
        .end((err, res) => {
          if (err) return done(err);
          return agent
            .post(`${API_BASE}/register`)
            .send(newUser)
            .expect(HttpStatus.CONFLICT, done);
        });
    });
    it('POST should return error if email is missing', done => {
      const userWithEmailMissing = _.clone(newUser);
      delete userWithEmailMissing.email;
      agent
        .post(`${API_BASE}/register`)
        .send(userWithEmailMissing)
        .expect(HttpStatus.BAD_REQUEST, done);
    });
    it('POST should return error if name is missing', done => {
      const userWithNameMissing = _.clone(newUser);
      delete userWithNameMissing.name;
      agent
        .post(`${API_BASE}/register`)
        .send(userWithNameMissing)
        .expect(HttpStatus.BAD_REQUEST, done);
    });
    it('POST should return error if password is missing', done => {
      const userWithPasswordMissing = _.clone(newUser);
      delete userWithPasswordMissing.password;
      agent
        .post(`${API_BASE}/register`)
        .send(userWithPasswordMissing)
        .expect(HttpStatus.BAD_REQUEST, done);
    });
    it('POST should return error if passwordConfirm is missing', done => {
      const userWithPasswordConfirmMissing = _.clone(newUser);
      delete userWithPasswordConfirmMissing.passwordConfirm;
      agent
        .post(`${API_BASE}/register`)
        .send(userWithPasswordConfirmMissing)
        .expect(HttpStatus.BAD_REQUEST, done);
    });
    it('POST should return error if password and passwordConfirm do not match', done => {
      const userWithPasswordMismatch = _.clone(newUser);
      userWithPasswordMismatch.passwordConfirm = 'not the same as password';
      agent
        .post(`${API_BASE}/register`)
        .send(userWithPasswordMismatch)
        .expect(HttpStatus.BAD_REQUEST, done);
    });
  });
  describe('Login', () => {
    it('POST should return error if password is incorrect', done => {
      withRegisteredUser(newUser)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          const credentials = {
            email: newUser.email,
            password: 'not the correct password'
          };
          agent
            .post(`${API_BASE}/login`)
            .send(credentials)
            .expect(HttpStatus.UNAUTHORIZED, done);
        });
    });
    it('POST should return error if email is not known', done => {
      withRegisteredUser(newUser)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          const credentials = {
            email: 'this is not a user',
            password: newUser.password
          };
          agent
            .post(`${API_BASE}/login`)
            .send(credentials)
            .expect(HttpStatus.UNAUTHORIZED, done);
        });
    });
    it('POST should return success with correct credentials', done => {
      withRegisteredUser(newUser)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          const credentials = {
            email: newUser.email,
            password: newUser.password
          };
          agent
            .post(`${API_BASE}/login`)
            .send(credentials)
            .expect(HttpStatus.OK)
            .end((e, r) => {
              if (e) {
                done(e);
                return;
              }
              agent
                .post(`${API_BASE}/logout`)
                .expect(HttpStatus.OK, done);
            });
        });
    });
  });
  describe('Account', () => {
    it('GET should return error to unauthorized user', done => {
      agent
        .get(API_BASE)
        .expect(HttpStatus.UNAUTHORIZED, done);
    });
    it('GET should return success for authenticated user', done => {
      const { email, password } = existingUser;
      withLoggedInUser({ email, password }, loggedInAgent => {
        loggedInAgent
          .get(API_BASE)
          .expect(HttpStatus.OK)
          .end((err, res) => {
            if (err) {
              done(err);
              return;
            }
            const { id, name } = res.body;
            expect(id).to.be.a('number');
            expect(email).to.equal(existingUser.email);
            expect(name).to.equal(existingUser.name);
            done();
          });
      });
    });
    it('PUT should return error to unauthorized user', done => {
      const modifiedExistingUser = _.clone(existingUser);
      modifiedExistingUser.name = 'New Name';
      agent
        .put(API_BASE)
        .send(modifiedExistingUser)
        .expect(HttpStatus.UNAUTHORIZED)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          database.sequelize.models.Participant
            .findOne({
              where: {
                email: modifiedExistingUser.email
              }
            })
            .then((participant, error) => {
              if (error) return done(error);
              expect(participant.name).to.equal(existingUser.name);
              return done();
            });
        });
    });
    it('PUT should return success to authorized user', done => {
      const { email, password } = existingUser;
      withLoggedInUser({ email, password }, loggedInAgent => {
        const modifiedExistingUser = { name: 'New name' };
        loggedInAgent
          .put(API_BASE)
          .send(modifiedExistingUser)
          .expect(HttpStatus.OK)
          .end((err, res) => {
            if (err) {
              done(err);
              return;
            }
            database.sequelize.models.Participant
              .findOne({ where: { email } })
              .then(participant => {
                expect(participant.name).to.equal(modifiedExistingUser.name);
                return done();
              }, done);
          });
      });
    });
    it('PUT should return success when changing password', done => {
      const { email, password } = existingUser;
      const newPassword = 'new password';
      withLoggedInUser({ email, password }, loggedInAgent => {
        const modifiedExistingUser = {
          password: newPassword,
          passwordConfirm: newPassword,
          currentPassword: password
        };
        loggedInAgent
          .put(API_BASE)
          .send(modifiedExistingUser)
          .expect(HttpStatus.OK)
          .end((err, res) => {
            if (err) {
              done(err);
              return;
            }
            database.sequelize.models.Participant
              .findOne({ where: { email } })
              .then(participant => {
                participant
                  .verifyPassword(newPassword)
                  .then(passwordMatches => {
                    expect(passwordMatches).to.equal(true);
                    done();
                  }, done);
              }, done);
          });
      });
    });
    it('PUT should return error when password does not match confirmation', done => {
      const { email, password } = existingUser;
      const newPassword = 'new password';
      withLoggedInUser({ email, password }, loggedInAgent => {
        const modifiedExistingUser = {
          password: newPassword,
          passwordConfirm: 'not the new password',
          currentPassword: password
        };
        loggedInAgent
          .put(API_BASE)
          .send(modifiedExistingUser)
          .expect(HttpStatus.BAD_REQUEST, done);
      });
    });
  });
});
