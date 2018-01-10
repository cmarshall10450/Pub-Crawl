import gql from 'graphql-tag'

export default gql`
  query barsNearLocation($name: String, $distance: Float){
    barsNearLocation(name: $name, distance: $distance) {
      name
    }
  }
`