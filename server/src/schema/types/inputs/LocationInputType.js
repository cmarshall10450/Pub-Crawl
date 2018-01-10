import {
  GraphQLFloat,
  GraphQLInputObjectType,
  GraphQLList,
  GraphQLString,
} from 'graphql'

const LocationInputType = new GraphQLInputObjectType({
  name: 'LocationInputType',
  description: 'Input location data',
  fields: () => ({
    type: {type: GraphQLString},
    coordinates: {type: new GraphQLList(GraphQLFloat)},
  }),
})

export default LocationInputType