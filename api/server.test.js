const request = require('supertest');
const server = require('./server');
const db = require('../database/dbConfig');

beforeEach(() => {
  return db.migrate.rollback().then(() => db.migrate.latest());
});

test('POST /api/auth/register', async () => {
  const response = await request(server)
    .post('/api/auth/register')
    .send({username: 'sunil', password: 'sunil'});

  expect(response.status).toBe(200);
  expect(response.body).toMatchObject({message: 'success'});
});
