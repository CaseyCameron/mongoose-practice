import mongoose from 'mongoose'
import request from 'supertest'
import app from '../../app'
import { genreOne, genreTwo, modeOne, scaleOne, scaleTwo } from '.'
import { COMPOSER_ROUTE, GENRE_ROUTE, MODE_ROUTE, SCALE_ROUTE} from '../helpers/index'

export const seedCollections = async () => {
  await request(app).post(MODE_ROUTE).send(modeOne)
  await request(app).post(SCALE_ROUTE).send(scaleOne)
  await request(app).post(SCALE_ROUTE).send(scaleTwo)
  await request(app).post(GENRE_ROUTE).send(genreOne)
  await request(app).post(GENRE_ROUTE).send(genreTwo)
  await request(app)
    .post(GENRE_ROUTE)
    .send({ name: 'Classical', origin: 'Europe' })
  await request(app)
      .post(COMPOSER_ROUTE)
      .send({
        name: 'Johnny Appleseed',
        dob: new Date('June 17, 1882'),
        scalesUsed: [],
        musicGenres: [],
      })
}

export const clearCollections = async () => {
  const collections = mongoose.connection.collections

  await Promise.all(
    Object.values(collections).map(async (collection) => {
      await collection.deleteMany({})
    })
  )
}
