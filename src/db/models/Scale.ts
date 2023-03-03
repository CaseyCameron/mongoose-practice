import mongoose from 'mongoose'

const scaleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  modes: [
    {
      name: {
        type: String,
        trim: true,
      },
    },
  ],
})

export default mongoose.model('Scale', scaleSchema)
