import React from 'react'
import ReactDOM from 'react-dom'
import App from './frontend/App'
import { UserContextProvider } from './frontend/state/UserContext'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
