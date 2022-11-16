import { useContext } from 'react'
import { UserContext } from '../../state/UserContext'
import './Messages.css'

const Messages = ({ messages }) => {
  const { userId } = useContext(UserContext)
  if (!messages || messages.length === 0) return <div></div>
  return messages.map((m) => (
    <div id="messageDiv" key={m._id}>
      <div style={{ flex: 1 }}>{m.message}</div>
    </div>
  ))
}
export default Messages
