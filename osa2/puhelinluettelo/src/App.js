import { useState, useEffect } from 'react'
import numberService from './services/numbers'

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
const Persons = ({persons, nameFilter, setPersons, setNotification})=>{

  const poista = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      setNotification(["delete", name])
      setTimeout(() => {setNotification(null)}, 5000)
      numberService.poista(id).then(()=>(numberService.create()).then(response => {setPersons(response.data)}))
    }
  }

  return(
  <div>
  {persons.filter(person => person.name.toUpperCase().includes(nameFilter))
  .map(person => <><Person key={person.name} name={person.name} number ={person.number}/> <button onClick={()=>{return poista(person.id, person.name)}}>Delete</button><br/></>)}
  </div>
)}
const Person = ({name, number})=>(
  <>{name} {number}</>
)

const Notification = ({type}) => {
  if (type === null) {
    return null
  }
  if (type[0]==="add")
  return (
    <div className="notification add">
      Added user {type[1]}
    </div>
  )
  if (type[0]==="delete") {
    return (
      <div className="notification delete">
        Deleted user {type[1]}
      </div>
    )
  }
  if (type[0]==="error"){
    return (
      <div className="notification delete">
      User {type[1]} has already been deleted
      </div>
    )
  }
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

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
      if (window.confirm(`${newName} is already added to phonebook. Do you want to update?`)){
        let person = persons.find(n => n.name === newName)
        let newPerson = { ...person, number: newNumber}
        numberService.put(newPerson).then(()=>(numberService.create()).then(response => {
          setPersons(response.data)
          setNewName('')
          setNewNumber('')
          setNotification(["add", newName])
          setTimeout(() => {setNotification(null)}, 5000)
        }))
      } 
    }
    else if (newName !== ''){
      let person = {name: newName, number: newNumber}
      numberService.update(person).then((response)=>{
        setNewName('')
        setNewNumber('')
        setPersons(persons.concat(response.data))
        setNotification(["add", newName])
        setTimeout(() => {setNotification(null)}, 5000)
      }).catch(error => {
        setNotification(["error", newName])
      })
    }
  }

  useEffect(() => {numberService.create().then(response => {setPersons(response.data)})}, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification type={notification}/>
      <Filter change={handleFilter}/>
      <h2>Add a new</h2>
      <NameForm submit={addNewName} nameChange={handleNameChange} newName={newName} numberChange={handleNumberChange} newNumber={newNumber}/>
      <h2>Numbers</h2>
      <Persons persons={persons} nameFilter={newFilter} setPersons={setPersons} setNotification={setNotification}/>
    </div>
  )

}

export default App