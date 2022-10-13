import { useContext, useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { getStorage, ref, getDownloadURL, getBlob } from 'firebase/storage'
import axios from 'axios'

import AuctionItem from './AuctionItem/AuctionItem'
import './Auctions.css'
import { UserContext } from '../state/UserContext'
import Loader from '../Loader/Loader'

const Auctions = () => {
  const { isLoading, setIsLoading, url } = useContext(UserContext)
  const [auctions, setAuctions] = useState([])
  const [auctionsWithImage, setAuctionsWithImage] = useState([])

  useEffect(() => {
    setIsLoading(true)
    axios
      .get(`${url}/auctions/`)
      .then((res) => {
        setAuctions(res.data)
        setIsLoading(false)
      })
      .catch((e) => {
        setAuctions([])
        setIsLoading(false)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    const firebaseConfig = {
      apiKey: 'AIzaSyAJJCpqlEjNVWhPVK7Mb_ZBA5ZhhiyAaA4',
      authDomain: 'bachelor-thesis-78549.firebaseapp.com',
      projectId: 'bachelor-thesis-78549',
      storageBucket: 'bachelor-thesis-78549.appspot.com',
      messagingSenderId: '723692337889',
      appId: '1:723692337889:web:e4bc3725f2ff61fddfd5a0',
    }

    const app = initializeApp(firebaseConfig)
    const storage = getStorage(app)
    const parsedAuctions = []

    auctions.forEach((auction) => {
      const storageReference = ref(storage, auction.image)
      let newAuction = { ...auction }
      const getUrl = async () => {
        return await getDownloadURL(storageReference)
          .then((r) => r)
          .catch((e) => {
            console.error(e)
            return ''
          })
      }
      parsedAuctions.push(newAuction)
    })

    setAuctionsWithImage(parsedAuctions)
    console.log('parsedAuctions: ', parsedAuctions)
  }, [auctions])

  if (isLoading) {
    return <Loader />
  } else {
    const auctionsList = auctionsWithImage.map((el) => {
      return (
        <AuctionItem
          key={el.id}
          id={el.id}
          name={el.name}
          value={el.value}
          desc={el.desc}
          image={el.image}
        />
      )
    })
    return <div id="auctionsListDiv">{auctionsList}</div>
  }
}

export default Auctions
