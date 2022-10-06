import { useContext } from 'react'
import { RingLoader } from 'react-spinners'
import { UserContext } from '../state/UserContext'
import './Loader.css'

const Loader = () => {
  const { isLoading } = useContext(UserContext)
  return (
    <div className="divLoader">
      <RingLoader color={'#8A2BE2'} loading={isLoading} size={600} />
    </div>
  )
}
export default Loader
