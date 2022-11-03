import { useContext, useEffect, useState } from 'react'
import Loader from '../Loader/Loader'
import './Chat.css'
import UserListItem from './UserListItem/UserListItem'

import axios from 'axios'
import io from 'socket.io-client'
import { UserContext } from '../state/UserContext'

const Chat = () => {
  const { isLoading, setIsLoading, userId } = useContext(UserContext)
  const [users, setUsers] = useState([])

  useEffect(() => {
    setIsLoading(true)
    const socket = io('http://localhost:8081')
    socket.emit('join')
    axios
      .post(`/api/users/`, { userId })
      .then((res) => {
        setIsLoading(false)
        setUsers(res.data)
      })
      .catch((e) => {
        setIsLoading(false)
        setUsers([])
      })
    return () => {
      setUsers([])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (isLoading) {
    return <Loader />
  } else {
    const userList = users.map((el) => (
      <UserListItem key={el.id} id={el.id} username={el.username} />
    ))
    return (
      <div id="chatDiv">
        <div id="userListDiv">{userList}</div>
        <div id="messegesDiv"></div>
      </div>
    )
  }
}
export default Chat
