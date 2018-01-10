import {
  GraphQLFloat,
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'
import Drink from '../../../models/Drink'
import BarType from '../Bar/type'
import IngredientType from '../IngredientType'

const DrinkType = new GraphQLObjectType({
  name: 'DrinkType',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    abv: {type: GraphQLFloat},
    price: {type: GraphQLFloat},
    ingredients: {
      type: new GraphQLList(IngredientType),
      resolve (parentValue) {
        return Drink.getIngredients(parentValue.id)
      },
    },
    instructions: {
      type: new GraphQLList(GraphQLString),
      resolve (parentValue) {
        return Drink.getInstructions(parentValue.id)
      },
    },
    soldIn: {
      type: new GraphQLList(BarType),
      resolve (parentValue) {
        return Drink.findById(parentValue.id)
          .populate('soldIn')
          .then(drink => {
            return drink.soldIn
          })
      },
    },
  }),
})

export default DrinkType