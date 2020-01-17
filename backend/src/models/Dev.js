import mongoose from 'mongoose'

const DevSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  techs: {
    type: [String],
    default: [],
  },
  name: {
    type: String,
    required: true,
  },
  avatar_url: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
})

DevSchema.index({ location: '2dsphere' })

export default mongoose.model('Dev', DevSchema)
