import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const LoginForm = ({setToken, show, setPage}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login, result ] = useMutation(LOGIN, {    onError: (error) => {
    console.log(error.graphQLErrors[0])
  }
  })

  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      localStorage.setItem('user-token', token)
      setPage('authors')
      setToken(token)
      
    }
  }, [result.data])

  const submit = async (event) => {
    event.preventDefault()
    login({ variables: { username, password}})
    setUsername('')
    setPassword('')
  }

  if (!show) {
    return null
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          name
          <input value={username} onChange={({target}) => setUsername(target.value)} />
        </div>
        <div>
          password
          <input type="password" value={password} onChange={({target}) => setPassword(target.value)} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginForm