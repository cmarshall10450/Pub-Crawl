import { Schema } from 'mongoose'

const GeoLocation = new Schema({
  type: {
    type: String,
    default: 'Point',
  },
  coordinates: {
    type: [Number],
    index: '2dsphere',
  },
})

export default GeoLocation