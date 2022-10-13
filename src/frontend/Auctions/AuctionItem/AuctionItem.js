import './AuctionItem.css'
import { useState } from 'react'
const AuctionItem = ({ id, name, image, value, desc }) => {
  console.log('image: ', image)
  const [counter, setCounter] = useState(value)
  return (
    <div className="auctionDiv">
      <div className="image">
        <img src={image} alt="Item" />
      </div>
      <div className="textDiv">
        <h1 className="text">{name}</h1>
        <h1 className="text">{counter}$</h1>
        <h1
          className="textCursor"
          onClick={() => {
            console.log('Click ID:' + id + ' value: 1')
            setCounter(counter + 1)
          }}
        >
          +1
        </h1>
        <h1
          className="textCursor"
          onClick={() => {
            console.log('Click ID:' + id + ' value: 10')
            setCounter(counter + 10)
          }}
        >
          +10
        </h1>
        <h1
          className="textCursor"
          onClick={() => {
            console.log('Click ID:' + id + ' value: 100')
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
