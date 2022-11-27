import axios from 'axios'
import { useContext } from 'react'
import { UserContext } from '../../state/UserContext'
import './UserListItem.css'
const UserListItem = ({ id, username, setMessages, onClick, isActive }) => {
  const { userId, setIsLoading, isLoading } = useContext(UserContext)
  const handleClick = () => {
    setIsLoading(true);
    onClick(id)
    axios
      .post(`/api/messages/get`, { from: userId, to: id })
      .then((res) => {
        setMessages(res.data)
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
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
