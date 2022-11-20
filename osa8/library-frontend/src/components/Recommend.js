import { ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'

const Recommend = (props) => {

  let books = useQuery(ALL_BOOKS, {variables: {genre: props.favorite}})

  if (!props.show){
    return                                   
  }

  if (books.loading) {
    return <div>loading...</div>
  }
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          
  return (
    <div>
      <h2>Recommendations</h2>
      <div>Books in your favourite genre <b>{props.favorite}</b></div>
    
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
    
    </div>
  )
}

export default Recommend