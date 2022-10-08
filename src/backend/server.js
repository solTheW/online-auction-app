const db = require('./config/db')
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 8080

db.connect()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

app.post('/login', (req, res) => {
  const { username, password } = req.body
  db.findUser({ username, password })
    .then((user) => {
      if (user.password === password) {
        res.send({ user: user })
      } else {
        res.send({ message: 'Wrong Password!!!' })
      }
    })
    .catch(() => res.send({ message: 'Not registered!!!' }))
})

app.get('/auctions/', (req, res) => {
  db.getAuctions()
    .then((auctions) => res.send(auctions))
    .catch(() => res.send([]))
})
app.get('/users/', (req, res) => {
  db.getUsers()
    .then((users) => res.send(users))
    .catch(() => res.send([]))
})

app.listen(port, () => {
  console.log('Listening on port: ' + port)
})