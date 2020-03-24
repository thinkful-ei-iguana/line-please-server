const app = require('../src/app');
const knex = require('knex');
const helpers = require('./test-helpers');


describe("teleprompt", () => {
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

  it('get/ responds with 200 and sends bac the title', () => {
    return supertest(app)
      .get('/teleprompt/?text=Title')
      .expect(200, 'Title')
  });

});