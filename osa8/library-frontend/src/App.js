import { useState } from 'react'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import { ME, BOOK_ADDED } from './queries'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'
import LoginForm from './components/LoginForm'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const favorite = useQuery(ME)

  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      window.alert(`${data.data.addBook.title} by ${data.data.addBook.author.name} added`)
      setPage(page)
    }
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()  }
  
  if (!token){
    return(
      <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('login')}>login</button>
      </div>

      <Authors show={page === 'authors'} />
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} />
      <LoginForm show={page === 'login'}  setToken={setToken} setPage={setPage}/>
    </div> 
    )
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommend')}>recommend</button>
        <button onClick={logout}>Logout</button>
      </div>

      <Authors show={page === 'authors'} token={token}/>
      <Books show={page === 'books'} />
      <NewBook show={page === 'add'} />
      <Recommend show={page === 'recommend'} favorite={favorite.data.me.favoriteGenre}/>
      <LoginForm show={page === 'login'}  setToken={setToken} setPage={setPage}/>
    </div>
  )
}

export default App