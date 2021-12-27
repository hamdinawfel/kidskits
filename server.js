const { ApolloServer } = require("apollo-server");
const { PubSub } = require("graphql-subscriptions");

const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers/index.js");

const { MONGO_URI } = require("./config.js");
const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});

mongoose
  .connect(MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => {
    console.log(`DB Connection Error: ${err.message}`);
  });

server.listen({ port: 8080 }).then((res) => {
  console.log(`🚀  Server ready at ${res.url}`);
});
