import { GraphQLObjectType, GraphQLSchema } from 'graphql'
import { mutations, queries } from './types/'

const query = new GraphQLObjectType({
  name: 'Root',
  fields: () => (queries),
})

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => (mutations),
})

export default new GraphQLSchema({
  query, mutation,
})