const sqlLogger = require('debug')('sequelize:sql');
const logger = require('debug')('rollcall:db/index');
const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

const basename = path.basename(module.filename);
const db = {};

function getDatabaseConnection() {
  const dbName = process.env.DATABASE_NAME || 'rollcall';
  const dbUsername = process.env.DATABASE_USER || 'rollcall';
  const dbPassword = process.env.DATABASE_PASSWORD || 'rollcall';

  logger(`Opening database connection to ${dbName}`);

  // Create the database instance
  return new Sequelize(dbName, dbUsername, dbPassword, {
    host: 'localhost',
    dialect: 'postgres',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    logging: sqlLogger, // export DEBUG=sequelize:sql in the environment to print SQL queries
    define: {
      underscored: true, // use snake_case rather than camelCase column names
      freezeTableName: true, // don't change table names from the one specified
      timestamps: true // automatically include timestamp columns
    }
  });
}

// sync the sequelize, creating it if necessary
function sync(sequelize, retries = 0, maxRetries = 5) {
  return sequelize.sync({ force: false })
    .then(() => logger('Synced models to database'))
    .catch(fail => {
      logger('Synchronizing entity models to database failed: %O', fail);
    });
}

(() => {
  const sequelize = getDatabaseConnection();
  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
  const modelDirectory = `${__dirname}/models`;

  fs.readdirSync(modelDirectory)
    .filter(file => {
      return (file.indexOf('.') !== 0) && (file !== basename);
    })
    .forEach(file => {
      const model = sequelize['import'](path.join(modelDirectory, file));
      db[model.name] = model;
    });

  Object.keys(db).forEach(modelName => {
    if ('associate' in db[modelName]) {
      db[modelName].associate(db);
    }
  });

  db.sequelize.didSync = sync(sequelize);
})();

module.exports = db;
