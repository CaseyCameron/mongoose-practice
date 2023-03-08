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
import { compositionPostResponse } from '../src/app/utils/testing';

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
  afterAll(async () => {
    await clearCollections()
  })

  it('should post a composition', async () => {
    const res = await postComposition()
    console.log('res.body', res.body)
    expect(res.body).toEqual(compositionPostResponse)
  })
})
