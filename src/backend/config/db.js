const { MongoClient } = require('mongodb')
const url =
  'mongodb+srv://admin:admin@cluster0.puoic.mongodb.net/bachelor-thesis?retryWrites=true&w=majority'
const client = new MongoClient(url, { useUnifiedTopology: true })
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
    if (el.inProgress) {
      auctions.push({
        id: el._id,
        name: el.name,
        value: el.value,
        desc: el.desc,
        image: el.image,
        inProgress: el.inProgress,
      })
    }
  })
  return auctions
}

const uploadAuction = async (auction) => {
  const db = client.db(dbName)
  const Auctions = db.collection('Auctions')
  await Auctions.insertOne(auction)
    .then((res) => res)
    .catch((e) => e)
}

const updateAuctionImage = async (auction) => {
  const db = client.db(dbName)
  const Auctions = db.collection('Auctions')
  await Auctions.updateOne(
    { image: auction.image },
    {
      $set: { inProgress: false },
      $currentDate: { lastModified: true },
    },
  )
    .then((res) => res)
    .catch((e) => e)
}

const updateAuctionPrize = async (auction) => {
  const db = client.db(dbName)
  const Auctions = db.collection('Auctions')
  await Auctions.updateOne(
    { image: auction.image },
    {
      $set: { value: Number.parseInt(auction.value) },
      $currentDate: { lastModified: true },
    },
  )
    .then((res) => res)
    .catch((e) => e)
}

const getUsers = async () => {
  const db = client.db(dbName)
  const Auctions = db.collection('Users')
  const response = await Auctions.find({}, { username: 1 })
  const users = []
  await response.forEach((el) => {
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
  uploadAuction,
  updateAuctionImage,
  updateAuctionPrize,
}
