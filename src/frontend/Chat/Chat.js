import "./Chat.css";
import Message from "./Message/Message";
import UserListItem from "./UserListItem/UserListItem";
const Chat = () => {
    const usersArray = [
        {
            id: 1,
            username: "Ala",
        },
        {
            id: 2,
            username: "Adam",
        },
        {
            id: 3,
            username: "Andrzej",
        },
        {
            id: 4,
            username: "Wiktoria"
        },
        {
            id: 5,
            username: "Mateusz"
        }
    ];
    const messages = [
        {
            id: 1,
            idSender: 1,
            idRecipient:2,
            text: "Hello"
        }
    ]
    const userList = usersArray.map(el=> <UserListItem key={el.id} id={el.id} username={el.username}/>)
    return (
        <div id="chatDiv">
            <div id="userListDiv"> 
                {userList}
            </div>
            <div id="messegesDiv">
                <Message text={messages[0]}/>
            </div>
        </div>
    )
}
export default Chat;