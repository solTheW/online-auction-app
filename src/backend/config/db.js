const { MongoClient } = require('mongodb')
const url =
  'mongodb+srv://admin:admin@cluster0.puoic.mongodb.net/bachelor-thesis?retryWrites=true&w=majority'
const client = new MongoClient(url)
const dbName = 'bachelor-thesis'

const connect = async () => {
  try {
    await client.connect()
    console.log('MongoDB is Connected... ')
  } catch (err) {
    console.log(err.message)
    process.exit(1)
  }
}

const findUser = async (user) => {
  const db = client.db(dbName)
  const Users = db.collection('Users')
  const response = await Users.findOne({ username: user.username })
  return response
}

const getAuctions = async () => {
  const db = client.db(dbName)
  const Auctions = db.collection('Auctions')
  const response = await Auctions.find()
  const auctions = []
  await response.forEach((el) => {
    auctions.push({
      id: el._id,
      name: el.name,
      value: el.value,
      desc: el.desc,
      image: el.image,
    })
  })
  return auctions
}

const getUsers = async () => {
  const db = client.db(dbName)
  const Auctions = db.collection('Users')
  const response = await Auctions.find({}, { username: 1 })
  const users = []
  await response.forEach((el) => {
    console.log('el: ', el)
    users.push({
      username: el.username,
    })
  })
  return users
}

module.exports = {
  connect,
  findUser,
  getAuctions,
  getUsers,
}
