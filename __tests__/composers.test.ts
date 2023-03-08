import request from 'supertest'
import app from '../src/app/app'
import {
  clearCollections,
  seedCollections,
} from '../src/app/utils/testing/collections'
import { composerPostResponse, composerToPost } from '../src/app/utils/testing/composersData';

const COMPOSER_ROUTE = '/api/v1/composers'
const GENRE_ROUTE = '/api/v1/genres'
const MODE_ROUTE = '/api/v1/modes'
const SCALE_ROUTE = '/api/v1/scales'

describe.only('Composer tests', () => {
  beforeAll(async () => {
    await seedCollections()
  })

  afterAll(async () => {
    await clearCollections()
  })

  it('should post a composer', async () => {
    const { body: scales} = await request(app).get(SCALE_ROUTE)
    const { body: genres } = await request(app).get(GENRE_ROUTE)
    const res = await request(app).post(COMPOSER_ROUTE).send({
      name: 'Igor Stravinsky',
      dob: new Date('June 17, 1882'),
      scalesUsed: [scales.scales[0]._id],
      musicGenres: [genres.genres[0]._id],
    })
    expect(res.body).toEqual(composerPostResponse)
  })
})
