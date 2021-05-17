import NavBar from "./Navbar/NavBar";
import Auctions from "./Auctions/Auctions";
import Chat from "./Chat/Chat";
import Login from "./Login/Login";
import AuctionCreation from "./AuctionCreation/AuctionCreation";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import {useState, useEffect} from "react";
import RingLoader from "react-spinners/RingLoader";
function App() {
  const [loading, setLoading] = useState(true);
  useEffect(()=> {
    setLoading(true);
    setTimeout(()=>{
      setLoading(false)
    },8000)
  },[])

  return (
    loading?
      <div style={{display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20vh"}}>
        <RingLoader color={'#8A2BE2'} loading={loading} size={600}/>
      </div>:
    <div style={{marginBottom:"5%"}}>
      <Router >
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
            <Route path="/login" component={Login}/>
            <Route path="/auctions" component={Auctions} />
            <Route path="/chat" component={Chat} />
            <Route path="/createAuction" component={AuctionCreation} />
        </Switch>
      </Router>

    </div>
  );
}

export default App;
