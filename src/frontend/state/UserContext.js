import { createContext, useState } from 'react'
const UserContext = createContext()

const UserContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [isLogedIn, setIsLogedIn] = useState(false)
  const port = process.env.PORT || 8080
  const url = process.env.baseUrl || `http://localhost:${port}`

  return (
    <UserContext.Provider
      value={{
        isLoading,
        setIsLoading,
        isAdmin,
        setIsAdmin,
        isLogedIn,
        setIsLogedIn,
        url,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserContextProvider }
