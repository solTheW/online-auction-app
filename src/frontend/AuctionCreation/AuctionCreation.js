import axios from 'axios'
import { initializeApp } from 'firebase/app'
import { getStorage, ref, uploadBytes } from 'firebase/storage'
import { useContext, useRef, useState } from 'react'
import { UserContext } from '../state/UserContext'
import './AuctionCreation.css'

const AuctionCreation = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [photo, setPhoto] = useState(undefined)
  const { firebaseConfig } = useContext(UserContext)

  const photoRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name.length === 0) alert('Add name')
    else if (price.length === 0) alert('Add price')
    else if (description.length === 0) alert('Add description')
    else if (photo === undefined) alert('Add photo')
    else {
      try {
        // UPLOADING FILE TO FIREBASE
        const app = initializeApp(firebaseConfig)
        const storage = getStorage(app)
        const currentTimeStamp = `${photo.name}-${new Date().getTime()}`
        const storageReference = ref(storage, currentTimeStamp)
        uploadBytes(storageReference, photo).catch((e) => new Error(e))
        //

        const auction = {
          name: name,
          image: currentTimeStamp,
          value: Number.parseInt(price),
          desc: description,
          inProgress: true,
        }
        axios.put('/api/auction', auction).catch((e) => new Error(e))
        alert('Data uploaded')
        photoRef.current.value = null
        setName('')
        setPrice('')
        setDescription('')
      } catch (e) {
        console.error(e)
        photoRef.current.value = null
        setName('')
        setPrice('')
        setDescription('')
        alert('Error occured')
      }
    }
  }
  const handleChangeName = (e) => {
    e.preventDefault()
    setName(e.target.value)
  }
  const handleChangePrice = (e) => {
    e.preventDefault()
    setPrice(e.target.value)
  }
  const handleChangeDescription = (e) => {
    e.preventDefault()
    setDescription(e.target.value)
  }
  const handleChangePhoto = (e) => {
    e.preventDefault()
    setPhoto(e.target.files[0])
  }

  return (
    <div id="creationMainDiv">
      <form method="get" onSubmit={handleSubmit}>
        <div className="inputBoxDiv">
          Item
          <br />
          <input
            className="inputBoxCreationItem"
            type="text"
            placeholder="Item name"
            value={name}
            onChange={handleChangeName}
          />
        </div>
        <hr />
        <div className="inputBoxDiv">
          Price
          <br />
          <input
            className="inputBoxCreationPrice"
            type="number"
            placeholder="Item basic price"
            value={price}
            onChange={handleChangePrice}
          />
        </div>
        <hr />
        <div className="inputBoxDiv">
          Description
          <br />
          <input
            className="inputBoxCreationDesc"
            type="text"
            placeholder="Description"
            value={description}
            onChange={handleChangeDescription}
          />
        </div>
        <hr />

        <div className="inputBoxDiv">
          Photo
          <br />
          <input
            ref={photoRef}
            id="photoSelect"
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleChangePhoto}
          />
        </div>
        <hr />

        <div className="createDiv">
          <input type="submit" id="createBtn" value="Create" />
        </div>
      </form>
    </div>
  )
}
export default AuctionCreation
