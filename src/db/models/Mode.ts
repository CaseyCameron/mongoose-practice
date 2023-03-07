import mongoose from 'mongoose'

export interface ModeDocument extends mongoose.Document {
  name: string
}

const modeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
})

export const Mode = mongoose.model<ModeDocument>('Mode', modeSchema)
