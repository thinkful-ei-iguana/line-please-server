const { NODE_ENV, DATABASE_URL } = require('../config')
const knex = require('knex')
const textService = require('./textService')
const express = require('express')
const listText = express.Router()

const knexInstance = knex({
  client: 'pg',
  connection: DATABASE_URL,
})

listText.delete('/', (req, res) => {

  textService.deleteText(knexInstance, req.body)
    .then(res.send('Deleted'));
  
})

module.exports = listText;