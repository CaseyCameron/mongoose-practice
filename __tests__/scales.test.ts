import request from 'supertest'
import app from '../src/app/app'
import {
  scaleOne,
  scaleTwo,
  scaleGetAllResponse,
  scalePostResponse,
  scaleToPost,
} from '../src/app/utils/testing/scalesData'

const SCALE_ROUTE = '/api/v1/scales'

describe('Scale tests', () => {
  beforeEach(async () => {
    await request(app).post(`/api/v1/modes`).send({
      name: 'Dorian',
    })
    await request(app).post(SCALE_ROUTE).send(scaleOne)
    await request(app).post(SCALE_ROUTE).send(scaleTwo)
  })
  afterEach(() => {
    // delete all scales
  })
  
  it('should post a scale', async () => {
    const res = await request(app).post(SCALE_ROUTE).send(scaleToPost)

    expect(res.body).toEqual(scalePostResponse)
  })
  it('should get all scales', async () => {
    const res = await request(app).get(SCALE_ROUTE)

    expect(res.body).toEqual(scaleGetAllResponse)
  })
})
