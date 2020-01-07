
require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const fakeData = require('./fakeData.js')
const { NODE_ENV } = require('./config')

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

app.get('/teleprompt', (req, res) => {
  const query = req.query;

  if (query.text) {
  let results = fakeData.find(text => text.title === query.text );
  res.json(results);
  }

  else {
    let results = fakeData.find(text => text.title === 'dummyStore');
    res.json(results);
  }

});

app.get ('/textTitles', (req, res) => {
  let titles = fakeData.map(text => text.title);
  res.json(titles);
})


app.post('/', (req, res) => {
  res.send('POST request received')
})

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