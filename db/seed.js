const db = require('../db');
const logger = require('debug')('rollcall:seed');

// Run the model definitions
require('./models');

const seedParticipants = () => db.sequelize.Promise.map([
  {
    id: 1,
    name: 'Matti Matkaopas',
    email: 'matti654@example.com',
    password: 'masa1'
  },
  {
    id: 2,
    name: 'Erkki Esimerkki',
    email: 'eki456@example.com',
    password: 'salasana'
  },
  {
    id: 3,
    name: 'Teemu Turisti',
    email: 'teemu.turisti@example.com',
    password: 'password'
  }
], participant => db.sequelize.model('Participant').create(participant));

const seedRollcalls = () => db.sequelize.Promise.map([
  {
    name: 'Hervanta by night',
    leaderCode: 'H36WXA',
    participantCode: 'DB9HJX',
    leader_id: 1
  },
  {
    name: 'Luokkaretki 8A',
    leaderCode: 'K3N7TR',
    participantCode: 'U8NR4Q',
    leader_id: 1
  }
], rollcall => db.sequelize.model('Rollcall').create(rollcall));

const seedParticipationStatus = () => db.sequelize.Promise.map([
  { rollcall_id: 1, participant_id: 2, status: 'PRESENT' },
  { rollcall_id: 1, participant_id: 3, status: 'ABSENT' }
], participationStatus => db.sequelize.model('ParticipationStatus').create(participationStatus));

db.sequelize.didSync
  .then(() => db.sequelize.sync({ force: true }))
  .then(seedParticipants)
  .then(participants => logger(`Seeded ${participants.length} participants OK`))
  .then(seedRollcalls)
  .then(rollcalls => logger(`Seeded ${rollcalls.length} rollcalls OK`))
  .then(seedParticipationStatus)
  .then(participationStatuses => logger(`Seeded ${participationStatuses.length} participation statuses OK`))
  .catch(error => logger('%O', error))
  .finally(() => db.sequelize.close());
