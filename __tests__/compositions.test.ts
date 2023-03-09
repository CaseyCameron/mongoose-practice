import request from 'supertest'
import app from '../src/app/app'
import {
  clearCollections,
  seedCollections,
} from '../src/app/utils/testing/collections'
import {
  COMPOSER_ROUTE,
  COMPOSITION_ROUTE,
  GENRE_ROUTE,
  SCALE_ROUTE,
} from '../src/app/utils/helpers/globalVars'
import {
  compositionGetAllResponse,
  compositionOne,
  compositionPostResponse,
  compositionTwo,
  mongooseProps,
} from '../src/app/utils/testing'

const postComposition = async (name: string) => {
  const { body: scales } = await request(app).get(SCALE_ROUTE)
  const { body: genres } = await request(app).get(GENRE_ROUTE)
  const { body: composers } = await request(app).get(COMPOSER_ROUTE)

  return await request(app)
    .post(COMPOSITION_ROUTE)
    .send({
      name,
      composer: [composers.composers[0]._id],
      scalesUsed: [scales.scales[0]._id],
      musicGenres: [genres.genres[0]._id],
    })
}

describe('Composition tests', () => {
  beforeEach(async () => {
    await seedCollections()
    await postComposition('Pretty Good Composition')
    await postComposition('An Okay Composition')
  })
  afterEach(async () => {
    await request(app).delete(COMPOSITION_ROUTE)
    await clearCollections()
  })

  it('should post a composition', async () => {
    const res = await postComposition('Some Cool Composition')

    expect(res.status).toBe(201)
    expect(res.body).toEqual(compositionPostResponse)
  })
  it('should get a composition by id', async () => {
    const composition = await postComposition('Some Other Composition')
    const _id = composition.body.composition._id
    const res = await request(app).get(COMPOSITION_ROUTE + `/${_id}`)

    expect(res.status).toBe(200)
    expect(res.body).toEqual(res.body)
  })
  it('should get all compositions', async () => {
    const res = await request(app).get(COMPOSITION_ROUTE)

    expect(res.status).toBe(200)
    expect(res.body).toEqual(compositionGetAllResponse)
  })
  it('should edit a composition', async () => {
    const { body } = await postComposition('Some Silly Composition')
    const _id = body.composition._id
    const composition = body.composition.composition
    const res = await request(app)
      .put(COMPOSITION_ROUTE + `/${_id}`)
      .send({
        name: 'Cool Composition 30',
        ...composition,
      })

    expect(res.status).toBe(200)
    expect(res.body).toEqual({
      message: 'Success',
      composition: {
        name: 'Cool Composition 30',
        composer: expect.any(String),
        musicGenres: expect.any(Array),
        scalesUsed: expect.any(Array),
        ...mongooseProps,
      },
    })
  })
  it('should delete all compositions', async () => {
    const res = await request(app).delete(COMPOSITION_ROUTE)

    expect(res.status).toBe(200)
    expect(res.body).toEqual({ message: 'Success' })
  })
})

describe('Composition exception tests', () => {
  beforeEach(async () => {
    await seedCollections()
    await postComposition(compositionOne.name)
    await postComposition(compositionTwo.name)
  })
  afterEach(async () => {
    await request(app).delete(COMPOSITION_ROUTE)
    await clearCollections()
  })

  it('should receive an error when posting without a name', async () => {
    const res = await request(app).post(COMPOSITION_ROUTE).send({ name: '' })

    expect(res.status).toBe(500)
    expect(res.body).toEqual({
      message: 'Invalid value',
    })
  })
  it('should receive an error when posting a duplicate name', async () => {
    await postComposition('Hammer Time')
    const res = await postComposition('Hammer Time')

    expect(res.status).toBe(500)
    expect(res.body).toEqual({
      message: 'Hammer Time already exists',
    })
  })
  it('should get appropriate message when composition not found by id', async () => {
    const res = await request(app).get(
      COMPOSITION_ROUTE + '/6407881015de82cce302b882'
    )

    expect(res.status).toBe(500)
    expect(res.body).toEqual({ message: 'Composition not found' })
  })
  it('should appropriate message when there are no compositions', async () => {
    await request(app).delete(COMPOSITION_ROUTE)
    const res = await request(app).get(COMPOSITION_ROUTE)

    expect(res.status).toBe(200)
    expect(res.body).toEqual({ message: 'There are no compositions yet' })
  })
  it('should receive appropriate error when updating a composer not found', async () => {
    const res = await request(app)
      .put(COMPOSITION_ROUTE + '/6407881015de82cce302b882')
      .send({ _id: '6407881015de82cce302b882', name: 'New Composition Name' })

    expect(res.status).toEqual(500)
    expect(res.body).toEqual({ message: 'Composition not found' })
  })
})
