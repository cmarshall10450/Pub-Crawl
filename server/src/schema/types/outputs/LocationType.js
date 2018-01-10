import {
  GraphQLFloat,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'

const LocationType = new GraphQLObjectType({
  name: 'LocationType',
  fields: () => ({
    type: {type: GraphQLString},
    coordinates: {type: new GraphQLList(GraphQLFloat)},
  }),
})

export default LocationType