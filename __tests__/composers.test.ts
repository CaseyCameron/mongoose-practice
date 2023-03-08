import request from 'supertest'
import app from '../src/app/app'
import { deleteCollection } from '../src/app/utils/helpers/generics'
import {
  clearCollections,
  seedCollections,
} from '../src/app/utils/testing/collections'
import { composerPostResponse, composerToPost } from '../src/app/utils/testing/composersData';
import { Composer } from '../src/db/models/Composer'

const COMPOSER_ROUTE = '/api/v1/composers'
const GENRE_ROUTE = '/api/v1/genres'
const MODE_ROUTE = '/api/v1/modes'
const SCALE_ROUTE = '/api/v1/scales'

describe.only('Composer tests', () => {
  beforeAll(async () => {
    await seedCollections()
  })
  beforeEach(async () => {
    await request(app).post(COMPOSER_ROUTE).send(composerToPost)
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
  it('should delete all composers', async () => {
    const res = await request(app).delete(SCALE_ROUTE)

    expect(res.status).toBe(200)
    expect(res.body).toEqual({ message: 'Success' })
  })
})
