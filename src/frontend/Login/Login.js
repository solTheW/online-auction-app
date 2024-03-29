import axios from 'axios'
import { useContext, useRef, useState } from 'react'
import { useHistory } from 'react-router-dom'
import io from 'socket.io-client'
import Loader from '../Loader/Loader'
import { UserContext } from '../state/UserContext'
import './Login.css'

const Login = () => {
  const {
    isLoading,
    setIsLoading,
    setIsAdmin,
    setIsLogedIn,
    isLogedIn,
    setUserId,
    setSocket,
  } = useContext(UserContext)
  const history = useHistory()
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const usernameRef = useRef(null)
  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post('/api/login', {
        username: name,
        password: password,
      })
      .then((res) => {
        setIsLoading(false)
        const { user } = res.data
        if (!user) {
          setIsLogedIn(false)
          alert(res.data.message)
          setName('')
          setPassword('')
          usernameRef.current.focus()
        } else {
          const socket = io()
          setSocket(socket)
          setUserId(user._id)
          setIsLogedIn(true)
          history.push('/auctions')
          if (user.isAdmin) {
            setIsAdmin(user.isAdmin)
          }
        }
      })
      .catch((e) => {
        setIsLogedIn(false)
        setIsLoading(false)
        alert(e)
        usernameRef.current.focus()
        setName('')
        setPassword('')
      })
  }
  if (isLoading && !isLogedIn) return <Loader />
  return (
    <div id="loginDiv">
      <form method="post" onSubmit={handleSubmit}>
        <input
          ref={usernameRef}
          className="inputBox"
          type="text"
          name="username"
          placeholder="Username"
          value={name}
          onChange={(e) => {
            setName(e.target.value)
          }}
        />
        <br />
        <input
          className="inputBox"
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
        />
        <br />
        <input id="submitBtn" type="submit" value="Log In" />
      </form>
    </div>
  )
}

export default Login
