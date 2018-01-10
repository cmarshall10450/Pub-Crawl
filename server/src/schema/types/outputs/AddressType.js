import { GraphQLObjectType, GraphQLString } from 'graphql'

const AddressType = new GraphQLObjectType({
  name: 'Address',
  fields: () => ({
    line1: {type: GraphQLString},
    line2: {type: GraphQLString},
    line3: {type: GraphQLString},
    city: {type: GraphQLString},
    postCode: {type: GraphQLString},
  }),
})

export default AddressType