const app = require('./app');
const logger = require('debug')('rollcall:app');

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  logger(`App listening on port ${PORT}!`);
});

module.exports = app;
