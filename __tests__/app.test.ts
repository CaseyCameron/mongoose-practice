import request from 'supertest'

import app from '../src/app/app'

describe('app', () => {
  it('should have a heartbeat route', async () => {
    const { body } = await request(app).get('/api/v1/')
    expect(body.message).toBe('All systems are go')
  })
})
