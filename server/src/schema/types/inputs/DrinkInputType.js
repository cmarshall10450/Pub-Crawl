import {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLString,
} from 'graphql'

const DrinkInputType = new GraphQLInputObjectType({
  name: 'DrinkInput',
  fields: () => ({
    name: {type: new GraphQLNonNull(GraphQLString)},
    abv: {type: GraphQLFloat},
    price: {type: new GraphQLNonNull(GraphQLFloat)},
  }),
})

export default DrinkInputType