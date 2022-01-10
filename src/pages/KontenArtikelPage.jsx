import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { } from '../action'
import { API_URL } from '../helper'
import {BiCrown} from 'react-icons/bi'
import {SiCodechef} from 'react-icons/si'
import { Button, Badge } from 'reactstrap'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import {BsBookmark} from 'react-icons/bs'

const KontenArtikelPage = () => {

    const {state} = useLocation()

    useEffect(() => {
        getData()
    },[state])

    const [dataArtikel,setDataArtikel] = useState([])
    const [dataArtikelBaru,setDataArtikelbaru] = useState([])
    const [limitData, setLimitData] = useState(6)
    const [page, setPage] = useState(1)

    const getData = async () => {

       try {
          
          let res = await axios.get(`${API_URL}/kategoriArtikel?q=${state.kategori}`)
          let artikel = await axios.get(`${API_URL}/artikel?kategori=${state.kategori}&_sort=id&_order=desc`)
          let artikelbaru = await axios.get(`${API_URL}/artikel?_sort=id&_order=desc&_limit=5`)

          setDataArtikel(artikel.data)
          setDataArtikelbaru(artikelbaru.data)
   
       } catch (error) {
           console.log(error)
       }

    }

    const printArtikel = () => {

        if(dataArtikel.length > 0) {

            return dataArtikel.slice(page > 1 ? (page - 1) * limitData : page - 1, page * limitData).map((item,index) => {
                let textJudul = item.judul
                let tampil =  textJudul.substr(0, 29)
                return(
                    <div className="col-10 col-md-3 mx-3 my-3" style={{ borderRadius: "20px", cursor:"pointer" ,color: "white" ,backgroundColor: "#40739e",boxShadow: "1px 1px 10px grey" }}>
                        <Link to={`/artikel?id=${item.id}`} className='text-decoration-none' style={{ color: "white" }}>
                            <div>
                                <img src={item.photo} width={"100%"}  alt="" style={{ borderTopRightRadius: "20px", borderTopLeftRadius: "20px" }} />
                                <div className="d-flex justify-content-between">
                                    <div className="mx-2">
                                        <Badge color="warning" style={{ color: "white", padding: "3px" }}><BiCrown  size={"1.5vw"}/></Badge> 
                                    </div>
                                    <div className="mx-2">
                                        <BsBookmark size={"1.5vw"} alt="Simpan"/>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className="text-center mb-3 mx-4 poppins">{tampil}. . .</p>
                            </div>
                        </Link>
                    </div>
                )
            })
        }
    }

    const printArtikelBaru = () => {
        
        if (dataArtikelBaru.length > 0) {

            return dataArtikelBaru.map((item,index) => {
                let textJudul = item.judul
                let tampil =  textJudul.substr(0, 40)
                return(
                    <Link to={`/artikel?id=${item.id}`} className='text-decoration-none' style={{ color: "black" }}>
                        <div className='d-flex flex-row my-1' style={{ cursor: "pointer" }}>
                            <div className="col-6">
                                <div> 
                                    <img src={item.photo} alt="" width={"100%"} style={{ borderRadius: "8px" }}/>
                                </div>
                            </div>
                            <div className="col-6 mx-2 my-2">
                                <p className="poppins">{tampil}. . .</p>
                            </div>
                        </div>
                    </Link>
                )
            })
        }

    }

    const printPaginate = () => {

        let btn = []

        for (let i = 0; i < Math.ceil(dataArtikel.length / limitData); i ++) {
            btn.push(<Button outline color="primary" disabled={page == i + 1 ? true : false} onClick={() => setPage(i+1)}>{i+1}</Button>)
        }

        return btn
    }


    return (
        <div>
            <div className="imgContentArt">
                <div className="container">
                    <div style={{ color: "white", padding: "7vh 0",textShadow: '2px 4px 4px #576574' }}>
                        <h1 className="text-center poppins my-3">{state.kategori}</h1>
                        <h6 className="text-center poppins">{state.text}</h6>
                    </div>
                </div>
            </div>
            <div className="row mt-3 mx-3 d-flex flex-md-row justify-content-center" >
                <div className="col-9">
                    <div className='d-flex flex-row flex-wrap justify-content-around'>
                        {printArtikel()}
                    </div>
                </div>
                <div className="col-md-3 mt-3">
                    <h3 className="poppins text-center">Artikel Terbaru</h3>
                    {printArtikelBaru()}
                </div>
            </div>
            <div className='my-4 d-flex justify-content-center' >
                    {printPaginate()}
            </div>
        </div>
    )
}

export default KontenArtikelPage
