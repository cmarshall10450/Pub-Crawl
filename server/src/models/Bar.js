import mongoose, { Schema } from 'mongoose'
import Drink from './Drink'
import GeoLocation from './GeoLocation'

const Bar = new Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    line1: String,
    line2: String,
    city: String,
    postCode: String,
  },
  location: {
    type: GeoLocation,
  },
  drinks: [
    {
      type: Schema.Types.ObjectId,
      default: [],
      ref: 'drink',
    },
  ],
})

Bar.statics.addDrink = async function (id, drinkId) {
  const drink = await Drink.findById(drinkId)

  return this.findById(id)
    .then(async bar => {
      bar.drinks.push(drink)
      drink.soldIn.push(bar)
      return Promise.all([bar.save(), drink.save()])
        .then(([bar, drink]) => bar)
    })
}

Bar.statics.removeDrink = async function (id, drinkId) {
  const drink = await Drink.findById(drinkId)

  return this.findById(id)
    .then(async bar => {
      const index = bar.drinks.indexOf(drink)
      bar.drinks.splice(index, 1)
      return await bar.save()
    })
}

Bar.statics.getDrinks = function (id) {
  return this.findById(id)
    .populate('drinks')
    .then(bar => bar.drinks)
}

Bar.statics.getBarsNear = function (lat, lng, distance) {
  return this.geoNear({
      type: 'Point',
      coordinates: [lat, lng],
    }, {
      maxDistance: distance,
      spherical: true,
    },
  )
    .then(bars => bars.map(bar => bar.obj))
    .catch(err => console.log(err))
}

Bar.statics.getBarsNearBar = async function (name, distance) {
  const bar = await this.findOne({name})
  const [lat, lng] = bar.location.coordinates

  return this.geoNear({
      type: 'Point',
      coordinates: [lat, lng],
    }, {
      maxDistance: distance,
      spherical: true,
    },
  )
    .then(bars => bars.map(bar => bar.obj))
    .then(bars => bars.filter(bar => bar.name !== name))
    .catch(err => console.log(err))
}

export default mongoose.model('bar', Bar)