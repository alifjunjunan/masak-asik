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
import { getResepAction, onKeepLogin } from './action';
import ResepManagementPage from './pages/ResepManagementPage';
import TambahResepPage from './pages/TambahResepPage';

const App = () => {

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    keepLogin()
    dispatch(getResepAction())
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
            <Route path="/resep-management" element={<ResepManagementPage/>}/>
            <Route path="/resep-management/add" element={<TambahResepPage/>}/>
        </Routes>
        <FooterComponent/>
    </div>
  )
}

export default App

