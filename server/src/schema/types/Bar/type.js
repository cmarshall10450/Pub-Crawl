import {
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql'
import Bar from '../../../models/Bar'
import DrinkType from '../Drink/type'
import AddressType from '../outputs/AddressType'
import LocationType from '../outputs/LocationType'

const BarType = new GraphQLObjectType({
  name: 'BarType',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    address: {type: AddressType},
    location: {type: LocationType},
    drinks: {
      type: new GraphQLList(DrinkType),
      resolve (parentValue) {
        return Bar.getDrinks(parentValue.id)
      },
    },
  }),
})

export default BarType