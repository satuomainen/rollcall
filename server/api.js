const api = module.exports = require('express').Router()
const accountApi = require('./account/account_api');

// import products from './products';

api
  .get('/express-test', (req, res) => res.send({ express: 'working!' })) // demo route to prove api is working
  .use('/v1/account', accountApi);
// No routes matched? 404.
api.use((req, res) => res.status(404).end());
