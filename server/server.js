const express = require("express");
const path = require('path');
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const { schema } = require("./schema");
const { stateDB } = require("./data");

// The root provides a resolver function for each API endpoint
const DEFAULT_NUM_RETURN = 10;

const root = {
  stateTypeahead: ({ q, numReturn }) => {
    if (q === "") {
      return [];
    } else {
      return stateDB
        .filter((state) => state.name.toLowerCase().startsWith(q))
        .slice(0, numReturn ? numReturn : DEFAULT_NUM_RETURN);
    }
  },
};

// Running a GraphQL API server at localhost:4000/graphql'
const app = express();
app.use(cors());
app.use(express.static(path.join(__dirname, '../typeahead/dist')));
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: false,
  })
);
app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../typeahead/dist/index.html'));
  });  
app.listen(4000);
