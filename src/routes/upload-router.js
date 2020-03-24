const { NODE_ENV, DATABASE_URL } = require('../config')
const knex = require('knex')
const textService = require('./textService')
const express = require('express')
const upload = express.Router()

const knexInstance = knex({
  client: 'pg',
  connection: DATABASE_URL,
})

upload.post('/', (req, res) => {
  const { title } = req.body;
  let newText = req.body;
  delete newText.title;
  delete newText.numOfSections;
  
  let textObj = {
    title: title,
    content: newText
  }
  
  textService.postText(knexInstance, textObj)
    .then(result => console.log(result))
})

module.exports = upload;