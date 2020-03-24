const { NODE_ENV, DATABASE_URL } = require('../config')
const knex = require('knex')
const textService = require('./textService')
const express = require('express')
const teleprompt = express.Router()

const knexInstance = knex({
  client: 'pg',
  connection: DATABASE_URL,
})


teleprompt.get('/', (req, res) => {
  const query = req.query;
  
  textService.getText(knexInstance, query.text)
    .then(result => JSON.parse(result.content))
    .then(resu => res.json(resu))
  
  res.send(req.query.text);
});

module.exports = teleprompt;