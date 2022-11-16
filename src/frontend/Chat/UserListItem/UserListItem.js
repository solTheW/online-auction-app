import axios from 'axios'
import { useContext } from 'react'
import { UserContext } from '../../state/UserContext'
import './UserListItem.css'
const UserListItem = ({ id, username, setMessages, onClick, isActive }) => {
  const { userId } = useContext(UserContext)
  const handleClick = () => {
    onClick(id)
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
    <div
      id="userItem"
      onClick={handleClick}
      style={{
        borderColor: isActive ? '#8a2be2' : '',
        backgroundColor: isActive ? '	#f5f5f5' : '',
      }}
    >
      {username}
    </div>
  )
}
export default UserListItem
