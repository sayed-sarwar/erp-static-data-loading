import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { store } from './app/store'
import { Provider } from 'react-redux'
import Layout from "./page/layout.tsx";
createRoot(document.getElementById('root')!).render(
  <StrictMode>
     <Provider store={store}>
      <Layout>
        <App />
      </Layout>
    </Provider>
  </StrictMode>,
)
