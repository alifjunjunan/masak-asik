import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { confirmAlert } from 'react-confirm-alert'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { API_URL } from '../helper'

const DetailKontenArtikelPage = () => {

    const [detailArtikel,setDetailArtikel] = useState({})
    const [dataResep,setDataResep] = useState([])
    const [kembali, setKembali] = useState(false)

    useEffect(()=> {
        getData()
    },[])

    const navigate = useNavigate()

    const {subs} = useSelector((state) => {
        return {
            subs: state.userReducer.subscribe
        }
    })

   
    
    

    const getData = async () => {
        
        try {
            let res = await axios.get(`${API_URL}/artikel${window.location.search}`)
            let resepLain = await axios.get(`${API_URL}/resep?id_gte=${Math.floor(Math.random()*11)}&id_lte=15&_limit=5`)
            setDetailArtikel(res.data[0])
            setDataResep(resepLain.data)
            
            if(subs.length > 0) {
                if (subs[0].detail[0].penawaran.includes("Beragam Artikel")) {
                    setDetailArtikel(res.data[0])
                    setDataResep(resepLain.data)
                }else {
                    confirmAlert({
                        title: 'Konten Premium',
                        message: 'Paket Anda tidak sesuai dengan konten ini',
                        buttons: [
                            {
                                label: 'Cancel',
                                onClick: () => setKembali(true)
                            }
                        ],
                        closeOnClickOutside: false
                    })
                }
            }else {
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

        } catch (error) {
            console.log(error)
        }
    }

    const printResepLain = () => {

        if(dataResep.length > 0 ) {
            return dataResep.map((item,index) => {
                let textJudul = item.judul
                let tampil =  textJudul.substr(0,35)
                return(
                    <Link to={`/resep?id=${item.id}`} className='text-decoration-none' style={{ color: "black" }}>
                        <div className='d-flex flex-row my-2' style={{ cursor: "pointer" }}>
                            <div className="col-6">
                                <div> 
                                    <img src={item.photo} alt="" width={"100%"} style={{ borderRadius: "8px" }}/>
                                </div>
                            </div>
                            <div className="col-6 mx-2 ">
                                <p className="poppins">{tampil}. . .</p>
                            </div>
                        </div>
                    </Link>
                )
            })
        }
        
    }

    return (
        <div>
            {
                kembali == true && navigate(-1)
            }
            <div className="container">
                <p className="poppins mt-4"><Link to={"/"} className='text-decoration-none' style={{ color: "#7f8fa6" }}>Home</Link> / <a onClick={() => navigate(-1)}  className='text-decoration-none' style={{ color: "#7f8fa6", cursor: "pointer" }}>{detailArtikel.kategori}</a> / {detailArtikel.judul} </p>
                <div className="d-flex flex-row">
                    <div className="col-9">
                        <h1 className="text-center poppins">{detailArtikel.judul}</h1>
                        <h6 className="text-center poppins">{detailArtikel.kategori}</h6>
                        <h6 className="text-center poppins">{detailArtikel.date}</h6>
                        <div className='my-3'>
                            <img src={detailArtikel.photo} width={"100%"} alt="" style={{ borderRadius: "10px", boxShadow: "1px 2px 8px grey" }} />
                        </div>
                        <div className='my-2'>
                            <p className="poppins" style={{ textAlign: "justify" }}>{detailArtikel.deskripsi}</p>
                        </div>
                    </div>
                    <div className="col-3 mx-5" style={{ marginTop: "20vh" }}>
                        <h3 className="poppins text-center">Coba Resep Lainnya</h3>
                        <div>
                                {printResepLain()}   
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailKontenArtikelPage
