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
  // scale: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Scale',
  // },
})

export const Mode = mongoose.model<ModeDocument>('Mode', modeSchema)
