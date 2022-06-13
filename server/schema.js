const { buildSchema } = require("graphql");

const schema = buildSchema(`
type LngLat {
    lng: Float,
    lat: Float
  }

  type State {
    id: ID!,
    type: String,
    name: String,
    abbreviation: String
    boundary: [LngLat]
    center: LngLat
  }

  type Query {
    stateTypeahead(q: String, numReturn: Int): [State]
  }
`);

class LngLat {
  constructor(lng, lat) {
    this.lng = lng;
    this.lat = lat;
  }
}

class State {
  constructor(id, { type, name, abbreviation, boundary, center }) {
    this.id = id;
    this.type = type;
    this.name = name;
    this.abbreviation = abbreviation;
    this.boundary = boundary;
    this.center = center;
  }
}

exports.schema = schema;
exports.State = State;
exports.LngLat = LngLat;
