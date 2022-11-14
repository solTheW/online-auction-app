import { useContext, useEffect, useState } from 'react'
import Messages from '../Chat/Message/Messages'
import Loader from '../Loader/Loader'
import './Chat.css'
import UserListItem from './UserListItem/UserListItem'

import axios from 'axios'
import { UserContext } from '../state/UserContext'

const Chat = () => {
  const { isLoading, setIsLoading, userId } = useContext(UserContext)
  const [users, setUsers] = useState([])
  const [messages, setMessages] = useState([])

  useEffect(() => {
    setIsLoading(true)
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
      <UserListItem
        key={el.id}
        id={el.id}
        username={el.username}
        setMessages={setMessages}
      />
    ))
    return (
      <div id="chatDiv">
        <div id="userListDiv">{userList}</div>
        <div id="messegesDiv">
          <Messages messages={messages} />
        </div>
      </div>
    )
  }
}
export default Chat
