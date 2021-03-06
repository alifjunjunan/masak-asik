import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Link, Navigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import { Nav, NavItem, NavLink, Modal, ModalHeader, ModalBody, Form, Input, FormGroup, Button, Label, Spinner, Badge } from 'reactstrap'
import { getKategoriArtikelAction, getKategoriResepAction, getResepAction, onLogin, onLogout, onRegist } from '../action'

const NavbarComponent = (props) => {

    const [ModalOpenMasuk,setModalOpenMasuk] = useState(false)
    const [modalInput, setModalInput] = useState("masuk")
    const [inputRegist, setInputRegist] = useState({email: "", username: "", password: ""})
    const [inputLogin, setInputLogin] = useState({email: "", password: ""})
    const [konfirPass, setKonfirPass] = useState("")
    const [valueKategori, setValueKategori] = useState("")

    const dispatch = useDispatch()

    const {iduser, username, role, kategoriResep,kategoriArtikel, subs} = useSelector((state) => {

        return {
            iduser: state.userReducer.id,
            username: state.userReducer.username,
            role: state.userReducer.role,
            subs: state.userReducer.subscribe,
            kategoriResep: state.kategoriResepReducer.listKategoriResep,
            kategoriArtikel: state.kategoriArtikelReducer.listKategoriArtikel
        }
    })

    

    useEffect(() => {
        dispatch(getKategoriResepAction())
        dispatch(getKategoriArtikelAction())
    },[])

    const onBtRegist = async () => {

        let data = {
            ...inputRegist,
            role: "user",
            status: "active",
            transaction: [],
            subscribe: [],
            favorit: []
        }

        if (inputRegist.email == "" || inputRegist.password == "" || konfirPass == "" ) {
            toast.error("Isi Semua Data")
        } else {
            if (inputRegist.password == konfirPass) {
    
                if(inputRegist.email.includes('@') && inputRegist.email.includes('.')) {
                    
                    let res = await dispatch(onRegist(data))
        
                    if (res.success) {
        
                        toast.success('SUCCESS! Akun Berhasil Di Buat', {
                            position: "top-right",
                            autoClose: 5000
                            });
                        
                        setModalOpenMasuk(false)
    
                        setTimeout(() => {
                            setModalInput("masuk")
                            setInputRegist({email: "", username: "", password: ""})
                            setKonfirPass("")
                        },500)
                    }
                } else  {
                    
                    toast.error('Masukan Email Yang Benar!', {
                        position: "top-right",
                        autoClose: 4000
                        });
                }
    
            } else {
    
                toast.error('Password Tidak Sesuai!', {
                    position: "top-right",
                    autoClose: 4000
                    });
            }
            
        }

    }

    const onBtLogin = async () => {

        if (inputLogin.email == "" || inputLogin.password == "") {
            toast.error('Isi Data dengan Benar!', {
                position: "top-right",
                autoClose: 4000
                });

        } else {

           try {

                let res  = await dispatch(onLogin({...inputLogin}))

                if (res.success) {
                    toast.success(`Selamat Datang!`, {
                        position: "top-right",
                        autoClose: 5000
                        });
                    
                    setModalOpenMasuk(false)
                    setInputLogin({email: "", password: ""})
                }
           } catch (error) {
               toast.error('Data Tidak Sesuai!', {
                position: "top-right",
                autoClose: 4000
                });

            console.log(error.response.data)
           }

        }

    }

    const onBtLogout = async () => {

      
      let res = await dispatch(onLogout())

      if(res.success){
          window.location.assign('/')
      }

    }

    const onCloseModal = () => {

        setModalOpenMasuk(false)
        
        setTimeout(() => {
            setInputRegist({email: "", username: "", password: ""})
            setInputLogin({email: "", password: ""})
            setKonfirPass("")
            setModalInput("masuk")
        }, 1000)
       
    }

    const printKategoriResepNav = () => {

        return kategoriResep.map((item,index) => {
            return (
                <li>
                    <Link to={`/resep-masakan?q=${item.link}`} state={kategoriResep[index]} className='dropdown-item poppins'>
                        {item.kategori}  
                    </Link>    
                </li>
            )
        })
    }
    
    const printKategoriArtikelNav = () => {

        return kategoriArtikel.map((item,index) => {
            return (
                <li>
                    <Link to={`/artikel-masak?q=${item.link}`} state={kategoriArtikel[index]} className='dropdown-item poppins'>
                        {item.kategori}  
                    </Link>    
                </li>
            )
        })
    }

    const printBadge = () => {
        if (subs.length > 0) {
            let {detail} = subs[0]
            let {paket} = detail[0]
             return(
                 <Badge color='warning'>{paket}</Badge>
             )
        }else {
            return (
                <></>
            )
        }
    }


    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    <ToastContainer />
                    <a href="/" className="navbar-brand poppins">Masak Asik</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle poppins" id="navbarDropdown" role="button" data-bs-toggle="dropdown">Resep</a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown" style={{  padding: 0 }}>
                                   {printKategoriResepNav()}
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle poppins" id="navbarDropdown" role="button" data-bs-toggle="dropdown">Artikel</a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown" style={{  padding: 0 }}>
                                    {printKategoriArtikelNav()}
                                </ul>
                            </li>
                            <li className="nav-item">
                                <Link to={"/premium"} className='text-decoration-none poppins'>
                                    <a href="#" className="nav-link">Premium</a>
                                </Link>
                            </li>
                            {
                                role == "admin"
                                &&
                                <li className="nav-item dropdown">
                                    <a href="#" className="nav-link dropdown-toggle poppins" id="navbarDropdown" role="button" data-bs-toggle="dropdown">Management</a>
                                    <ul className="dropdown-menu poppins" aria-labelledby="navbarDropdown">
                                         <li>
                                            <Link to="/resep-management" className="dropdown-item">
                                                Resep
                                            </Link>
                                         </li>
                                         <li>
                                            <Link to={"/artikel-management/"} className="dropdown-item">
                                                Artikel
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to={"/transaksi-management"} className='dropdown-item'>
                                                Transaction 
                                            </Link>
                                        </li>
                                    </ul>
                                </li>
                            }
                            {
                                username 
                                    ?
                                    <div className="dropdown d-lg-none">
                                        <span class="badge rounded-pill bg-primary dropdown-toggle poppins" id="profileDropdown" role="button" data-bs-toggle="dropdown" style={{ width: "80px"}}>{username}</span>
                                        {
                                            role == "user" 
                                            ?
                                        <ul className="dropdown-menu " aria-labelledby="profileDropdown">
                                            <li><a href="#" className="dropdown-item">Profile</a></li>
                                            <li>
                                                <Link to={"/transaksi"} className="dropdown-item">
                                                     Transaksi
                                                </Link>
                                            </li>
                                            <li><a href="#" className="dropdown-item">Favorit</a></li>
                                            <li><a role="button" className="dropdown-item" onClick={onBtLogout}>Logout</a></li>
                                        </ul>
                                        :
                                        <ul className="dropdown-menu" aria-labelledby="profileDropdown">
                                            <li>
                                                <a href="#" className="dropdown-item">Profile</a>
                                            </li>
                                            <li><a role="submit" className="dropdown-item" onClick={onBtLogout}>Logout</a></li>
                                        </ul>
                                        }
                                    </div> 
                                :
                                <></>
                            }
                        </ul>
                        <form action="" className="d-flex">
                            {
                                props.delay
                                 ?
                                 <Spinner color="warning" style={{ margin: "5px" }}>
                                    
                                </Spinner>
                                :
                                 username 
                                    ?
                                    <div className="dropdown d-none d-lg-block m-2">
                                        <span class="badge rounded-pill bg-primary dropdown-toggle poppins" id="profileDropdown" role="button" data-bs-toggle="dropdown" style={{ width: "80px"}}>{username}</span>
                                        {
                                            role == "user" 
                                            ?
                                        <ul className="dropdown-menu " aria-labelledby="profileDropdown">
                                            <li><a href="#" className="dropdown-item">Profile {printBadge()}</a></li>
                                            <li>
                                                <Link to={"/transaksi"} className="dropdown-item">
                                                     Transaksi
                                                </Link>
                                            </li>
                                            <li><a href="#" className="dropdown-item">Favorit</a></li>
                                            <li><a role="button" className="dropdown-item" type='submit' onClick={onBtLogout}>Logout</a></li>
                                        </ul>
                                        :
                                        <ul className="dropdown-menu" aria-labelledby="profileDropdown">
                                            <li>
                                                <a href="#" className="dropdown-item">Profile</a>
                                            </li>
                                            <li><a role="button" className="dropdown-item" onClick={onBtLogout}>Logout</a></li>
                                        </ul>
                                        }
                                    </div>  
                                :
                                <Nav>
                                    <NavItem>
                                        <NavLink onClick={() => setModalOpenMasuk(true)} href="#">Masuk</NavLink>
                                        <Modal isOpen={ModalOpenMasuk} toggle={() => onCloseModal()} size="md">
                                            
                                                <ModalHeader toggle={() => onCloseModal()}>
                                                    <p>{modalInput == "masuk" ? "Masuk untuk menyimpan resep Favoritmu" : "Buat akun Anda"}</p>
                                                </ModalHeader> 
                                            {
                                                modalInput == "masuk" 
                                                    ?
                                                    <ModalBody>
                                                        <Form>
                                                            <p className="text-center">Masuk Menggunakan Email</p>
                                                            <div style={{ padding: "0 10%" }}>
                                                                <FormGroup>
                                                                    <Input placeholder="Email" type="email" value={inputLogin.email} 
                                                                    onChange={(text) => setInputLogin({...inputLogin, email: text.target.value})}/>
                                                                </FormGroup>
                                                                <FormGroup>
                                                                    <Input placeholder="Password" type="password" value={inputLogin.password}
                                                                    onChange={(text) => setInputLogin({...inputLogin, password: text.target.value})}/>
                                                                </FormGroup>
                                                            </div>
                                                            <div style={{ padding: "0 30%" }}>
                                                                <Button color="success"  outline style={{ width: "100%" }} onClick={onBtLogin}>Masuk</Button>
                                                            </div>
                                                        </Form>
                                                        <div style={{ marginTop: "2vh" }}>
                                                            <p className="text-center"><a href="#" style={{textDecoration: "none", color: "black" }}>Lupa Kata Sandi?</a></p>
                                                            <p className="text-center"><a href="#" style={{textDecoration: "none" }}
                                                            onClick={() => {setModalInput("daftar")}}>Belum Punya Akun? Daftar Di SINI</a></p>
                                                        </div>
                                                    </ModalBody>
                                                    :
                                                    <ModalBody>
                                                        <Form>
                                                            <p className="text-center">Gratis kok, cuma beberapa menit saja</p>
                                                            <div style={{ padding: "0 10%" }}>
                                                                <FormGroup>
                                                                    <Label>Email</Label>
                                                                    <Input placeholder="Email" type="email" value={inputRegist.email} 
                                                                    onChange={(text) => setInputRegist({...inputRegist, email: text.target.value})}/>
                                                                </FormGroup>
                                                                <FormGroup>
                                                                    <Label>Username</Label>
                                                                    <Input placeholder="Username" type="text" value={inputRegist.username} 
                                                                    onChange={(text) => setInputRegist({...inputRegist, username: text.target.value})}/>
                                                                </FormGroup>
                                                                <FormGroup>
                                                                    <Label>Password</Label>
                                                                    <Input placeholder="Password" type="password" value={inputRegist.password}
                                                                    onChange={(text) => setInputRegist({...inputRegist,password: text.target.value})}/>
                                                                </FormGroup>
                                                                <FormGroup>
                                                                    <Label>Konfirmasi Password</Label>
                                                                    <Input placeholder="Password" value={konfirPass} type="password"
                                                                    onChange={(text) => setKonfirPass(text.target.value)}/>
                                                                </FormGroup>
                                                            </div>
                                                            <div style={{ padding: "0 30%" }}>
                                                                <Button color="success" outline style={{ width: "100%" }} onClick={onBtRegist}>Daftar</Button>
                                                            </div>
                                                        </Form>
                                                    </ModalBody>
                                            }
                                        </Modal>
                                    </NavItem>
                                </Nav>
                            }
                        </form>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default NavbarComponent
