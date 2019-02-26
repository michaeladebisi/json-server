const request = require('supertest');
const server = require('../app.js');

beforeAll(async () => {
  // do something before anything else runs
  console.log('Jest starting!');
});
// close the server after each test
afterAll(() => {
  server.close();
  console.log('server closed!');
});

describe('basic route tests', () => {
  test('get home route  GET /', async () => {
    const response = await request(server).get('/');
    expect(response.status).toEqual(200);
    expect(response.text).toContain('Hello World!');
  });

  test('get test route  GET /test', async () => {
    const response = await request(server).get('/test');
    expect(response.status).toEqual(200);
    expect(response.text).toContain('Hello test!');
  });

  test('get test with param route  GET /test/:name', async () => {
    const response = await request(server).get('/test/supername');
    expect(response.status).toEqual(200);
    expect(response.text).toContain('Hello supername');
  });


});

describe('dog tests', () => {
  test('get all dogs  GET /dogs', async () => {
    const response = await request(server).get('/dogs');
    expect(response.status).toEqual(200);
    expect(response.text).toContain('affenpinscher');
  });
});
