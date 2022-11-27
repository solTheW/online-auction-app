const { MongoClient } = require('mongodb')
const dbName = 'bachelor-thesis'
const url = `mongodb+srv://admin:admin@cluster0.puoic.mongodb.net/${dbName}?retryWrites=true&w=majority&useNewUrlParser=true&useUnifiedTopology=true`;
const client = new MongoClient(url)

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
      $set: { value: Number.parseInt(auction.value), lastBit: auction.lastBit },
      $currentDate: { lastModified: true },
    },
  )
    .then((res) => res)
    .catch((e) => e)
}

const getUsers = async (userId) => {
  const db = client.db(dbName)
  const Users = db.collection('Users')
  const response = await Users.find({}, { username: 1, _id: 1 })
  const users = []
  await response.forEach((el) => {
    users.push({
      username: el.username,
      id: el._id,
    })
  })
  return users.filter(
    (user) => String(user.id).toString() !== String(userId.userId).toString(),
  )
}

const getMessages = async (req) => {
  const db = client.db(dbName)
  const Messages = db.collection('Messages')
  const response = await Messages.find({})
  const messages = []
  await response.forEach((el) => {
    if((el.from === req.from && el.to === req.to) || (el.to === req.from && el.from === req.to)) {
      messages.push(el)
    }
  })
  return messages
}

const uploadMessage = async (message) => {
  const db = client.db(dbName)
  const Messages = db.collection('Messages')
  await Messages.insertOne(message)
    .then((res) => res)
    .catch((e) => e)
}

module.exports = {
  connect,
  findUser,
  getUsers,
  getMessages,
  getAuctions,
  uploadAuction,
  updateAuctionImage,
  updateAuctionPrize,
  uploadMessage,
}
