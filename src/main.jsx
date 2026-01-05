import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux' // 1. Import Provider
import { store } from './redux/store'  // 2. Import your store
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* 3. Wrap App with Provider and pass the store */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
)