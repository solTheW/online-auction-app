import { createContext, useState } from 'react'
const UserContext = createContext()

const UserContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLogedIn, setIsLogedIn] = useState(false)
  const [userId, setUserId] = useState(null)
  const [socket, setSocket] = useState(null)

  const firebaseConfig = {
    apiKey: 'AIzaSyAJJCpqlEjNVWhPVK7Mb_ZBA5ZhhiyAaA4',
    authDomain: 'bachelor-thesis-78549.firebaseapp.com',
    projectId: 'bachelor-thesis-78549',
    storageBucket: 'bachelor-thesis-78549.appspot.com',
    messagingSenderId: '723692337889',
    appId: '1:723692337889:web:e4bc3725f2ff61fddfd5a0',
  }

  return (
    <UserContext.Provider
      value={{
        isLoading,
        setIsLoading,
        isAdmin,
        setIsAdmin,
        isLogedIn,
        setIsLogedIn,
        firebaseConfig,
        userId,
        setUserId,
        socket,
        setSocket,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserContextProvider }
