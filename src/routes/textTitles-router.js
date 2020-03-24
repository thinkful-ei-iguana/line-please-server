const { NODE_ENV, DATABASE_URL } = require('../config')
const knex = require('knex')
const textService = require('./textService')
const express = require('express')
const textTitles = express.Router()

const knexInstance = knex({
  client: 'pg',
  connection: DATABASE_URL,
})


textTitles.get('/', (req, res) => {
  textService.getTitles(knexInstance)
    .then(titles => res.json(titles));
})

module.exports = textTitles; 