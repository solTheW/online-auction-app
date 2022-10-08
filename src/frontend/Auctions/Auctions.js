import { useContext, useEffect, useState } from 'react'
import axios from 'axios'

import AuctionItem from './AuctionItem/AuctionItem'
import './Auctions.css'
import { UserContext } from '../state/UserContext'
import Loader from '../Loader/Loader'

const Auctions = () => {
  const { isLoading, setIsLoading, url } = useContext(UserContext)
  const [auctions, setAuctions] = useState([])

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
        />
      )
    })
    return <div id="auctionsListDiv">{auctionsList}</div>
  }
}

export default Auctions
