import { useContext, useEffect, useRef, useState } from 'react'
import Messages from '../Chat/Message/Messages'
import Loader from '../Loader/Loader'
import './Chat.css'
import UserListItem from './UserListItem/UserListItem'

import axios from 'axios'
import { UserContext } from '../state/UserContext'

const Chat = () => {
  const { isLoading, setIsLoading, userId, socket } = useContext(UserContext)
  const [users, setUsers] = useState([])
  const [messages, setMessages] = useState([])
  const [choosenUser, setChoosenUser] = useState(null)
  const [newMessage, setNewMessage] = useState('')
  const inputRef = useRef()
  const divRef = useRef()

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
  }, [])

  useEffect(()=> {
    socket.on('chat-message-got',(msg) => {
      if(msg.to == userId && msg.from == choosenUser) { 
          getMessages()
      }
    });
  }, [choosenUser])

  useEffect(() => {
    if(divRef.current && messages.length > 0)
    {
      divRef.current.scrollTop = divRef.current.scrollHeight
    }
  } ,[messages, isLoading])

  const getMessages = () => {
    axios
    .post(`/api/messages/get`, { from: userId, to: choosenUser })
    .then((res) => {
        setMessages(res.data)
      })
      .catch(() => {
        setMessages([])
      })
  }

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
          socket.emit('chat-message', {from: userId, to: choosenUser})
          getMessages()
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
        <div id="mainDiv">
            <Messages messages={messages} passedRef={divRef}/>
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
