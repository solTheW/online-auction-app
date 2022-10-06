import './NavBar.css'
import { Link, useLocation } from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from '../state/UserContext'

const NavBar = () => {
  const { isAdmin } = useContext(UserContext)
  const currentRoute = useLocation()
  return (
    <div className="NavBarDiv">
      <Link
        style={
          currentRoute.pathname.includes('auctions') ? { ...styles } : undefined
        }
        className="Link"
        to="/auctions"
      >
        Auctions
      </Link>
      <br />
      <Link
        style={
          currentRoute.pathname.includes('chat') ? { ...styles } : undefined
        }
        className="Link"
        to="/chat"
      >
        Chat
      </Link>
      <br />
      {isAdmin ? (
        <Link
          style={
            currentRoute.pathname.includes('createAuction')
              ? { ...styles }
              : undefined
          }
          className="Link"
          to="/createAuction"
        >
          Create auction
        </Link>
      ) : null}
      <Link
        style={
          currentRoute.pathname.includes('logout') ? { ...styles } : undefined
        }
        className="LogOutLink"
        to="/logout"
      >
        Log out
      </Link>
    </div>
  )
}
const styles = {
  borderBottomStyle: 'solid',
  borderBottomWidth: 3,
  borderBottomColor: '#8A2BE2',
}
export default NavBar
