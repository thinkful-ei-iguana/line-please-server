const app = require('../src/app');
const knex = require('knex');
const helpers = require('./test-helpers');


describe("textTitles", () => {
  let db;

  const testData = helpers.testData();
  const expData = {
    section1: [
      'Select which text you want to practice!'],
    title: 'Title'
  };

  before('set up connection', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DATABASE_URL
    });
    app.set('db', db);
    helpers.seedText(db, testData);
  });


  after('remove connection', () => {
    return db.destroy();
  });

  it('post/ responds with 200 and posted!', () => {
    return supertest(app)
      .post('/upload')
      .send(expData)
      .expect(200, 'posted!');
  });
});