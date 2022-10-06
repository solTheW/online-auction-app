import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { useContext } from 'react'
import { UserContext } from './state/UserContext'

import NavBar from './Navbar/NavBar'
import Auctions from './Auctions/Auctions'
import Chat from './Chat/Chat'
import Login from './Login/Login'
import Logout from './Logout/Logout'
import AuctionCreation from './AuctionCreation/AuctionCreation'

const App = () => {
  const { isLogedIn, isAdmin } = useContext(UserContext)
  if (!isLogedIn)
    return (
      <Router>
        <Route>
          <Redirect to="/login" />
        </Route>
        <Route path="/login" component={Login} />
      </Router>
    )
  if (!isAdmin)
    return (
      <Router>
        <NavBar />
        <Switch>
          <Route path="/auctions" component={Auctions} />
          <Route path="/chat" component={Chat} />
          <Route path="/logout" component={Logout} />
        </Switch>
      </Router>
    )
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/auctions" component={Auctions} />
        <Route path="/chat" component={Chat} />
      </Switch>
      <Route path="/createAuction" component={AuctionCreation} />
      <Route path="/logout" component={Logout} />
    </Router>
  )
}

export default App
