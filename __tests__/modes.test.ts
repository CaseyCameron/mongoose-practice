import request from 'supertest'
import app from '../src/app/app'

const routePrefix = '/api/v1'
const mongooseProps = {
  _id: expect.any(String),
  __v: expect.any(Number),
}

const modeToPost = {
  name: 'Dorian',
}

describe('Mode tests', () => {
  beforeEach(() => {
    // add some modes
  })
  afterEach(() => {
    // delete all modes
  })
  it('should post a mode', async () => {
    const res = await request(app).post(`${routePrefix}/modes`).send(modeToPost)

    expect(res.body).toEqual({
      mode: { ...modeToPost, ...mongooseProps },
      message: 'Success',
    })
  })
})
