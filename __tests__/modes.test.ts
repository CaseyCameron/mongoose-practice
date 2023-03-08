import request from 'supertest'
import app from '../src/app/app'
import {
  modeOne,
  modeTwo,
  modeToPost,
  modePostResponse,
  modeGetAllResponse,
} from '../src/app/utils/testing/modesData'
import { MODE_ROUTE } from '../src/app/utils/helpers'

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

describe('Mode exception tests', () => {
  afterEach(async () => {
    await request(app).delete(MODE_ROUTE)
  })

  it('should receive an error when posting without a name', async () => {
    const res = await request(app).post(MODE_ROUTE).send({ name: '' })

    expect(res.body).toEqual({
      message: 'Mode validation failed: name: Path `name` is required.',
    })
  })
  it('should receive an error when posting a duplicate name', async () => {
    await request(app).post(MODE_ROUTE).send(modeToPost)

    const res = await request(app).post(MODE_ROUTE).send(modeToPost)

    expect(res.body).toEqual({ message: 'Dorian already exists' })
  })
  it('should get appropriate message when mode not found by id', async () => {
    const res = await request(app).get(MODE_ROUTE + '/6407881015de82cce302b882')

    expect(res.body).toEqual({ message: 'Mode not found' })
  })
  it('should appropriate message when there are no modes', async () => {
    await request(app).delete(MODE_ROUTE)
    const res = await request(app).get(MODE_ROUTE)

    expect(res.body).toEqual({ message: 'There are no modes yet' })
  })
  it('should receive appropriate error when updating a mode not found', async () => {
    const res = await request(app)
      .put(MODE_ROUTE + '/6407881015de82cce302b882')
      .send({ _id: '6407881015de82cce302b882', name: 'New Mode Name', __v: 0 })

    expect(res.status).toEqual(500)
    expect(res.body).toEqual({ message: 'Mode not found' })
  })
  it('should 500 when trying to delete a mode that does not exist', async () => {
    const res = await request(app).delete(
      MODE_ROUTE + '/6407881015de82cce302b882'
    )

    expect(res.status).toEqual(500)
    expect(res.body).toEqual({ message: 'Mode not found' })
  })
})