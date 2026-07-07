import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import Notes from './pages/Notes'
import Navbar from './components/Navbar'
import About from './pages/About'
import Contact from './pages/Contact'
import CreateNote from './components/CreateNote'
import Login from './pages/Login'
import Footer from "./components/Footer";
import Signup from './pages/Signup'
import ErrorPage from './pages/ErrorPage'
import { Route, Routes } from 'react-router-dom'
import ProtectAuth from './components/ProtectAuth.jsx'
import { useAuthState } from './Contextapi/Authstate.jsx'

function App() {
  const { getProfileFunc, checker } = useAuthState();

  useEffect(() => {
    getProfileFunc();
  }, []);

  if (checker) {
    return <Loader />;
  }

  return (
    <>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path="/notes" element={<Notes category="public" />} />
        <Route path="/yournotes" element={<Notes category="private" />} />
        <Route path='/notes' element={<Notes/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/contact' element={<Contact/>} />
         <Route
          path="/createnote"
          element={
            <ProtectAuth>
              <CreateNote />
            </ProtectAuth>
          }
        />
        <Route path='/createnote' element={<CreateNote/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='*' element={<ErrorPage/>} />
      </Routes>
      <Footer/>
    </>
  )
}

export default App
