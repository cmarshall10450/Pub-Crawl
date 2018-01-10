import request from 'supertest'
import app from '../src'

describe('Bars', function () {
  it('GET /bars', function (done) {
    request(app).get('/bars')
      .expect(200, done)
  })
})
