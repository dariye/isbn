const { ApolloServer, gql, UserInputError } = require("apollo-server-micro");
const validator = require("validator");
const { find } = require("../lib");

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
    get(isbn: String): Book
  }
`;

const resolvers = {
  Query: {
    async get(_parent, { isbn }, _context) {
      if (validator.isISBN(isbn)) {
        return find(isbn);
      } else {
        throw new UserInputError(`Invalid ISBN: ${isbn}`);
      }
    }
  }
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });
module.exports = apolloServer.createHandler({ path: "/graphql" });
