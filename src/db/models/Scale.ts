import mongoose, { Types } from 'mongoose'

export interface IScaleModel extends mongoose.Document {
  name: string,
  modes: Types.ObjectId[]
}

const scaleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  modes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Mode',
    },
  ],
})

export const Scale = mongoose.model<IScaleModel>('Scale', scaleSchema)
