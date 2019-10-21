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
        const data = await find(isbn);
        return {
          id: data.id,
          url: data.url,
          title: data.title,
          isbn10: data.isbn_10,
          isbn13: data.isbn_13,
          author: data.author,
          publisher: data.publisher,
          published: data.published,
          source: data.source,
          language: data.language,
          binding: data.binding,
          cover: data.cover
        };
      } else {
        throw new UserInputError(`Invalid ISBN: ${isbn}`);
      }
    }
  }
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });
module.exports = apolloServer.createHandler({ path: "/graphql" });
