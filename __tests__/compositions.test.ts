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
  compositionOne,
  compositionPostResponse,
  compositionTwo,
} from '../src/app/utils/testing'

const postComposition = async () => {
  const { body: scales } = await request(app).get(SCALE_ROUTE)
  const { body: genres } = await request(app).get(GENRE_ROUTE)
  const { body: composers } = await request(app).get(COMPOSER_ROUTE)

  return await request(app).post(COMPOSITION_ROUTE).send({
    name: 'Some Cool Composition',
    composer: [composers.composers[0]._id],
    scalesUsed: [scales.scales[0]._id],
    musicGenres: [genres.genres[0]._id]
  })
}

describe('Composition tests', () => {
  beforeAll(async () => {
    await seedCollections()
  })
  beforeEach(async () => {
    await request(app).post(COMPOSITION_ROUTE).send(compositionOne)
    await request(app).post(COMPOSITION_ROUTE).send(compositionTwo)
  })
  afterEach(async () => {
    await request(app).delete(COMPOSITION_ROUTE)
  })
  afterAll(async () => {
    await clearCollections()
  })

  it('should post a composition', async () => {
    const res = await postComposition()

    expect(res.body).toEqual(compositionPostResponse)
  })
  it('deletes all compositions', async () => {
    const res = await request(app).delete(COMPOSITION_ROUTE)

    expect(res.status).toBe(20)
    expect(res.body).toEqual({ message: 'Success' })
  })
})
