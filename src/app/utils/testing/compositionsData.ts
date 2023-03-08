import request from 'supertest'
import app from '../../app'
import { seedComposer } from './composersData'
import { COMPOSER_ROUTE, COMPOSITION_ROUTE } from '../helpers/index'
import { mongooseProps } from './composersData'

export const seedDataForComposition = async () => {
  const composer = await seedComposer()
  return composer
}

export const seedComposition = async () => {
  const compositionResponse = await seedDataForComposition()
  const composer = await request(app).post(COMPOSER_ROUTE).send(compositionResponse)
  const composerId = composer.body.composer._id
  const { scalesUsed, musicGenres } = compositionResponse

  return {
    name: 'Really Cool Composition',
    composer: composerId,
    scalesUsed,
    musicGenres
  }
}

export const compositionOne = {
  name: 'All The Things You Are',
  composer: 'Oscar Hammerstein',
  scalesUsed: [],
  musicGenres: [],
}

export const compositionTwo = {
  name: 'Rich Girl',
  composer: 'Hall and Oates',
  scalesUsed: [],
  musicGenres: [],
}

export const compositionPostResponse = {
  message: 'Success',
  composition: {
    name: 'Some Cool Composition',
    composer: expect.any(String),
    musicGenres: expect.any(Array),
    scalesUsed: expect.any(Array),
    ...mongooseProps,
  },
}
