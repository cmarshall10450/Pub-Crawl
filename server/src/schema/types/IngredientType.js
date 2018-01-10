import { GraphQLFloat, GraphQLObjectType, GraphQLString } from 'graphql'

const IngredientType = new GraphQLObjectType({
  name: 'IngredientType',
  fields: () => ({
    name: {type: GraphQLString},
    measurement: {type: GraphQLFloat},
    unit: {type: GraphQLString},
  }),
})

export default IngredientType