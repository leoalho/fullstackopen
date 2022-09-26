import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({change}) => (
  <div>
  find countries: <input onChange={change}/>
  </div>
)

const Country = ({country}) =>(
  <div>
    <h1>{country.name.common}</h1>
    <div>
      capital {country.capital[0]}<br/>
      area {country.area}
      <h3>Languages:</h3>
      <ul>
      {Object.values(country.languages).map(e => <li>{e}</li>)}
      </ul>
      <img src={country.flags.png} />
    </div>
  </div>
)

const Countries = ({filterString, countries, onlyOne}) => {


  let filteredCountries = countries.filter(e => e.name.common.toUpperCase().includes(filterString))
  if (filteredCountries.length>10){
    return(
      <div>Too many countries</div>
    )
  }
  if (filteredCountries.length===1){
    return <Country country={filteredCountries[0]} />
  }
  return(
    filteredCountries.map(e => <> {e.name.common}<button onClick={()=>{onlyOne(e.name.common.toUpperCase())}}>Show</button><br /></>)
  )
}

const App = ()=>{
  const [countries, setCountries] = useState([])
  const [newFilter, setFilter] = useState('')

  useEffect(() => {axios.get('https://restcountries.com/v3.1/all').then(response => {setCountries(response.data)})}, [])

  const handleFilter = (event) => {
    setFilter(event.target.value.toUpperCase())
  }

  return (
    <div>
      <Filter change={handleFilter} />
      <Countries filterString={newFilter} countries={countries} onlyOne={setFilter}/>
    </div>
  );
}

export default App;
