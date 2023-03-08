import request from 'supertest'
import app from '../../app'
import { seedComposer } from './composersData'
import { COMPOSITION_ROUTE } from '../helpers/index'
import { mongooseProps } from './composersData'

export const seedDataForComposition = async () => {
  const composer = await seedComposer()
  console.log('composer.body', composer)
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
