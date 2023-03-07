const mongooseProps = {
  _id: expect.any(String),
  __v: expect.any(Number),
}

export const modeToPost = {
  name: 'Dorian',
}

export const modeOne = {
  name: 'Dorian b2'
}

export const modeTwo = {
  name: 'Lydian Dominant'
}

export const modePostResponse = {
  message: 'Success',
  mode: { ...modeToPost, ...mongooseProps}
}

export const modeGetAllResponse = {
  message: 'Success',
  modes: [
    { ...mongooseProps, name: 'Dorian b2'},
    { ...mongooseProps, name: 'Lydian Dominant'},
  ]
}