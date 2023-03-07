import request from 'supertest'
import app from '../src/app/app'
import {
  scaleOne,
  scaleTwo,
  scaleGetAllResponse,
  scalePostResponse,
  scaleToPost,
  scaleGetResponse,
} from '../src/app/utils/testing/scalesData'

const SCALE_ROUTE = '/api/v1/scales'
const MODE_ROUTE = '/api/v1/modes'

describe('Scale tests', () => {
  beforeEach(async () => {
    await request(app).post(`/api/v1/modes`).send({
      name: 'Dorian',
    })
    await request(app).post(SCALE_ROUTE).send(scaleOne)
    await request(app).post(SCALE_ROUTE).send(scaleTwo)
  })
  afterEach(async () => {
    await request(app).delete(SCALE_ROUTE)
    await request(app).delete(MODE_ROUTE)
  })

  it('should post a scale', async () => {
    const res = await request(app).post(SCALE_ROUTE).send(scaleToPost)

    expect(res.body).toEqual(scalePostResponse)
  })
  it('should get a node by id', async () => {
    const { body } = await request(app).get(SCALE_ROUTE)
    const scale = body.scales[0]
    console.log('scale', scale)
    const res = await request(app).get(SCALE_ROUTE + `/${scale._id}`)

    expect(res.body).toEqual(scaleGetResponse)
  })
  it('should get all scales', async () => {
    const res = await request(app).get(SCALE_ROUTE)

    expect(res.body).toEqual(scaleGetAllResponse)
  })

  it('should delete all scales', async () => {
    const res = await request(app).delete(SCALE_ROUTE)

    expect(res.status).toEqual(200)
    expect(res.body).toEqual({ message: 'Success' })
  })
})
