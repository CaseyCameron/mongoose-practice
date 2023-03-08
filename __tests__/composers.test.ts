import request from 'supertest'
import app from '../src/app/app'
import {
  clearCollections,
  seedCollections,
  composerGetAllResponse,
  composerPostResponse,
  composerOne,
  composerTwo,
  mongooseProps,
  seedComposer,
  composerToPost,
} from '../src/app/utils/testing'
import { COMPOSER_ROUTE, GENRE_ROUTE, SCALE_ROUTE} from '../src/app/utils/helpers/globalVars'

const postAComposer = async () => {
  const { body: scales } = await request(app).get(SCALE_ROUTE)
  const { body: genres } = await request(app).get(GENRE_ROUTE)

  return await request(app)
    .post(COMPOSER_ROUTE)
    .send({
      name: 'Igor Stravinsky',
      dob: new Date('June 17, 1882'),
      scalesUsed: [scales.scales[0]._id],
      musicGenres: [genres.genres[0]._id],
    })
}

describe('Composer tests', () => {
  beforeAll(async () => {
    await seedCollections()
  })
  beforeEach(async () => {
    await request(app).post(COMPOSER_ROUTE).send(composerOne)
    await request(app).post(COMPOSER_ROUTE).send(composerTwo)
  })
  afterEach(async () => {
    await request(app).delete(COMPOSER_ROUTE)
  })
  afterAll(async () => {
    await clearCollections()
  })

  it('should post a composer', async () => {
    const res = await postAComposer()
    expect(res.body).toEqual(composerPostResponse)
  })
  it('should get a composer by id', async () => {
    const composer = await seedComposer()
    const { body } = await request(app).post(COMPOSER_ROUTE).send(composer)
    const res = await request(app).get(COMPOSER_ROUTE + `/${body.composer._id}`)

    expect(res.status).toBe(200)
    expect(res.body).toEqual({
      message: 'Success',
      composer: {
        ...composer,
        dob: expect.any(String),
        musicGenres: expect.any(Array),
        scalesUsed: expect.any(Array),
        ...mongooseProps,
      },
    })
  })
  it('should get all composers', async () => {
    const res = await request(app).get(COMPOSER_ROUTE)

    expect(res.body).toEqual(composerGetAllResponse)
  })
  it('should update a composer', async () => {
    const composer = await seedComposer()
    const { body } = await request(app).post(COMPOSER_ROUTE).send(composer)
    const res = await request(app)
      .put(COMPOSER_ROUTE + `/${body.composer._id}`)
      .send({
        ...composer,
        name: 'Tommy Two Socks',
      })

    expect(res.body).toEqual({
      message: 'Success',
      composer: {
        ...composer,
        name: 'Tommy Two Socks',
        dob: expect.any(String),
        musicGenres: expect.any(Array),
        scalesUsed: expect.any(Array),
        ...mongooseProps,
      },
    })
  })
  it('should delete a composer', async () => {
    const res = await request(app).delete(COMPOSER_ROUTE)

    expect(res.status).toBe(200)
    expect(res.body).toEqual({ message: 'Success' })
  })
  it('should delete all composers', async () => {
    const res = await request(app).delete(COMPOSER_ROUTE)

    expect(res.status).toBe(200)
    expect(res.body).toEqual({ message: 'Success' })
  })
})

describe('Composer exception tests', () => {
  afterEach(async () => {
    await request(app).delete(COMPOSER_ROUTE)
  })

  it('should receive an error when posting without a name', async () => {
    const res = await request(app).post(COMPOSER_ROUTE).send({ name: '' })

    expect(res.body).toEqual({
      message: 'Invalid value',
    })
  })
  it('should receive an error when posting a duplicate name', async () => {
    await request(app).post(COMPOSER_ROUTE).send(composerToPost)

    const res = await request(app).post(COMPOSER_ROUTE).send(composerToPost)

    expect(res.body).toEqual({ message: 'John Adams already exists' })
  })
  it('should get appropriate message when composer not found by id', async () => {
    const res = await request(app).get(
      COMPOSER_ROUTE + '/6407881015de82cce302b882'
    )

    expect(res.body).toEqual({ message: 'Composer not found' })
  })
  it('should appropriate message when there are no composers', async () => {
    await request(app).delete(COMPOSER_ROUTE)
    const res = await request(app).get(COMPOSER_ROUTE)

    expect(res.body).toEqual({ message: 'There are no composers yet' })
  })
  it('should receive appropriate error when updating a composer not found', async () => {
    const res = await request(app)
      .put(COMPOSER_ROUTE + '/6407881015de82cce302b882')
      .send({ _id: '6407881015de82cce302b882', name: 'New Composer Name', dob: new Date('March 5, 2021') })

    expect(res.status).toEqual(500)
    expect(res.body).toEqual({ message: 'Composer not found' })
  })
})