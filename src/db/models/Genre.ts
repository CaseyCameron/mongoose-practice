import mongoose from 'mongoose'

export interface GenreDocument extends mongoose.Document {
  name: string
  origin: string
}

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  origin: {
    type: String,
    required: true,
    trim: true,
  },
})

export const Genre = mongoose.model<GenreDocument>('Genre', genreSchema)
