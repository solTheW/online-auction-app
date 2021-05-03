import "./NavBar.css";
import {Link} from "react-router-dom";
const typeOfUser = "admin";
const linkStyle= {
    color: "inherit",
    textDecoration: "none",
    marginLeft: "5%",
    marginRight: "5%",
    marginTop: "7px",
    marginBottom: "7.5px",
    display: "inline",
    visited: {
        textDecoration: "none"
    },
}


const NavBar = () => {
    return (
        <div className="NavBarDiv">
            <Link style={linkStyle} to="/auctions">Auctions</Link><br/>
            <Link style={linkStyle} to="/chat">Chat</Link><br/>
            {
            typeOfUser==="admin"?
                <Link style={linkStyle} to="/createAuction">Create auction</Link>
                :null
            }
            <Link className="LogOutLink" to="/logout">Log out</Link>
        </div>
    )
}
export default NavBar; 