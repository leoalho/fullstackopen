import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, CHANGE_BIRTHYEAR } from '../queries'
import Select from 'react-select'

const Authors = (props) => {

  const [author, setAuthor] = useState('')
  const [born, setBorn] = useState('')

  const [ changeBirthyear ] = useMutation(CHANGE_BIRTHYEAR, {
    refetchQueries: [ { query: ALL_AUTHORS} ],
    onError: (error) => { 
      console.log(error) 
    }
  })

  const authors = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }

  if (authors.loading) {
    return <div>loading...</div>
  }

  const names = authors.data.allAuthors.map((n) =>{ return {value: n.name, label: n.name}})

  const submit = async (event) => {
    event.preventDefault()

    changeBirthyear({ variables: { name: author, setBornTo: parseInt(born)}})    

    setAuthor('')
    setBorn('')
  }

  if (!props.token){
    return (
      <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.books}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    )
  }
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <Select options={names} onChange={(choice) => {setAuthor(choice.value)}}></Select>
      <form onSubmit={submit}>
        <div>
          <input
            value={born}
            onChange={({target}) => setBorn(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors