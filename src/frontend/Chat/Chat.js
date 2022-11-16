import { useContext, useEffect, useRef, useState } from 'react'
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
  const [choosenUser, setChoosenUser] = useState(null)
  const [newMessage, setNewMessage] = useState('')
  const inputRef = useRef()

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

  const sendMessage = (e) => {
    e.preventDefault()
    if (choosenUser) {
      const message = {
        message: newMessage,
        from: userId,
        to: choosenUser,
      }
      axios
        .put('/api/messages/put', message)
        .then(() => {
          axios
            .post(`/api/messages/get`, { from: userId, to: choosenUser })
            .then((res) => {
              setMessages(res.data)
            })
            .catch(() => {
              setMessages([])
            })
          inputRef.current.value = null
        })
        .catch((e) => console.error(e))
    }
  }

  if (isLoading) {
    return <Loader />
  } else {
    const userList = users.map((el) => (
      <UserListItem
        key={el.id}
        id={el.id}
        username={el.username}
        setMessages={setMessages}
        onClick={setChoosenUser}
        isActive={choosenUser === el.id}
      />
    ))
    return (
      <div id="chatDiv">
        <div id="userListDiv">{userList}</div>
        <div id="messegesDiv">
          <Messages messages={messages} />
          <input
            onChange={(e) => setNewMessage(e.target.value)}
            ref={inputRef}
            id="inputMessage"
            placeholder="Message"
          ></input>
          <button id="sendButton" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    )
  }
}
export default Chat
