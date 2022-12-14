const { gql } = require('apollo-server')

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    books: Int
  }
  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String]!
    id: ID!
  }
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  type Token {
    value: String!
  }
  type Query {
    allBooks(genre: String): [Book!]!
    allAuthors: [Author!]!
    bookCount: Int!
    authorCount: Int!
    me: User
    allGenres: [String!]!
  }
  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(
      username: String!
      favoriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
  type Subscription {
    addBook: Book!
  }
`

module.exports = typeDefs