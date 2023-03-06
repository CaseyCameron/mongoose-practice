export const scaleToPost = {
  name: 'Ionian',
  modes: [
    {
      name: 'Dorian',
    },
  ],
}

export const scaleOne = {
  name: 'Melodic Minor',
  modes: [
    {
      name: 'Dorian',
    },
  ],
}

export const scaleTwo = {
  name: 'Harmonic Major',
  modes: [
    {
      name: 'Dorian',
    },
  ],
}

export const scalePostResponse = {
  message: 'Success',
  scale: {
    name: 'Ionian',
    modes: expect.arrayContaining([expect.any(String)]),
    _id: expect.any(String),
    __v: expect.any(Number),
  },
}

export const scaleGetAllResponse = {
  message: 'Success',
  scales: [
    {
      _id: expect.any(String),
      name: 'Melodic Minor',
      modes: [
        {
          name: 'Dorian',
          _id: expect.any(String),
          __v: expect.any(Number),
        },
      ],
      __v: expect.any(Number),
    },
    {
      _id: expect.any(String),
      name: 'Harmonic Major',
      modes: [
        {
          name: 'Dorian',
          _id: expect.any(String),
          __v: expect.any(Number),
        },
      ],
      __v: expect.any(Number),
    },
  ],
}
