import request from 'supertest'
import app from '../src/app/app'
import { scaleToPost } from '../src/app/utils/helpers/scales'

const routePrefix = '/api/v1'
const mongooseProps = {
  _id: expect.any(String),
  __v: expect.any(Number),
}

describe('Scale tests', () => {
  beforeEach(() => {
    // add some scales
  })
  afterEach(() => {
    // delete all scales
  })
  it('should post a scale', async () => {
    const res = await request(app)
      .post(`${routePrefix}/scales`)
      .send(scaleToPost)

    expect(res.body).toEqual({ ...scaleToPost, message: 'Success.', ...mongooseProps })
  })
})
