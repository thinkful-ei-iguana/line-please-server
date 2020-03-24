require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV, DATABASE_URL } = require('./config')
const knex = require('knex')
const teleprompt = require('./routes/teleprompt-router')
const listText = require('./routes/listText-router')
const textTitles = require('./routes/textTitles-router')
const upload = require('./routes/upload-router')


const app = express()

const knexInstance = knex({
  client: 'pg',
  connection: DATABASE_URL,
})


const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(express.json({
  strict: false,
}))
app.use(helmet())
app.use(cors())


app.use('/teleprompt', teleprompt)
app.use('/listText', listText)
app.use('/textTitles', textTitles)
app.use('/upload', upload)


app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } }
  } else {
    console.error(error)
    response = { message: error.message, error }
  }
  res.status(500).json(response)
})

module.exports = app