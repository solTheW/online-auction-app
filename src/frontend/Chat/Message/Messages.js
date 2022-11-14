const Messages = ({ messages }) => {
  if (!messages || messages.length === 0) return <div></div>
  return messages.map((m) => <div key={m._id}>{m.message}</div>)
}
export default Messages
