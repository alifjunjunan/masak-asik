import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-confirm-alert/src/react-confirm-alert.css';
import 'react-toastify/dist/ReactToastify.css';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage';
import NavbarComponent from './components/Navbar';
import FooterComponent from './components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { getArtikelAction, getResepAction, getSubscribesAction, getUserTransaction, onKeepLogin } from './action';
import ResepManagementPage from './pages/ResepManagementPage';
import TambahResepPage from './pages/TambahResepPage';
import DetailResepManagementPage from './pages/DetailResepManagementPage';
import TambahArtikelPage from './pages/TambahArtikelPage';
import ArtikelManagementPage from './pages/ArtikelManagementPage';
import DetailArtikelManagementPage from './pages/DetailArtikelManagementPage';
import PremiumPage from './pages/PremiumPage';
import BuyPremiumPage from './pages/BuyPremiumPage';
import UserTransactionPage from './pages/UserTransactionPage';
import ManagementTransactionPage from './pages/ManagementTransactionPage';
import { getKategoriResepAction } from './action/kategoriResepAction';
import KontenResepPage from './pages/KontenResepPage';
import DetailKontenResepPage from './pages/DetailKontenResepPage';
import CariKontenPage from './pages/CariKontenPage';
import DetailKontenArtikelPage from './pages/DetailKontenArtikelPage'
import KontenArtikelPage from './pages/KontenArtikelPage';

const App = () => {

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  const {role} = useSelector((state) => {
    return {
      role : state.userReducer.role
    }
  })
  
  useEffect(() => {
    keepLogin()
    dispatch(getResepAction())
    dispatch(getArtikelAction())
    dispatch(getSubscribesAction())
    dispatch(getUserTransaction())
    dispatch(getUserTransaction())
    dispatch(getKategoriResepAction())
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
            <Route path="/premium" element={<PremiumPage/>}/>
            <Route path="/premium/detail" element={<BuyPremiumPage/>}/>
            <Route path="/resep-masakan" element={<KontenResepPage/>}/>
            <Route path="/artikel-masak" element={<KontenArtikelPage/>}/>
            <Route path='/resep' element={<DetailKontenResepPage/>}/>
            <Route path='/resep/search' element={<CariKontenPage/>}/>
            <Route path='/artikel' element={<DetailKontenArtikelPage/>} />
            
            {
              role == "admin"
              ?
              <>
              <Route path="/resep-management" element={<ResepManagementPage/>}/>
              <Route path="/resep-management/add" element={<TambahResepPage/>}/>
              <Route path="/resep-management/detail/edit" element={<DetailResepManagementPage/>}/>
              <Route path="/artikel-management" element={<ArtikelManagementPage/>}/>
              <Route path="/artikel-management/add" element={<TambahArtikelPage/>}/>
              <Route path="/artikel-management/detail/edit" element={<DetailArtikelManagementPage/>}/>
              <Route path="/transaksi-management" element={<ManagementTransactionPage/>}/>
              <Route path='/resep' element={<DetailKontenResepPage/>}/>
              <Route path='/resep/search' element={<CariKontenPage/>}/>
              <Route path='/artikel' element={<DetailKontenArtikelPage/>} />
              </>
              : 
                role == "user"
                ?
                <>
                <Route path="/transaksi" element={<UserTransactionPage/>}/>
                <Route path='/resep' element={<DetailKontenResepPage/>}/>
                <Route path='/resep/search' element={<CariKontenPage/>}/>
                <Route path='/artikel' element={<DetailKontenArtikelPage/>} />
                </>
                :
                <>
                <Route path="*" element={<HomePage/>}/>
                </>
            }
            <Route path="*" element={<HomePage/>}/>
        </Routes>
        <FooterComponent />
    </div>
  )
}

export default App

