import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from "react-redux";
import { Toaster } from 'react-hot-toast'
import { store } from './redux/store.js';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
    {
      screen.width < 640 ? (
        <Toaster position='top-right'/>
      ): (
        <Toaster position='top-center' />
      )
    }
  </Provider>,
)
