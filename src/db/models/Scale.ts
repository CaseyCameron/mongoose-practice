import mongoose from 'mongoose'

const scaleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  modes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Mode'
  }]
})

export const Scale = mongoose.model('Scale', scaleSchema)
