import { useContext } from 'react'
import { UserContext } from '../../state/UserContext'
import './Messages.css'

const Messages = ({ messages, passedRef }) => {
  const { userId } = useContext(UserContext)
  if (!messages || messages.length === 0) return <div></div>
  const list = messages.map((m) => {
    const stylesRight = { marginRight: '10px' }
    const stylesLeft = { marginLeft: '-30px' }
    return (
    <li id="message" style={m.from  ===  userId ? stylesRight : stylesLeft}  key={m._id}>
      {m.message}
    </li>
    )
})
  return <ul ref={passedRef} id="messageList">{list}</ul>
}
export default Messages
