import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {AiOutlineCheckCircle} from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import { getSubscribesAction } from '../action'
import { API_URL } from '../helper'

const PremiumPage = () => {

    // const [dataPremium,setDataPremium] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSubscribesAction())
    },[])

    const {dataPremium} = useSelector((state) => {
        return {
            dataPremium: state.subscribesReducer.listSubscribes
        }
    })


    return (
        <div>
            <div className="container">
                <h1 className="text-center poppins mt-3">Pilih Paket Premium</h1>
                <p className="text-center poppins mb-3">Akses semua resep dan beragam artikel menarik </p>
                <div className="row">
                    <div className="d-flex justify-content-around  my-4">
                        <div className="col-3 shadow" style={{ borderRadius: "20px", height: "50vh", backgroundColor: "#f5f6fa" }}>
                            <div className='p-1 shadow-sm' style={{borderTopLeftRadius: "20px", borderTopRightRadius: "20px", backgroundColor: "#00a8ff" }}>
                                <h3 className=" text-center poppins" style={{ color: "white" }}>Weekly</h3>
                                <h6 className=' text-center poppins my-2' style={{ color: "white" }}>Cuma Rp.10.000/Minggu</h6>
                            </div>
                            <div className='m-3'>
                                <p className='poppins'><AiOutlineCheckCircle size={"2vw"}/> Akses Semua Resep</p>
                                <p className='poppins'><AiOutlineCheckCircle size={"2vw"}/> Simpan Resep Favoritmu</p>
                            </div>
                            <div className='col-6 offset-3 shadow-sm' style={{ marginTop: "16vh"  }}>
                                {
                                    dataPremium.length > 0
                                    ?
                                <Link to={`/premium/detail?paket=${dataPremium[0].paket}`}>
                                    <Button color='info' role={"button"} className='poppins' style={{ width: "100%", fontWeight: "500", color: "white", letterSpacing: "1px", textDecoration: "none" }}>Pilih</Button>
                                </Link>
                                    :
                                    <></>
                                }
                            </div>
                        </div>
                        <div className="col-3 shadow" style={{ borderRadius: "20px", height: "50vh", backgroundColor: "#f5f6fa" }}>
                            <div className='p-1 shadow-sm' style={{borderTopLeftRadius: "20px", borderTopRightRadius: "20px", backgroundColor: "#4a69bd" }}>
                                <h3 className=" text-center poppins" style={{ color: "white" }}>Monthly</h3>
                                <h6 className=' text-center poppins my-2' style={{ color: "white" }}>Rp.35.000/Bulan</h6>
                            </div>
                            <div className='m-3'>
                                <p className='poppins'><AiOutlineCheckCircle size={"2vw"}/> Akses Semua Resep</p>
                                <p className='poppins'><AiOutlineCheckCircle size={"2vw"}/> Simpan Resep Favoritmu</p>
                                <p className='poppins'><AiOutlineCheckCircle size={"2vw"}/> Akses Beragam Artikel</p>
                            </div>
                            <div className='col-6 offset-3 shadow-sm' style={{ marginTop: "9vh"  }}>
                            {
                                    dataPremium.length > 0
                                    ?
                                <Link to={`/premium/detail?paket=${dataPremium[1].paket}`}>
                                    <Button color='info' role={"button"} className='poppins' style={{ width: "100%", fontWeight: "500", color: "white", letterSpacing: "1px", textDecoration: "none" }}>Pilih</Button>
                                </Link>
                                    :
                                    <></>
                                }
                            </div>
                        </div>
                        <div className="col-3 shadow" style={{ borderRadius: "20px", height: "50vh", backgroundColor: "#f5f6fa" }}>
                            <div className='p-1 shadow-sm' style={{borderTopLeftRadius: "20px", borderTopRightRadius: "20px", backgroundColor: "#3c6382" }}>
                                <h3 className=" text-center poppins" style={{ color: "white" }}>Quaterly</h3>
                                <h6 className=' text-center poppins my-2' style={{ color: "white" }}>Rp.90.000/3 Bulan</h6>
                            </div>
                            <div className='m-3'>
                                <p className='poppins'><AiOutlineCheckCircle size={"2vw"}/> Akses Semua Resep</p>
                                <p className='poppins'><AiOutlineCheckCircle size={"2vw"}/> Simpan Resep Favoritmu</p>
                                <p className='poppins'><AiOutlineCheckCircle size={"2vw"}/> Akses Beragam Artikel</p>
                                <p className='poppins'><AiOutlineCheckCircle size={"2vw"}/> Hemat 15%</p>
                            </div>
                            <div className='col-6 offset-3 shadow-sm'>
                            {
                                    dataPremium.length > 0
                                    ?
                                <Link to={`/premium/detail?paket=${dataPremium[2].paket}`}>
                                    <Button color='info' role={"button"} className='poppins' style={{ width: "100%", fontWeight: "500", color: "white", letterSpacing: "1px", textDecoration: "none" }}>Pilih</Button>
                                </Link>
                                    :
                                    <></>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 my-5">
                        <h2 className="text-center poppins">Paket Asik Masak Makin Asik</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PremiumPage
