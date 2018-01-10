import { GraphQLID, GraphQLList, GraphQLString } from 'graphql'
import Drink from '../../../models/Drink'
import DrinkType from './type'

const DrinkQuery = {
  drinks: {
    type: new GraphQLList(DrinkType),
    resolve () {
      return Drink.find({})
    },
  },
  drink: {
    type: DrinkType,
    args: {
      id: {type: GraphQLID},
      name: {type: GraphQLString},
    },
    resolve (parentValue, {id, name}) {
      if (id) {
        return Drink.findById(id)
      } else {
        return Drink.findOne({name})
      }
    },
  },
}

export default DrinkQuery