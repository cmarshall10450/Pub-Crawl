import { GraphQLFloat, GraphQLID, GraphQLList, GraphQLString } from 'graphql'
import Bar from '../../../models/Bar'
import BarType from './type'

const BarQuery = {
  bars: {
    type: new GraphQLList(BarType),
    resolve () {
      return Bar.find({})
    },
  },
  bar: {
    type: BarType,
    args: {
      id: {type: GraphQLID},
      name: {type: GraphQLString},
    },
    resolve (parentValue, {id, name}) {
      if (id) {
        return Bar.findById(id)
      } else {
        return Bar.findOne({name})
      }
    },
  },
  barsNearBy: {
    type: new GraphQLList(BarType),
    args: {
      lat: {type: GraphQLFloat},
      lng: {type: GraphQLFloat},
      distance: {type: GraphQLFloat},
    },
    resolve (parentValue, {lat, lng, distance}) {
      return Bar.getBarsNear(lat, lng, distance)
    },
  },
  barsNearLocation: {
    type: new GraphQLList(BarType),
    args: {
      name: {type: GraphQLString},
      distance: {type: GraphQLFloat},
    },
    resolve (parentValue, {name, distance}) {
      return Bar.getBarsNearBar(name, distance)
    },
  },
}

export default BarQuery