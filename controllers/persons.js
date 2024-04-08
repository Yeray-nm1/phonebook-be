const personsRouter = require('express').Router()
const Person = require('../models/person')

personsRouter.get('/', (req, res) => {
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

personsRouter.get('/:id', (req, res, next) => {
  Person.findById(req.params.id)
  .then(person => {
    if (person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  }).catch(error => next(error))
})

personsRouter.post('/', (req, res, next) => {
  const body = req.body

  const person = new Person({
    name: body.name,
    number: body.number
  })

  person.save().then(savedPerson => {
    res.json(savedPerson)
  }).catch(error => next(error))
})

personsRouter.put('/:id', (req, res, next) => {
  const { name, number } = req.body

  Person.findByIdAndUpdate(req.params.id, { name, number }, { new: true, runValidators: true, context: 'query' })
  .then(updatedPerson => {
    res.json(updatedPerson)
  })
  .catch(error => next(error))
})

personsRouter.delete('/:id', (req, res) => {
  Person.findByIdAndDelete(req.params.id)
  .then(result => {
    res.status(204).end()
  })
  .catch(error => next(error))
})

personsRouter.get('/info', (req, res) => {
  const date = new Date()
  const persons = Person.length
  res.send(`<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`)
})

module.exports = personsRouter