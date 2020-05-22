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

test('POST /api/auth/login', async () => {
  const register = await request(server)
    .post('/api/auth/register')
    .send({username: 'sunil', password: 'sunil'});

  const response = await request(server)
    .post('/api/auth/login')
    .send({username: 'sunil', password: 'sunil'});

  expect(response.status).toBe(200);
  expect(response.body).toHaveProperty('token');
  expect(response.body).toMatchObject({welcome: 'sunil'});
});

test('GET /api/jokes', async () => {
  const register = await request(server)
    .post('/api/auth/register')
    .send({username: 'sunil', password: 'sunil'});

  const login = await request(server)
    .post('/api/auth/login')
    .send({username: 'sunil', password: 'sunil'});

  const response = await request(server)
    .get('/api/jokes')
    .set('authorization', login.body.token);

  const expected = [{id: '23', joke: 'you are soo funny'}];

  expect(response.status).toBe(200);
  expect(response.body[0]).toHaveProperty('id');
  expect(response.body[0]).toHaveProperty('joke');

  //   expect(response.body).toEqual(expect.arrayContaining(expected));
});
