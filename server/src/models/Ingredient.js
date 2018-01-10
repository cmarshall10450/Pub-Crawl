import mongoose, { Schema } from 'mongoose'

const Ingredient = new Schema({
  name: {
    type: String,
    required: true,
  },
  measurement: {
    type: Number,
    required: true,
    default: 0,
  },
  unit: {
    type: String,
    required: true,
    default: '',
  },
})

export default mongoose.model('ingredient', Ingredient)