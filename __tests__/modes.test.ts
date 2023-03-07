import request from 'supertest'
import app from '../src/app/app'
import {
  modeOne,
  modeTwo,
  modeToPost,
  modePostResponse,
  modeGetAllResponse,
} from '../src/app/utils/testing/modesData'
const MODE_ROUTE = '/api/v1/modes'

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

    expect(res.body).toEqual(modePostResponse)
  })
  it('should get a mode by id', async () => {
    const { body } = await request(app).get(MODE_ROUTE)
    const mode = body.modes[0]
    const res = await request(app).get(MODE_ROUTE + `/${mode._id}`)

    expect(res.body).toEqual({ message: 'Success', mode })
  })
  it('should get all modes', async () => {
    const res = await request(app).get(MODE_ROUTE)

    expect(res.body).toEqual(modeGetAllResponse)
  })
  it('should update a mode', async () => {
    const { body } = await request(app).get(MODE_ROUTE)
    const mode = body.modes[0]
    const res = await request(app)
      .put(MODE_ROUTE + `/${mode._id}`)
      .send({
        ...mode,
        name: 'Lydian',
      })

    expect(res.body).toEqual({
      message: 'Success',
      mode: { ...mode, name: 'Lydian' },
    })
  })
  it('should delete a mode', async () => {
    const { body } = await request(app).get(MODE_ROUTE)
    const _id = body.modes[0]._id
    const res = await request(app).delete(MODE_ROUTE + `/${_id}`)

    expect(res.status).toEqual(200)
    expect(res.body).toEqual({ message: 'Success' })
  })
  it('should delete all modes', async () => {
    const res = await request(app).delete(MODE_ROUTE)

    expect(res.status).toEqual(200)
    expect(res.body).toEqual({ message: 'Success' })
  })
})
