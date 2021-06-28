const { ApolloServer, gql, UserInputError } = require("apollo-server-micro");
const validator = require("validator");
const find = require("../../lib/find");

const typeDefs = gql`
  type Book {
    id: String
    url: String
    title: String
    author: String
    publisher: String
    published: String
    description: String
    binding: String
    thumbnail: String
    smallThumbnail: String
    source: String
    pageCount: String
    country: String
    genre: String
  }

  type Query {
    get(isbn: String): Book
  }
`;

const resolvers = {
  Query: {
    async get(_parent, { isbn }, _context) {
      if (validator.isISBN(isbn)) {
        const data = await find(isbn);
        return { ...data };
      } else {
        throw new UserInputError(`Invalid ISBN: ${isbn}`);
      }
    }
  }
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });
module.exports = apolloServer.createHandler({ path: "/graphql" });
