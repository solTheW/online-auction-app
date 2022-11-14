import axios from 'axios'
import { useContext } from 'react'
import { UserContext } from '../../state/UserContext'
import './UserListItem.css'
const UserListItem = ({ id, username, setMessages }) => {
  const { userId } = useContext(UserContext)
  const handleClick = (e) => {
    e.preventDefault()
    axios
      .post(`/api/messages/get`, { from: userId, to: id })
      .then((res) => {
        setMessages(res.data)
      })
      .catch(() => {
        setMessages([])
      })
  }
  return (
    <div id="userItem" onClick={handleClick}>
      {username}
    </div>
  )
}
export default UserListItem
