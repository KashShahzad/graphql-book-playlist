const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");

const app = express();

mongoose.connect(
  "mongodb+srv://gql:abc1122@cluster.selce.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }
);



mongoose.connection.once("open", () => {
  console.log("connected");
});

//to graphql route, whenever a request is fired, graphHTTP (middlewear) handles it-> it mush contain schema
app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    //for dummy frontend
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log("Now listening");
});
