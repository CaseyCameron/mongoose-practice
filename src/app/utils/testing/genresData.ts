import mongoose from 'mongoose';

const mongooseProps = {
  _id: expect.any(String),
  __v: expect.any(Number),
}

export const genreToPost = {
  name: 'Jazz',
  origin: 'USA'
}

export const genreOne = {
  name: 'Rock',
  origin: 'USA'
}

export const genreTwo = {
  name: 'Irish Folk',
  origin: 'Ireland'
}

export const genrePostResponse = {
  message: 'Success',
  genre: { ...genreToPost, ...mongooseProps}
}

export const genreGetAllResponse = {
  message: 'Success',
  genres: [
    { ...mongooseProps, ...genreOne },
    { ...mongooseProps, ...genreTwo }
  ]
}