import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { API_URL } from '../helper'
import {BiTimeFive} from 'react-icons/bi'
import {SiCodechef} from 'react-icons/si'
import {HiOutlineUserGroup} from 'react-icons/hi'
import { useSelector } from 'react-redux'
import { confirmAlert } from 'react-confirm-alert'

const DetailKontenResepPage = () => {

    const [detail,setDetail] = useState({})
    const [Artikel, setArtikel] = useState([])
    const [kembali, setKembali] = useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        getData()
    },[])

    const {subs} = useSelector((state) => {
        return {
            subs: state.userReducer.subscribe
        }
    })

    const getData = async() => {

        try {
            let res = await axios.get(`${API_URL}/resep${window.location.search}`)
            let Artikel = await axios.get(`${API_URL}/artikel?id_gte=1&id_lte=20&_limit=5`)
            setDetail(res.data[0])
            setArtikel(Artikel.data)
            
            if(res.data[0].content == "Premium") {

                if (subs.length > 0) {
                    setDetail(res.data[0])
                    setArtikel(Artikel.data)
                } else {
                    confirmAlert({
                        title: 'Konten Premium',
                        message: 'Silahkan Berlangganan untuk melihat konten ini',
                        buttons: [
                            {
                                label: 'Cancel',
                                onClick: () => setKembali(true)
                            }
                        ],
                        closeOnClickOutside: false
                    })
                }  
            }


        } catch (error) {
            console.log(error)
        }

    }


    const printbahan = () => {

        if(detail.bahan) {
            return detail.bahan.map((item,index) => {
                return (
                    <div className="col-6">
                        <p className="poppins">{item}</p>
                    </div>
                )
            })
        }
    }

    const printLangkah = () => {

        if(detail.instruksi) {
            return detail.instruksi.map((item,index) => {
                return (
                    <div>
                        {
                            item.photo 
                            ?
                            <div className='d-flex flex-row flex-wrap mt-3'>
                                <div className="col-4">
                                    <img src={item.photo} width={"100%"} alt="" style={{ borderRadius: "10px", boxShadow: "1px 2px 1px grey" }} />
                                </div>
                                <div style={{ backgroundColor: "white", position: "relative", left: "-35px",top: "7.5vh" ,width: "65px", borderRadius: "100%", height: "65px" }}>
                                    <h1 className="poppins text-center" style={{ color: "red", padding: "1.5vh" }}>{item.no}</h1>
                                </div>
                                <div className="col-7" style={{ position: "relative", left: "-25px" }}>
                                    <p className="poppins pt-5">{item.langkah}</p>
                                </div>
                            </div>
                            :
                            <div className='d-flex flex-row flex-wrap mt-3'>
                                <div>
                                    <h1 className="poppins text-center" style={{ color: "red" }}>{item.no}</h1>
                                </div>
                                <div className="col-9">
                                    <p className="poppins mx-4 pt-1">{item.langkah}</p>
                                </div>
                            </div>
                        }
                    </div>
                )
            })
        }
    }

    const printArtikel = () => {

        return Artikel.map((item,index) => {
            let textJudul = item.judul
            let tampil =  textJudul.substr(0, 40)
            return(
                <Link to={`/artikel?id=${item.id}`} className='text-decoration-none' style={{ color: "black" }}>
                    <div className='d-flex flex-row my-2' style={{ cursor: "pointer" }}>
                        <div className="col-6">
                            <div> 
                                <img src={item.photo} alt="" width={"100%"} style={{ borderRadius: "8px" }}/>
                            </div>
                        </div>
                        <div className="col-6 mx-2 my-1">
                            <p className="poppins">{tampil}. . .</p>
                        </div>
                    </div>
                </Link>
            )
        })
    }

    
    return (
        <div>
            {
                kembali == true && navigate(-1)
            }
            <div className="container">
                <p className='mt-4 poppins'><Link to={"/"} className='text-decoration-none' style={{ color: "#7f8fa6" }}>Home</Link> / <a  onClick={() => navigate(-1)} className='text-decoration-none' style={{ color: "#7f8fa6", cursor: "pointer" }}>{detail.kategori}</a> / {detail.judul}</p>
                <div className="row">
                    <div className="d-flex flex-row">
                        <div className="col-9">
                            <h1 className="text-center poppins">{detail.judul}</h1>
                            <div className="row my-3">
                                <div className="col-6 offset-3 d-flex justify-content-evenly">
                                    <h6 className="text-center poppins"><BiTimeFive size={"2vw"}/> {detail.lama}</h6>
                                    <h6 className="text-center poppins"><HiOutlineUserGroup className='mx-2' size={"2vw"}/>{detail.porsi}</h6>
                                    <h6 className="text-center poppins"><SiCodechef className='mx-2' size={"2vw"}/>{detail.kesulitan}</h6>
                                </div>
                                <div className='my-3'>
                                    <img src={detail.photo} width={"100%"} alt="" style={{ borderRadius: "10px", boxShadow: "1px 2px 8px grey" }} />
                                </div>
                                <div className='my-2'>
                                    <p className="poppins" style={{ textAlign: "justify" }}>{detail.deskripsi}</p>
                                </div>
                                <div className='my-2'>
                                    <h1 className="asap text-center" style={{ fontWeight: "bold" }}>Bahan-Bahan</h1>
                                    <div className="row">
                                        <div className="d-flex flex-row flex-wrap justify-content-between">
                                            {printbahan()}
                                        </div>
                                    </div>
                                </div>
                                <div className="my-2">
                                    <h1 className="asap text-center" style={{ fontWeight: "bold" }}>Cara Memasak</h1>
                                    <div className="row">
                                        {printLangkah()}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-3 mx-5" style={{ marginTop: "27vh" }}>
                            <h3 className="poppins text-center">Artikel menarik</h3>
                            <div>
                                 {printArtikel()}   
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailKontenResepPage
