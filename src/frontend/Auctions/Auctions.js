import axios from 'axios'
import { useContext, useEffect, useState } from 'react'

import Loader from '../Loader/Loader'
import { UserContext } from '../state/UserContext'
import AuctionItem from './AuctionItem/AuctionItem'
import './Auctions.css'

const Auctions = () => {
  const { isLoading, setIsLoading, socket } = useContext(UserContext)
  const [auctions, setAuctions] = useState([])

  useEffect(() => {
    getAuctions()
  }, [])
  
  const getAuctions = () => {
    setIsLoading(true)
    axios
      .get('/api/auctions')
      .then((res) => {
        setAuctions(res.data)
        setIsLoading(false)
      })
      .catch((e) => {
        setAuctions([])
        setIsLoading(false)
      })
  }

  if (isLoading) {
    return <Loader />
  } else {
    const auctionsList = auctions.map((el) => {
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
