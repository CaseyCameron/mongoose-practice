import mongoose from 'mongoose'
import request from 'supertest'
import app from '../../app'
import { genreOne, genreTwo, modeOne, scaleOne, scaleTwo } from '.'

const GENRE_ROUTE = '/api/v1/genres'
const MODE_ROUTE = '/api/v1/modes'
const SCALE_ROUTE = '/api/v1/scales'

export const seedCollections = async () => {
  await request(app).post(MODE_ROUTE).send(modeOne)
  await request(app).post(SCALE_ROUTE).send(scaleOne)
  await request(app).post(SCALE_ROUTE).send(scaleTwo)
  await request(app).post(GENRE_ROUTE).send(genreOne)
  await request(app).post(GENRE_ROUTE).send(genreTwo)
  await request(app)
    .post(GENRE_ROUTE)
    .send({ name: 'Classical', origin: 'Europe' })
}

export const clearCollections = async () => {
  const collections = mongoose.connection.collections

  await Promise.all(
    Object.values(collections).map(async (collection) => {
      await collection.deleteMany({})
    })
  )
}
