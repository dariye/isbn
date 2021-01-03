const { ApolloServer, gql, UserInputError } = require("apollo-server-micro");
const validator = require("validator");
const { find } = require("../../lib");

const typeDefs = gql`
  type Book {
    id: String
    url: String
    title: String
    isbn_10: String
    isbn_13: String
    author: String
    publisher: String
    published: String
    source: String
    language: String
    description: String
    excerpt: String
    genre: String
    binding: String
    printType: String
    maturityRating: String
    thumbnail: String
    smallThumbnail: String
    sourceLink: String
    pageCount: Int
    country: String
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
