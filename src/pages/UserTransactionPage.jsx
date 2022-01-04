import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Button,FormGroup,Input,Label,Modal,ModalBody,ModalFooter,ModalHeader } from 'reactstrap'
import { addUserTransaction, updateTransaction } from '../action'
import { API_URL } from '../helper'

const UserTransactionPage = () => {

    const {iduser,email,password,transaction} = useSelector((state => {
        return {
            
            iduser: state.userReducer.id,
            email: state.userReducer.email,
            password: state.userReducer.password,
            transaction: state.userReducer.transaction,
        }
    }))

    useEffect(() => {
        getDataUser()
    },[])

    const [history,setHistory] = useState([])
    const [opsiBtn,setOpsiBtn] = useState({item: "pembelian", color: "black"})
    const [modalOpen,setModalOpen] = useState(false)
    const [bukti,setBukti] = useState("")
    const [able,setAble] = useState(false)
    const dispatch = useDispatch()

    const getDataUser = async () => {

        try {
            
            let res = await axios.get(`${API_URL}/user?email=${email}&password=${password}`)
            let riwayat = await axios.get(`${API_URL}/userTransaction?iduser=${iduser}`)
            
            setHistory(riwayat.data)

            if (transaction[0].status.includes("Konfirmasi")) {
                setAble(!able)
            }
            
        } catch (error) {
            console.log(error)
        }
    }

   

    const printPembelian = () => {

        if (transaction.length > 0) {
            return transaction.map((item,index) => {
                const {harga,paket,durasi} = item.detail[0]
                const {buktiTransaksi} = item
                return (
                    <div>
                        <div className="row mt-3">
                        <div className="col-12 d-flex flex-row" style={{ border: "2px solid white",borderTopRightRadius: "10px", borderTopLeftRadius: "10px", backgroundColor: "#f1f2f6" }}>
                            <div className="col-3" style={{ borderRight: "3px solid white" }}>
                                <div className="p-2">
                                    <h6 className="poppins">No.Tagihan:</h6>
                                    <h5 className="poppins">{item.invoice}</h5>
                                    <p className='poppins m-0'>{item.date}</p>
                                </div>
                            </div>
                            <div className="col-2" style={{ borderRight: "3px solid white" }}>
                                <div className="p-2">
                                    <h6 className="poppins">Total Pembayaran</h6>
                                    <h5 className="poppins">Rp.{harga.toLocaleString()}</h5>
                                </div>
                            </div>
                            <div className="col-3">
                                <div className="p-2">
                                    <h6 className="poppins">Status Tagihan:</h6>
                                    <h5 className="poppins">{item.status}</h5>
                                </div>
                            </div>
                        </div>
                        </div>
                        <div className="row">
                            <div className="col-12 d-flex flex-row"  style={{ border: "2px solid white", borderTop: "none", backgroundColor: "#f1f2f6"}}>
                                <div className="col-2">
                                    <div className="p-2">
                                        <h6 className="poppins">Paket:</h6>
                                        <h5 className="poppins">{paket}</h5>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="p-2">
                                        <h6 className="poppins">Durasi:</h6>
                                        <h5 className="poppins">{durasi}</h5>
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="p-2">
                                        <h6 className="poppins">Harga:</h6>
                                        <h5 className="poppins">Rp.{harga.toLocaleString()}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row" style={{ marginBottom: "20vh" }}>
                            <div className="col-12 d-flex justify-content-end" style={{ border: "2px solid white", borderTop: "none", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px", backgroundColor: "#f1f2f6"}}>
                                <div className="col-3 p-3">
                                    <Button color='warning' className='poppins' style={{ color: "white" }} disabled={able} onClick={() => setModalOpen(!modalOpen)}>Unggah Bukti Transfer</Button>
                                </div>
                              
                                <Modal isOpen={modalOpen} toggle={() => setModalOpen(!modalOpen)}>
                                    <ModalHeader toggle={() => setModalOpen(!modalOpen)}>
                                        Unggah Bukti Transfer
                                    </ModalHeader>
                                    <ModalBody>
                                        <FormGroup>
                                            <Label>Unggah Bukti</Label>
                                            {/* <Input type='file' onChange={(event) => setBukti(URL.createObjectURL(event.target.files[0]))}/> */}
                                            {/* <img src={URL.createObjectURL(bukti)} alt="" /> */}
                                            <Input placeholder='Bukti Transfer' onChange={(event) => setBukti(event.target.value)}/>
                                        </FormGroup>
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color='success' onClick={onBtUnggah} disabled={able}>Unggah</Button>
                                    </ModalFooter>
                                </Modal>
                            </div>
                        </div>
                    </div>
                )
            })
        } else {
            return (
                <div>
                    <h1 className="poppins text-center" style={{ margin: "26vh 0" }}>Belum Ada Transaksi</h1>
                </div>
            )
        }
    }

    const printHistory = () => {

        if (history.length > 0) {
            if (history[0].status.includes("Terkonfirmasi")) {
                return history.map((item,index) => {
                    const {harga,paket,durasi} = item.detail[0]
                    return (
                        <div>
                            <div className="row mt-3">
                            <div className="col-12 d-flex flex-row" style={{ border: "2px solid white",borderTopRightRadius: "10px", borderTopLeftRadius: "10px", backgroundColor: "#f1f2f6" }}>
                                <div className="col-3" style={{ borderRight: "3px solid white" }}>
                                    <div className="p-2">
                                        <h6 className="poppins">No.Tagihan:</h6>
                                        <h5 className="poppins">{item.invoice}</h5>
                                        <p className='poppins m-0'>{item.date}</p>
                                    </div>
                                </div>
                                <div className="col-2" style={{ borderRight: "3px solid white" }}>
                                    <div className="p-2">
                                        <h6 className="poppins">Username:</h6>
                                        <h5 className='poppins m-0'>{item.username}</h5>
                                    </div>
                                </div>
                                <div className="col-2" style={{ borderRight: "3px solid white" }}>
                                    <div className="p-2">
                                        <h6 className="poppins">Total Pembayaran</h6>
                                        <h5 className="poppins">Rp.{harga.toLocaleString()}</h5>
                                    </div>
                                </div>
                                <div className="col-3">
                                    <div className="p-2">
                                        <h6 className="poppins">Status Tagihan:</h6>
                                        <h5 className="poppins">{item.status}</h5>
                                    </div>
                                </div>
                            </div>
                            </div>
                            <div className="row">
                                <div className="col-12 d-flex flex-row"  style={{ border: "2px solid white", borderTop: "none", backgroundColor: "#f1f2f6", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px"}}>
                                    <div className="col-2">
                                        <div className="p-2">
                                            <h6 className="poppins">Paket:</h6>
                                            <h5 className="poppins">{paket}</h5>
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <div className="p-2">
                                            <h6 className="poppins">Durasi:</h6>
                                            <h5 className="poppins">{durasi}</h5>
                                        </div>
                                    </div>
                                    <div className="col-2">
                                        <div className="p-2">
                                            <h6 className="poppins">Harga:</h6>
                                            <h5 className="poppins">Rp.{harga.toLocaleString()}</h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 d-flex justify-content-end" style={{ border: "2px solid white", borderTop: "none", borderBottomLeftRadius: "10px", borderBottomRightRadius: "10px", backgroundColor: "#f1f2f6"}}>
                                    
                                </div>
                            </div>
                        </div>
                    )
                })
            } else {
                return (
                    <div>
                        <h1 className="poppins text-center" style={{ margin: "26vh 0" }}>Belum Ada Transaksi</h1>
                    </div>
                )
            }
        } else {
            return (
                <div>
                    <h1 className="poppins text-center" style={{ margin: "26vh 0" }}>Belum Ada Transaksi</h1>
                </div>
            )
        }
    }


    const onBtUnggah = async () => {

        let temp = [...transaction]

        temp[0].buktiTransaksi = bukti
        temp[0].status = "Menunggu Konfirmasi"
        console.log("isi temp =>",temp)

       
        try {
            let res = await dispatch(updateTransaction(temp,iduser))
            let response = await dispatch(addUserTransaction(temp[0]))

            if (res.success) {
                toast.success("Success! Harap menunggu untuk di Konfirmasi")
                setAble(true)
                setTimeout(() => {
                    setModalOpen(!modalOpen)
                }, 500);
            }
        } catch (error) {
            console.log(error)
        }

        
    }

    return (
        <div>
            <h1 className="text-center poppins my-3">Transaksi</h1>
            <div className="container">
                <div className="row my-3">
                    <div className="col-12 d-flex flex-row shadow" style={{backgroundColor: "#c8d6e5", borderRadius: "10px" }}>
                        <h6 className="poppins mx-4 mt-2 p-1" onClick={() => setOpsiBtn({...opsiBtn, item: "pembelian"})}
                         style={{ cursor: "pointer", color: opsiBtn.item == "pembelian" ? "white" : "gray", }}>Pembelian</h6>
                        <h6 className="poppins mx-4 mt-2 p-1" onClick={() => setOpsiBtn({...opsiBtn, item: "riwayat"})} 
                        style={{ cursor: "pointer", color: opsiBtn.item == "riwayat" ? "white" : "gray" }}>Riwayat Pembelian</h6>
                    </div>
                </div> 
                {
                    opsiBtn.item == "pembelian"
                    ?
                    printPembelian()
                    :
                    printHistory()
                }
               
            </div>
        </div>
    )
}

export default UserTransactionPage
