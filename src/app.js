require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV, DATABASE_URL } = require('./config')
const knex = require('knex')
const textService = require('./textService')


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


app.get('/teleprompt', (req, res) => {
  const query = req.query;

  textService.getText(knexInstance, query.text)
    .then(result => JSON.parse(result.content))
    .then(resu => res.json(resu))
  
});

app.get ('/textTitles', (req, res) => {
  textService.getTitles(knexInstance)
    .then(titles => res.json(titles));
})


app.post('/upload', (req, res) => {
  const {title} = req.body;
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


app.delete('/listText', (req, res) => {

  textService.deleteText(knexInstance, req.body)
    .then(res.send('Deleted'));

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