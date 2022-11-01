const db = require('./config/db')
const path = require('path')
const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 8080

db.connect()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'))
}

app.post('/api/login', (req, res) => {
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

app.get('/api/auctions', (req, res) => {
  db.getAuctions()
    .then((auctions) => res.send(auctions))
    .catch(() => res.send([]))
})

app.get('/api/users/', (req, res) => {
  db.getUsers()
    .then((users) => res.send(users))
    .catch(() => res.send([]))
})

app.put('/api/auction', (req, res) => {
  db.uploadAuction(req.body)
    .then((res) => res.send(res))
    .catch((e) => res.send(e))
})

app.put('/api/auction/update', (req, res) => {
  db.updateAuctionImage(req.body)
    .then((res) => res.send(res))
    .catch((e) => res.send(e))
})

app.put('/api/auction/updatePrize', (req, res) => {
  db.updateAuctionPrize(req.body)
    .then((res) => res.send(res))
    .catch((e) => res.send(e))
})

app.listen(port, () => {
  console.log('Listening on port: ' + port)
})
