import mongoose, { Types } from 'mongoose'

export interface ComposerDocument extends mongoose.Document {
  name: string
  dob: Date
  scalesUsed: Types.ObjectId[]
  musicGenres: Types.ObjectId[]
}

const composerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  dob: {
    type: Date,
    required: true,
    trim: true,
  },
  scalesUsed: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Scale',
    },
  ],
  musicGenres: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Genre',
    },
  ],
})

export const Composer = mongoose.model('Composer', composerSchema)
