import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthState from './Contextapi/Authstate.jsx'
import { ToastContainer } from 'react-toastify'
import Profile from './components/Profile.jsx'
import NoteState from './Contextapi/NoteState.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    { <BrowserRouter>
      <AuthState>
        <NoteState>
          <App />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          theme="colored"
        />
        </NoteState>
      </AuthState>
    </BrowserRouter> }
    {/* <Profile/> */}
  </StrictMode>
)
