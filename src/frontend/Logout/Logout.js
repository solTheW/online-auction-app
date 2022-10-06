import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../state/UserContext'

const Logout = () => {
  const { setIsLogedIn, setIsLoading, setIsAdmin } = useContext(UserContext)
  const history = useHistory()
  const handleClick = () => {
    setIsLogedIn(false)
    setIsLoading(false)
    history.push('/login')
  }
  return (
    <div id="loginDiv" style={{ paddingLeft: 20, paddingRight: 20 }}>
      <h1>Are you sure ?</h1>
      <button id="submitBtn" onClick={handleClick}>
        Log Out
      </button>
    </div>
  )
}
export default Logout
