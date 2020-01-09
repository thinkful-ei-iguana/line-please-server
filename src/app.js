require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const fakeData = require('./fakeData.js')
const { NODE_ENV, DB_URL } = require('./config')
const knex = require('knex')
const textService = require('./textService')


const app = express()

const knexInstance = knex({
  client: 'pg',
  connection: 'postgresql://anugrahlambogo@localhost/Line-Please',
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

let data = fakeData;

app.get('/teleprompt', (req, res) => {
  const query = req.query;

  if (query.text) {
  textService.getText(knexInstance, query.text)
    .then(result => JSON.parse(result.content))
    .then(resu => res.json(resu))
  }

  else {
    let results = data.find(text => text.title === 'dummyStore');
    res.json(results);
  }

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
  let index = data.findIndex(text => text.title === req.body);

  if (index === -1) {
    return res.status(404).send('text not found');
  }

  data.splice(index, 1);

  res.send('Deleted');

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