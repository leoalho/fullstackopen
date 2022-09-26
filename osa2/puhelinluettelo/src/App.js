import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({change}) => (
  <div>
  filter shown with: <input onChange={change}/>
  </div>
)
const NameForm = ({submit, nameChange, newName, numberChange, newNumber}) => (
  <form onSubmit={submit}>
  <div>
    name: <input onChange={nameChange} value={newName}/>
  </div>
  <div>
    number: <input onChange={numberChange} value={newNumber}/>
  </div>
  <div>
    <button type="submit">add</button>
  </div>
</form>
)
const Persons = ({persons, nameFilter})=>(
  <div>
  {persons.filter(person => person.name.toUpperCase().includes(nameFilter)).map(person => <Person key={person.name} name={person.name} number ={person.number}/>)}
  </div>
)
const Person = ({name, number})=>(
  <>{name} {number}<br /></>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')

  const handleNameChange = (event)=>{
    setNewName(event.target.value)
  }

  const handleNumberChange = (event)=>{
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value.toUpperCase())
  }

  const addNewName = (event) => {
    event.preventDefault()
    if (persons.filter(e => e.name===newName).length>0){
      alert(`${newName} is already added to phonebook`)
    }
    else if (newName !== ''){
      let person = {name: newName, number: newNumber}
      setPersons(persons.concat(person))
    }
    setNewName('')
    setNewNumber('')

  }

  useEffect(() => {axios.get('http://localhost:3001/persons').then(response => {setPersons(response.data)})}, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter change={handleFilter}/>
      <h2>Add a new</h2>
      <NameForm submit={addNewName} nameChange={handleNameChange} newName={newName} numberChange={handleNumberChange} newNumber={newNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons} nameFilter={newFilter}/>
    </div>
  )

}

export default App