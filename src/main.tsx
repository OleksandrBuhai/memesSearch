

import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './slices/store.ts'
import { BrowserRouter } from 'react-router-dom'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter >
    <Provider store={store}>
    <App />
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
