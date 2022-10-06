import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './frontend/App'
import { UserContextProvider } from './frontend/state/UserContext'

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <App />
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById('root'),
)
