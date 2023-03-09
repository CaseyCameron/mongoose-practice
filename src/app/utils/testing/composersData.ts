import request from 'supertest'
import app from '../../app'
import { GENRE_ROUTE, MODE_ROUTE, SCALE_ROUTE} from '../helpers/index'

export const seedDataForComposer = async () => {
  const modeResponse = await request(app)
    .post(MODE_ROUTE)
    .send({ name: 'Mixolydian' })
  const name = modeResponse.body.mode

  const scaleOne = await request(app)
    .post(SCALE_ROUTE)
    .send({ name: 'Pentatonic', modes: [name] })

  const genreOne = await request(app)
    .post(GENRE_ROUTE)
    .send({ name: 'Bossa Nova', origin: 'Brazil' })
  
  return {
    scaleOne: scaleOne.body.scale,
    genreOne: genreOne.body.genre._id,
  }
}

export const seedComposer = async () => {
  const composerResponse = await seedDataForComposer()
  const { scaleOne, genreOne } = composerResponse

  return {
    name: 'Igor Stravinsky',
    dob: new Date('June 17, 1882'),
    scalesUsed: [scaleOne],
    musicGenres: [genreOne],
  }
}

export const mongooseProps = {
  _id: expect.any(String),
  __v: expect.any(Number),
}

export const composerToPost = {
  name: 'John Adams',
  dob: new Date('February 15, 1947'),
  scalesUsed: [],
  musicGenres: [],
}

export const composerOne = {
  name: 'Cool Composer',
  dob: new Date('January 19, 1972'),
  scalesUsed: [],
  musicGenres: [],
}

export const composerTwo = {
  name: 'Rad Composer',
  dob: new Date('May 5, 1952'),
  scalesUsed: [],
  musicGenres: [],
}

export const composerPostResponse = {
  message: 'Success',
  composer: {
    name: 'Igor Stravinsky',
    dob: expect.any(String),
    scalesUsed: expect.any(Array),
    musicGenres: expect.any(Array),
    ...mongooseProps,
  },
}

export const composerGetAllResponse = {
  message: 'Success',
  composers: [
    {
      name: 'Johnny Appleseed',
      dob: expect.any(String),
      scalesUsed: [],
      musicGenres: [],
      ...mongooseProps,
    },
    {
      name: 'Cool Composer',
      dob: expect.any(String),
      scalesUsed: [],
      musicGenres: [],
      ...mongooseProps,
    },
    {
      name: 'Rad Composer',
      dob: expect.any(String),
      scalesUsed: [],
      musicGenres: [],
      ...mongooseProps,
    },
  ],
}
