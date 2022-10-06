import { useContext, useState } from 'react'
import './Login.css'
import axios from 'axios'
import { UserContext } from '../state/UserContext'
import Loader from '../Loader/Loader'
import { useHistory } from 'react-router-dom'

const Login = () => {
  const {
    isLoading,
    setIsLoading,
    setIsAdmin,
    setIsLogedIn,
    isLogedIn,
  } = useContext(UserContext)
  const history = useHistory()
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post('http://localhost:8080/login', {
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
        } else {
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
        setName('')
        setPassword('')
      })
  }
  if (isLoading && !isLogedIn) return <Loader />
  return (
    <div id="loginDiv">
      <form method="post" onSubmit={handleSubmit}>
        <input
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
