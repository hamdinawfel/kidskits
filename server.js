require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const { PubSub } = require("graphql-subscriptions");

const mongoose = require("mongoose");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers/index.js");

const pubsub = new PubSub();

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub }),
});
const MONGO_URI = process.env.MONGO_URI;
mongoose
  .connect(MONGO_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB successfully connected"))
  .catch((err) => {
    console.log(`DB Connection Error: ${err.message}`);
  });
// Production set up
if (process.env.NODE_ENV === "production") {
  app.use(express.static("./client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
// port
const port = process.env.PORT || 8080;
server.listen(port, () => console.log(`Server running on port : ${port}`));
