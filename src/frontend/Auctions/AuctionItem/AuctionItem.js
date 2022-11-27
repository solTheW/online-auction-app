import axios from 'axios'
import { initializeApp } from 'firebase/app'
import { getDownloadURL, getStorage, ref } from 'firebase/storage'
import { useContext, useEffect, useState } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import { ClipLoader } from 'react-spinners'
import { UserContext } from '../../state/UserContext'
import './AuctionItem.css'
const AuctionItem = ({ id, name, image, value, desc }) => {
  const [counter, setCounter] = useState(value)
  const [imageUrl, setImageUrl] = useState(null)
  const [closed, setClosed] = useState(false)
  const { firebaseConfig, isAdmin, socket, userId } = useContext(UserContext)

  useEffect(() => {
    const app = initializeApp(firebaseConfig)
    const storage = getStorage(app)

    const storageReference = ref(storage, image)
    getDownloadURL(storageReference)
      .then((r) => {
        setImageUrl(r)
      })
      .catch((e) => {
        console.error(e)
        setImageUrl('')
      })
      socket.on('auction-biting', (msg) => {
        if(id === msg.id) {
          setCounter(msg.newValue)
        }
      })
      socket.on('auction-closing', (msg) => {
        if(id === msg.id) {
          setClosed(true)
        }
      })
  }, [])

  const handleCloseAuction = () => {
    // eslint-disable-next-line no-restricted-globals
    const confirmedDeletion = confirm(
      `Do you want to really close auction for:\nName: ${name} Value: ${value}\nDescription: ${desc}`,
    )
    if (confirmedDeletion) {
      axios
        .put('/api/auction/update', {
          _id: id,
          name: name,
          image: image,
          value: value,
          desc: desc,
          inProgress: false,
        })
        .then(() => {
          socket.emit('auction-close', {id: id})
          setClosed(true)
        })
        .catch((e) => alert(e))
    }
  }

  const handleBoostPrice = (price) => {
    const newValue = counter + price
    setCounter(newValue)
    axios
      .put('/api/auction/updatePrize', {
        image: image,
        value: newValue,
        lastBit: userId,
      })
      .then(() => {
        socket.emit('auction-bit', {id: id, newValue: newValue})
        console.log('Value updated for auction', id, name, image, newValue, desc)
      })
      .catch((e) => alert(e))
  }

  return (
    !closed &&
    <div className="auctionDiv">
      {isAdmin && (
        <AiFillCloseCircle
          className="closeButton"
          color="red"
          size={30}
          onClick={handleCloseAuction}
        />
      )}
      <div className="image">
        {imageUrl === null ? <ClipLoader /> : <img src={imageUrl} alt="Item" />}
      </div>
      <div className="textDiv">
        <h1 className="text">{name}</h1>
        <h1 className="text">{counter}$</h1>
        <h1 className="textCursor" onClick={() => handleBoostPrice(1)}>
          +1
        </h1>
        <h1 className="textCursor" onClick={() => handleBoostPrice(10)}>
          +10
        </h1>
        <h1 className="textCursor" onClick={() => handleBoostPrice(100)}>
          +100
        </h1>
        <b>{desc}</b>
      </div>
    </div>
  )
}
export default AuctionItem
