import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql'
import Bar from '../../../models/Bar'
import Drink from '../../../models/Drink'
import AddressInputType from '../inputs/AddressInputType'
import DrinkInputType from '../inputs/DrinkInputType'
import LocationInputType from '../inputs/LocationInputType'
import BarType from './type'

const BarMutation = {
  addBar: {
    type: BarType,
    args: {
      name: {type: GraphQLString},
      address: {type: AddressInputType},
      location: {type: LocationInputType},
    },
    resolve (parentValue, {name, address, location}) {
      return new Bar(
        {name, address, location},
      )
        .save()
    },
  },
  addDrinkToBar: {
    type: BarType,
    args: {
      id: {type: GraphQLID},
      drink: {type: DrinkInputType},
    },
    resolve (parentValue, {id, drink}) {
      const newDrink = new Drink(drink)

      return Bar.findById(id)
        .then(bar => {
          bar.drinks.push(newDrink)
          newDrink.soldIn.push(bar)
          return Promise.all([bar.save(), newDrink.save()])
            .then(([bar, drink]) => bar)
        })
    },
  },
  removeDrinkFromBar: {
    type: BarType,
    args: {
      barId: {type: new GraphQLNonNull(GraphQLID)},
      drinkId: {type: new GraphQLNonNull(GraphQLID)},
    },
    resolve (parentValue, {barId, drinkId}) {
      const drink = Drink.findById(drinkId)

      return Bar.findById(barId)
        .then(bar => {
          const index = bar.drinks.indexOf(drink)
          bar.drinks.splice(index, 1)
          Drink.findByIdAndRemove(drinkId)
          return bar.save()
        })
        .catch(err => console.log(err))
    },
  },
}

export default BarMutation