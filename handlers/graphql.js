const { ApolloServer, gql } = require("apollo-server-micro");

const typeDefs = gql`
  type Book {
    id: String
    url: String
    title: String
    isbn10: String
    isbn13: String
    author: String
    publisher: String
    published: String
    source: String
    language: String
    binding: String
    cover: String
  }

  type Query {
    get: String
  }
`;

const resolvers = {
  Query: {
    get(parent, args, context) {
      // console.log(parent, args, context)
      return "Hello World!";
    }
  }
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });
const graphqlPath = "/graphql";
module.exports = apolloServer.createHandler({ path: graphqlPath });
