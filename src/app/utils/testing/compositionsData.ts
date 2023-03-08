import request from 'supertest'
import app from '../../app'
import { seedComposer } from './composersData'
import { COMPOSITION_ROUTE } from '../helpers/index'
import { mongooseProps } from './composersData'

export const seedDataForComposition = async () => {
  const composer = await seedComposer()
  console.log('composer.body', composer)
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
