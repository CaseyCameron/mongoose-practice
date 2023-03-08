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
import { SCALE_ROUTE, MODE_ROUTE } from '../src/app/utils/helpers'

describe('Scale tests', () => {
  beforeEach(async () => {
    await request(app).post(MODE_ROUTE).send({
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
  it('should get a scale by id', async () => {
    const { body } = await request(app).get(SCALE_ROUTE)
    const scale = body.scales[0]
    const res = await request(app).get(SCALE_ROUTE + `/${scale._id}`)

    expect(res.body).toEqual(scaleGetResponse)
  })
  it('should get all scales', async () => {
    const res = await request(app).get(SCALE_ROUTE)

    expect(res.body).toEqual(scaleGetAllResponse)
  })
  it('should update a scale', async () => {
    const { body } = await request(app).get(SCALE_ROUTE)
    const scale = body.scales[0]
    const res = await request(app)
      .put(SCALE_ROUTE + `/${scale._id}`)
      .send({
        ...scale,
        name: 'Harmonic Minor',
      })

    expect(res.body).toEqual({
      message: 'Success',
      scale: { ...scale, name: 'Harmonic Minor', modes: expect.any(Array) },
    })
  })
  it('should delete a scale', async () => {
    const { body } = await request(app).get(SCALE_ROUTE)
    const _id = body.scales[0]._id
    const res = await request(app).delete(SCALE_ROUTE + `/${_id}`)

    expect(res.status).toEqual(200)
    expect(res.body).toEqual({ message: 'Success' })
  })
  it('should delete all scales', async () => {
    const res = await request(app).delete(SCALE_ROUTE)

    expect(res.status).toEqual(200)
    expect(res.body).toEqual({ message: 'Success' })
  })
})

describe('Scales exception tests', () => {
  it('should receive an error when posting without a name', async () => {
    const res = await request(app).post(SCALE_ROUTE).send({ name: '' })

    expect(res.body).toEqual({
      message: 'A required field was entered without a value',
    })
  })
  it('should receive an error when posting a duplicate name', async () => {
    await request(app).post(MODE_ROUTE).send({ name: 'Dorian' })
    await request(app).post(SCALE_ROUTE).send(scaleToPost)

    const res = await request(app).post(SCALE_ROUTE).send(scaleToPost)

    expect(res.body).toEqual({ message: 'Ionian already exists' })
  })
  it('should get appropriate message when scale not found by id', async () => {
    const res = await request(app).get(
      SCALE_ROUTE + '/6407881015de82cce302b882'
    )

    expect(res.body).toEqual({ message: 'Scale not found' })
  })
  it('should appropriate message when there are no scales', async () => {
    await request(app).delete(SCALE_ROUTE)
    const res = await request(app).get(SCALE_ROUTE)

    expect(res.body).toEqual({ message: 'There are no scales yet' })
  })
  it('should receive appropriate error when updating a scale not found', async () => {
    const res = await request(app)
      .put(SCALE_ROUTE + '/6407881015de82cce302b882')
      .send({ _id: '6407881015de82cce302b882', name: 'New Scale Name', __v: 0 })

    expect(res.status).toEqual(500)
    expect(res.body).toEqual({ message: 'Scale not found' })
  })
  it('should 500 when trying to delete a scale that does not exist', async () => {
    const res = await request(app).delete(
      SCALE_ROUTE + '/6407881015de82cce302b882'
    )

    expect(res.status).toEqual(500)
    expect(res.body).toEqual({ message: 'Scale not found' })
  })
})
