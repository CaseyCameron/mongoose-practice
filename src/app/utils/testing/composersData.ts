const mongooseProps = {
  _id: expect.any(String),
  __v: expect.any(Number),
}

export const composerToPost = {
  name: 'Igor Stravinsky',
  dob: new Date('June 17, 1882'),
  scalesUsed: [{ name: 'Melodic Minor' }, { name: 'Ionian' }],
  musicGenres: [{ name: 'Classical', origin: 'Europe' }],
}

export const composerOne = {
  name: 'Cool Composer',
  dob: new Date('January 19th, 1972'),
  scalesUsed: [{ name: 'Ionian' }],
  musicGenres: [{ name: 'Rock', origin: 'USA' }],
}

export const composerTwo = {
  name: 'Rad Composer',
  dob: new Date('May 5th, 1952'),
  scalesUsed: [{ name: 'Ionian' }],
  musicGenres: [{ name: 'Jazz', origin: 'USA' }],
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
    { ...composerOne, ...mongooseProps },
    { ...composerTwo, ...mongooseProps },
  ],
}
