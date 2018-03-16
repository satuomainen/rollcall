const debug = require('debug')('sql')
const Sequelize = require('sequelize')

const dbName = process.env.DATABASE_NAME || 'rollcall';
const dbUsername = process.env.DATABASE_USER || 'rollcall';
const dbPassword = process.env.DATABASE_PASSWORD || 'rollcall';

console.log(`Opening database connection to ${dbName}`);

// create the database instance
const db = new Sequelize(dbName, dbUsername, dbPassword, {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  logging: debug, // export DEBUG=sql in the environment to get SQL queries
  define: {
    underscored: true, // use snake_case rather than camelCase column names
    freezeTableName: true, // don't change table names from the one specified
    timestamps: true, // automatically include timestamp columns
  }
});

// pull in our models
require('./models')

// sync the db, creating it if necessary
function sync(retries = 0, maxRetries = 5) {
  return db.sync({ force: false })
    .then(() => console.log(`Synced models to db ${dbName}`))
    .catch(fail => {
      console.log(fail);
    });
}

db.didSync = sync();

module.exports = db;
