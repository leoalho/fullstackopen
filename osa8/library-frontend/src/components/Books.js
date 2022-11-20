import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_BOOKS, ALL_GENRES } from '../queries'

const Books = (props) => {
  
  const [genre, setGenre] = useState(null)

  const variable = genre ? genre.genre : null

  let books = useQuery(ALL_BOOKS, {variables: {genre: variable}})

  const genreList = useQuery(ALL_GENRES)

  if (!props.show) {
    return null
  }

  if (books.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Published</th>
            <th>Author</th>
          </tr>
          {books.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.published}</td>
              <td>{a.author.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {genreList.data.allGenres.map((genre) => {
          return(
          <button key={genre} onClick={() => {setGenre({genre})}}>{genre}</button>
        )})}
        <button onClick={() => {setGenre(null)}}>All Genres</button>
      </div>

    </div>
  )
}

export default Books