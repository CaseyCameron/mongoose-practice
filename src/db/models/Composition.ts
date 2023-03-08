import mongoose, { Types } from 'mongoose'

export interface CompositionDocument extends mongoose.Document {
  name: string
  composer: Types.ObjectId
  musicGenre: Types.ObjectId[]
  scalesUsed: Types.ObjectId[]
}

const compositionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  composer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Composer',
  },
  musicGenres: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Genre',
    },
  ],
  scalesUsed: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Scale',
    },
  ],
})

export const Composition = mongoose.model('Composition', compositionSchema)
