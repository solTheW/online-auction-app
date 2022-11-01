import axios from 'axios'
import { initializeApp } from 'firebase/app'
import { getDownloadURL, getStorage, ref } from 'firebase/storage'
import { useContext, useEffect, useState } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import { ClipLoader } from 'react-spinners'
import { UserContext } from '../../state/UserContext'
import './AuctionItem.css'
const AuctionItem = ({ id, name, image, value, desc, reload }) => {
  const [counter, setCounter] = useState(value)
  const [imageUrl, setImageUrl] = useState(null)
  const { firebaseConfig, isAdmin } = useContext(UserContext)

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          alert('Auction closed')
          reload()
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
      })
      .then(() => {
        console.log('Value updated for auction', id, name, image, value, desc)
      })
      .catch((e) => alert(e))
  }

  return (
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
