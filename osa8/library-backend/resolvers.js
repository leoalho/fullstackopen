const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const config = require('./config')
const jwt = require('jsonwebtoken')
const { gql, UserInputError, AuthenticationError } = require('apollo-server')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
  Query: {
    allBooks: async (root, args)=> {
      if(!args.genre){
        return Book.find({}).populate('author')
      }
      return Book.find({genres: { $in: args.genre}}).populate('author')
    },
    allAuthors: async () => Author.find({}),
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    me: (root, args, context) => context.currentUser,
    allGenres: async () => {
      let genres = []
      let books = await Book.find({})
      books.forEach((book) => {
        book.genres.forEach((genre) => {
          if (!genres.includes(genre)){
            genres.push(genre)
          }
        })
      })
      return genres
    }
  },
  
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      let author = await Author.findOne({name: args.author})
      if (!author){
        const newAuthor = new Author({ name: args.author, books: 1})
        const result = await newAuthor.save()
        var authorid = result._id
      }else{
        author.books += 1
        var authorid = author._id
        await author.save()
      }
      const book = new Book({...args, author: authorid})
      const result = await book.save()
      .catch(error => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      })
      await result.populate("author")
      
      pubsub.publish('BOOK_ADDED', { addBook: book})

      return book
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      
      const author = await Author.findOne({ name: args.name })
      try{
        author.born = args.setBornTo
        var result = await author.save()
      }catch(error){
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return result
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username })
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, config.JWT_SECRET) }
    }
  },
  Subscription: {
    addBook: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    }
  }
}

module.exports = resolvers