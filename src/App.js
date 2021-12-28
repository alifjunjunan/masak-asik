import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import NavbarComponent from './components/Navbar';
import FooterComponent from './components/Footer';
import { useDispatch } from 'react-redux';
import { onKeepLogin } from './action';

const App = () => {

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    keepLogin()
  },[])

  const keepLogin = async () => {

    try {
      let res = await dispatch(onKeepLogin())

      if (res.success) {
        setLoading(false)
      } else {
        setLoading(false)
      }
    } catch (error) {
      setLoading(false)
      console.log(error)
    }

  }

  return (
    <div>
        <NavbarComponent delay={loading}/>
        <Routes>
            <Route path="/" element={<HomePage/>}/>
        </Routes>
        <FooterComponent/>
    </div>
  )
}

export default App

