import "./UserListItem.css";
const UserListItem = ({id,username}) => {
    const handleClick = e => {
        e.preventDefault();
        console.log("ID: "+id+" Username: "+username);
    }
    return (
        <div id="userItem" onClick={handleClick}>
            {username}
        </div>
    )
}
export default UserListItem;