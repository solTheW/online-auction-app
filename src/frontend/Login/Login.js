import "./Login.css";
import {useState} from "react";
const Login = () => {
    const [name,setName] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (e) =>{
        e.preventDefault();
    }
    return (
        <div id="loginDiv">
            <form method="post" onSubmit={handleSubmit}>
                <input className="inputBox" type="text" name="username" placeholder="Username" value={name} onChange={e=>{setName(e.target.value)}}/><br/>
                <input className="inputBox" type="password" name="password" placeholder="Password" value={password} onChange={e=>{setPassword(e.target.value)}}/><br/>
                <input id="submitBtn" type="submit" value="Log In" />
            </form>
        </div>
    )
}
export default Login;