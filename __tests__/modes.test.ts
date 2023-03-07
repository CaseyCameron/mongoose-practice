import request from 'supertest'
import app from '../src/app/app'
import {
  modeOne,
  modeTwo,
  modeToPost,
} from '../src/app/utils/testing/modesData'
const MODE_ROUTE = '/api/v1/modes'

const mongooseProps = {
  _id: expect.any(String),
  __v: expect.any(Number),
}

describe('Mode tests', () => {
  beforeEach(async () => {
    await request(app).post(MODE_ROUTE).send(modeOne)
    await request(app).post(MODE_ROUTE).send(modeTwo)
  })
  afterEach(async () => {
    await request(app).delete(MODE_ROUTE)
  })
  it('should post a mode', async () => {
    const res = await request(app).post(MODE_ROUTE).send(modeToPost)

    expect(res.body).toEqual({
      mode: { ...modeToPost, ...mongooseProps },
      message: 'Success',
    })
  })

  it('should delete all modes', async () => {
    const res = await request(app).delete(MODE_ROUTE)

    expect(res.status).toEqual(200)
    expect(res.body).toEqual({ message: 'Success' })
  })
})
