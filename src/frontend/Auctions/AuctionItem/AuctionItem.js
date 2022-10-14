import { initializeApp } from 'firebase/app'
import { getDownloadURL, getStorage, ref } from 'firebase/storage'
import { useContext, useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'
import { UserContext } from '../../state/UserContext'
import './AuctionItem.css'
const AuctionItem = ({ id, name, image, value, desc }) => {
  const [counter, setCounter] = useState(value)
  const [imageUrl, setImageUrl] = useState(null)
  const { firebaseConfig } = useContext(UserContext)

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

  return (
    <div className="auctionDiv">
      <div className="image">
        {imageUrl === null ? <ClipLoader /> : <img src={imageUrl} alt="Item" />}
      </div>
      <div className="textDiv">
        <h1 className="text">{name}</h1>
        <h1 className="text">{counter}$</h1>
        <h1
          className="textCursor"
          onClick={() => {
            setCounter(counter + 1)
          }}
        >
          +1
        </h1>
        <h1
          className="textCursor"
          onClick={() => {
            setCounter(counter + 10)
          }}
        >
          +10
        </h1>
        <h1
          className="textCursor"
          onClick={() => {
            setCounter(counter + 100)
          }}
        >
          +100
        </h1>
        <b>{desc}</b>
      </div>
    </div>
  )
}
export default AuctionItem
