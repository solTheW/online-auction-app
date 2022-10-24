import { useContext, useEffect, useState } from 'react'
import Loader from '../Loader/Loader'
import './Chat.css'
import UserListItem from './UserListItem/UserListItem'

import axios from 'axios'
import { UserContext } from '../state/UserContext'

const usersArray = [
  {
    id: 1,
    username: 'Ala',
  },
  {
    id: 2,
    username: 'Adam',
  },
  {
    id: 3,
    username: 'Andrzej',
  },
  {
    id: 4,
    username: 'Wiktoria',
  },
  {
    id: 5,
    username: 'Mateusz',
  },
]
const messages = [
  {
    id: 1,
    idSender: 1,
    idRecipient: 2,
    text: 'Hello',
  },
]

const Chat = () => {
  const { isLoading, setIsLoading } = useContext(UserContext)
  const [users, setUsers] = useState([])

  useEffect(() => {
    setIsLoading(true)
    axios
      .get(`users/`)
      .then((res) => {
        setIsLoading(false)
        setUsers(res)
      })
      .catch((e) => {
        setIsLoading(false)
        setUsers([])
      })
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
