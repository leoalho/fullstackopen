import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      books
    }
  }
`

export const ALL_BOOKS = gql`
  query allBooks($genre: String){
    allBooks(genre: $genre){
      title
      published
      author{
        name
      }
    }
  }
`

export const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

export const ALL_GENRES = gql`
  query {
    allGenres
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const CREATE_BOOK = gql`
  mutation createBook($title: String!, $published: Int!, $author: String!, $genres: [String]!) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ){
      title
      published
      author {
        name
      }
      genres
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    addBook {
      title
      published
      author {
        name
      }
      genres
    }
  }
`

export const CHANGE_BIRTHYEAR = gql`
  mutation editBirth($name: String!, $setBornTo: Int!) {
    editAuthor(
      name: $name
      setBornTo: $setBornTo
    ){
      name
      born
    }
  }
`