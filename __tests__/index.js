const supertest = require('supertest')
const server = require('../api/server.js')
const db = require('../database/dbConfig.js')
const authRouter = require('../auth/auth-router.js')

// beforeEach(async () => {
//   // this function executes and clears out the table before each test
//   await db('users').truncate();
// });

afterAll(async () => {
  await db.destroy()
})  // runs code after all tests have run, we will use this to close the db connection


test('GET /', async () => {
  const res = await supertest(server).get('/')
  expect(res.statusCode).toBe(200)
  expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
})

// test('POST /register', async () => {
//   let user = {
//     username: 'a',
//     password: '123'
//   }
// })

describe('auth-router integration tests', () => {
  // it('POST /api/auth/register', async () => {
  //   let user = {
  //     username: 'any',
  //     password: '1234'
  //   }
  //   const res = await supertest(server)
  //     .post('/api/auth/register')
  //     .send(user)

  //   expect(res.statusCode).toBe(201)
  //   expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
  // })

  it('POST /api/auth/login', async () => {
    let user = {
      username: '1',
      password: '1234'
    }
    const res = await supertest(server)
      .post('/api/auth/login')
      .send(user)
    
    expect(res.statusCode).toBe(200)
    expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
  })
})

describe('jokes integration tests', () => {
  it('/GET /api/jokes', async () => {
    const res = await supertest(server).get('/api/jokes')
    expect(res.statusCode).toBe(401)
    expect(res.headers['content-type']).toBe('application/json; charset=utf-8')
  })
})