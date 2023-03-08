import request from 'supertest'
import app from '../src/app/app'
import {
  genreOne,
  genreTwo,
  genreToPost,
  genrePostResponse,
  genreGetAllResponse,
} from '../src/app/utils/testing/genresData'

const GENRE_ROUTE = '/api/v1/genres'

describe('genre tests', () => {
  beforeEach(async () => {
    await request(app).post(GENRE_ROUTE).send(genreOne)
    await request(app).post(GENRE_ROUTE).send(genreTwo)
  })
  afterEach(async () => {
    await request(app).delete(GENRE_ROUTE)
  })
  it('should post a genre', async () => {
    const res = await request(app).post(GENRE_ROUTE).send(genreToPost)

    expect(res.body).toEqual(genrePostResponse)
  })
  it('should get a genre by id', async () => {
    const { body } = await request(app).get(GENRE_ROUTE)
    const genre = body.genres[0]
    const res = await request(app).get(GENRE_ROUTE + `/${genre._id}`)

    expect(res.body).toEqual({ message: 'Success', genre })
  })
  it('should get all genres', async () => {
    const res = await request(app).get(GENRE_ROUTE)

    expect(res.body).toEqual(genreGetAllResponse)
  })
  it('should update a genre', async () => {
    const { body } = await request(app).get(GENRE_ROUTE)
    const genre = body.genres[0]
    const res = await request(app)
      .put(GENRE_ROUTE + `/${genre._id}`)
      .send({
        ...genre,
        name: 'Tango',
        origin: 'Spain',
      })

    expect(res.body).toEqual({
      message: 'Success',
      genre: { ...genre, name: 'Tango', origin: 'Spain' },
    })
  })
  it('should delete a genre', async () => {
    const { body } = await request(app).get(GENRE_ROUTE)
    const _id = body.genres[0]._id
    const res = await request(app).delete(GENRE_ROUTE + `/${_id}`)

    expect(res.status).toEqual(200)
    expect(res.body).toEqual({ message: 'Success' })
  })
  it('should delete all genres', async () => {
    const res = await request(app).delete(GENRE_ROUTE)

    expect(res.status).toBe(200)
    expect(res.body).toEqual({ message: 'Success' })
  })
})

describe('Genre exception tests', () => {
  afterEach(async () => {
    await request(app).delete(GENRE_ROUTE)
  })

  it('should receive an error when posting without a name', async () => {
    const res = await request(app).post(GENRE_ROUTE).send({ name: '' })

    expect(res.body).toEqual({
      message: 'Invalid value',
    })
  })
  it('should receive an error when posting a duplicate name', async () => {
    await request(app).post(GENRE_ROUTE).send(genreToPost)

    const res = await request(app).post(GENRE_ROUTE).send(genreToPost)

    expect(res.body).toEqual({ message: 'Jazz already exists' })
  })
  it('should get appropriate message when genre not found by id', async () => {
    const res = await request(app).get(
      GENRE_ROUTE + '/6407881015de82cce302b882'
    )

    expect(res.body).toEqual({ message: 'Genre not found' })
  })
  it('should appropriate message when there are no genres', async () => {
    await request(app).delete(GENRE_ROUTE)
    const res = await request(app).get(GENRE_ROUTE)

    expect(res.body).toEqual({ message: 'There are no genres yet' })
  })
  it('should receive appropriate error when updating a genre not found', async () => {
    const res = await request(app)
      .put(GENRE_ROUTE + '/6407881015de82cce302b882')
      .send({ _id: '6407881015de82cce302b882', name: 'New Genre Name', origin: 'Rock', __v: 0 })

    expect(res.status).toEqual(500)
    expect(res.body).toEqual({ message: 'Genre not found' })
  })
  it('should 500 when trying to delete a genre that does not exist', async () => {
    const res = await request(app).delete(
      GENRE_ROUTE + '/6407881015de82cce302b882'
    )

    expect(res.status).toEqual(500)
    expect(res.body).toEqual({ message: 'Genre not found' })
  })
})
