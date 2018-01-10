import { GraphQLInputObjectType, GraphQLString } from 'graphql'

const AddressInputType = new GraphQLInputObjectType({
  name: 'AddressInputType',
  description: 'Input address for a bar',
  fields: () => ({
    line1: {type: GraphQLString},
    line2: {type: GraphQLString},
    line3: {type: GraphQLString},
    city: {type: GraphQLString},
    postCode: {type: GraphQLString},
  }),
})

export default AddressInputType