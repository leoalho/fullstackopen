const express = require('express')
var morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(express.json())
//app.use(morgan('tiny'))
morgan.token('body', (req, res) => JSON.stringify(req.body));
app.use(morgan(':method :url :status :response-time ms - :res[content-length] :body - :req[content-length]'));
app.use(cors())

let henkilot = [
      { 
        "name": "Arto Hellas", 
        "number": "040-123456",
        "id": 1
      },
      { 
        "name": "Ada Lovelace", 
        "number": "39-44-5323523",
        "id": 2
      },
      { 
        "name": "Dan Abramov", 
        "number": "12-43-234345",
        "id": 3
      },
      { 
        "name": "Mary Poppendieck", 
        "number": "39-23-6423122",
        "id": 4
      }
    ]
  
app.get('/api/persons', (req, res) => {
    res.json(henkilot)
})

app.post('/api/persons', (req, res) => {
    const id = Math.floor(Math.random() * 10000)
    const person = req.body
    if (henkilot.filter(note => note.name === person.name).length>0){
        return res.status(400).json({ 
            error: 'Name must be unique.' 
        })
    }
    if (!person.name){
        return res.status(400).json({
            error: 'Name missing'
        })
    }
    if (!person.number){
        return res.status(400).json({
            error: 'Number missing'
        })
    }
    person.id = id
    henkilot = henkilot.concat(person)
    res.json(person)

})

app.get('/api/persons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const person = henkilot.find(person => person.id === id)
    res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
    const id = parseInt(req.params.id)
    henkilot = henkilot.filter(note => note.id !== id)
    res.status(204).end()
})

app.get('/info', (req,res) => {
    res.send(`Phonebook has info for ${henkilot.length} persons<br>${new Date().toUTCString()}`)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(new Date().toUTCString())
})

