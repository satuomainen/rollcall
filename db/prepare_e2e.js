const db = require('../db');
const logger = require('debug')('rollcall:seed');

db.sequelize.didSync
  .then(() => db.sequelize.sync({ force: true }))
  .then(db.sequelize.query('DELETE FROM participants WHERE email = ?', {
    raw: true,
    replacements: ['teuvo.testaaja@example.com']
  }))
  .catch(error => logger('%O', error))
  .finally(() => db.sequelize.close());
