import { createContext, useState } from 'react'
const UserContext = createContext()

const UserContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLogedIn, setIsLogedIn] = useState(false)

  return (
    <UserContext.Provider
      value={{
        isLoading,
        setIsLoading,
        isAdmin,
        setIsAdmin,
        isLogedIn,
        setIsLogedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserContextProvider }
