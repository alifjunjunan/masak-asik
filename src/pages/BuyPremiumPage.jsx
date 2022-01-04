import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_URL } from '../helper'
import {AiOutlineCheckCircle} from 'react-icons/ai'
import {BiTime} from 'react-icons/bi'
import {ImPriceTags} from 'react-icons/im'
import { Button } from 'reactstrap'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { addUserTransaction, updateTransaction } from '../action'
import { Navigate } from 'react-router-dom'

const BuyPremiumPage = () => {

    const [data, setData] = useState({})
    const [pindah, setPindah] = useState(false)
    const [able,setAble] = useState(false)

    let {durasi,penawaran,harga} = data
    
    const {role,iduser,username,transaction, subscribe } = useSelector((state) => {
        
        return{
            role : state.userReducer.role,
            iduser: state.userReducer.id,
            username: state.userReducer.username,
            transaction: state.userReducer.transaction,
            subscribe: state.userReducer.subscribe
        }
    })

    const dispatch = useDispatch()

    useEffect(() => {
        getData()
    },[])

    const getData = async () => {

        try {
            let res = await axios.get(`${API_URL}/productSubscribes${window.location.search}`)
            setData(res.data[0])
            
            if (transaction.length > 0 || subscribe.length > 0 ) {
                setAble(true)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const printPenawaran = () => {
        
        if (penawaran){
            return penawaran.map((item,index) => {
                return (
                    <p className='poppins'><AiOutlineCheckCircle size={"2vw"}/>{item}</p>
                )
            })
        } else {
            <></>
        }
    }

    const onBtBeli = async () => {

        let temp = {...data}
        let time = new Date()
        let invoice = time.getTime()
        let date = time.toLocaleDateString()

        let dataTransaksi = {
            iduser,
            username,
            invoice: `#INV/${invoice}`,
            date,
            totalPayment: Number(harga),
            detail: [temp],
            status: "Menunggu Pembayaran",
            buktiTransaksi: ""

        }

        let tempTrans = [...transaction]

        
        
        if (role) {
            if (durasi == "1 Minggu") {
                time.setDate(time.getDate() + 7)
                dataTransaksi = {
                    ...dataTransaksi,
                    expired: time.toLocaleDateString()
                }
                
            } else if (durasi == "1 Bulan") {
                time.setMonth(time.getMonth() + 1)
                dataTransaksi = {
                    ...dataTransaksi,
                    expired: time.toLocaleDateString()
                }
                
            } else if (durasi == "3 Bulan") {
                time.setMonth(time.getMonth() + 3)
                dataTransaksi = {
                    ...dataTransaksi,
                    expired: time.toLocaleDateString()
                } 
            }

                try {
                    
                    tempTrans.push(dataTransaksi)

                    let res = await dispatch(updateTransaction(tempTrans,iduser))
                    if (res.success) {
                        toast.success("Success! Segera Selesaikan Pembayaran")
                        setAble(true)
                        setTimeout(() => {
                            setPindah(true)
                        },500)
                    }
                   
                } catch (error) {
                    console.log(error)
                }
            
        } else  {
            toast.warning("Silahkan Login Terlebih Dahulu!")
        } 
        
    }

    return (
        <div>
            {
                pindah && <Navigate to="/transaksi"/>
            }
            <h1 className="text-center poppins my-2">Paket Yang Kamu Pilih</h1>
            <div className="container">
                <div className="row">
                    <div className="col-8 offset-2 shadow my-4" style={{  borderRadius: "20px", backgroundColor: "#78e08f" }}>
                        <div className='my-2'>
                            <h2 className='poppins text-center'>Paket {data.paket}</h2>
                            <hr />
                            <div className="d-flex justify-content-around">
                            {printPenawaran()}
                            </div>
                            <div className="d-flex justify-content-center">
                            <p className="poppins mx-2"><BiTime size={"2vw"}/> {data.durasi}</p>
                            <p className="poppins mx-2"><ImPriceTags size={"2vw"}/> Rp.{data.harga}</p>
                            </div>
                        </div>
                        <hr />
                        <div className="my-2 mx-3">
                            <h5 className='poppins'>Petunjuk Pembayaran Via ATM:</h5>
                            <div className='p-2 shadow' style={{  borderRadius: "20px", backgroundColor: "#05c46b" }}>
                                <div className="mx-2">
                                <p className="poppins" style={{ color:"white" }}>1. Pilih Transaksi Lainnya, lalu pilih Transfer</p>
                                <p className="poppins" style={{ color:"white" }}>2. Masukan Nomor Rekening tujuan</p>
                                <p className="poppins" style={{ color:"white" }}>3. Pada pilihan bank tujuan transfer, pilih Bank Lain</p>
                                <p className="poppins" style={{ color:"white" }}>4. Masukkan kode bank dan nomor rekening tujuan</p>
                                <p className="poppins" style={{ color:"white" }}>5. Masukkan jumlah Transfer</p>
                                <p className="poppins" style={{ color:"white" }}>6. Pastikan kembali kode bank, nomor rekening dan nominal transfer benar</p>
                                <p className="poppins" style={{ color:"white" }}>7. Pilih benar dan konfirmasi kebenaran data</p>
                                <p className="poppins" style={{ color:"white" }}>8. Tunggu hingga muncul keterangan Transaksi Anda Berhasil</p>
                                <p className="poppins" style={{ color:"white" }}>8. Upload bukti pembayaran pada menu Transaksi</p>
                                </div>
                            </div>
                            <div className='text-center my-3'>
                                <Button role={"button"} className='shadow-sm' onClick={onBtBeli} disabled={able}
                                style={{ backgroundColor: "#f9ca24", border: "none", width: "50%", }}>Beli Paket</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BuyPremiumPage;