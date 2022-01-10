import React, { useEffect, useState } from 'react'
import { FormGroup, Input, InputGroup, Button, Badge } from 'reactstrap'
import {BiSearchAlt} from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { getResepAction, sortResepAction } from '../action'
import { Navigate, useLocation, Link } from 'react-router-dom'
import {BiTimeFive, BiCrown} from 'react-icons/bi'
import {SiCodechef} from 'react-icons/si'
import {BsBookmark} from 'react-icons/bs'

const CariKontenPage = () => {

    const dispatch = useDispatch()
    const {state} = useLocation()
    const [cariResep,setCariResep] = useState({kategori: "",resep: ""})
    const [keyword, setKeyword] = useState(state.resep == "" ? state.kategori : state.resep)
    const [limitData, setLimitData] = useState(6)
    const [page, setPage] = useState(1)


    const {hasilCari} = useSelector((state) => {
        return {
            hasilCari: state.resepReducer.listResep
        }
    })

    useEffect(() => {

    },[])


    const onBtSearch = async () => {

        let data = {
            ...cariResep
        }
        console.log(data.kategori, data.resep)

       let res = await dispatch(getResepAction(data.kategori, data.resep))
       if(res.success){
           setKeyword(data.resep == "" ? data.kategori : data.resep)
        }    
    }

    const printResep = () => {

        if (hasilCari.length > 0) {
            return hasilCari.slice(page > 1 ? (page - 1) * limitData : page - 1, page * limitData).map((item,index) => {
                let textJudul = item.judul
                let tampil =  textJudul.substr(0, 30)
                return(
                    <div className="col-10 col-md-3 mx-3 my-3" style={{ borderRadius: "20px", cursor:"pointer" ,backgroundColor: "#079992",boxShadow: "1px 1px 10px grey" }}>
                        <Link to={`/resep?id=${item.id}`} className='text-decoration-none' style={{ color: "white" }}>
                            <div>
                                <img src={item.photo} width={"100%"} alt="" style={{ borderTopRightRadius: "20px", borderTopLeftRadius: "20px", backgroundPosition: "left top" }} />
                                <div className="d-flex justify-content-between">
                                    <div className="mx-2">
                                      {
                                          item.content == "Premium" &&  <Badge color="warning" style={{ color: "white", padding: "3px" }}><BiCrown  size={"1.5vw"}/></Badge> 
                                      }
                                    </div>
                                    <div className="mx-2">
                                        <BsBookmark size={"1.5vw"} alt="Simpan"/>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p className="text-center mb-3 mx-4 poppins">{tampil}. . .</p>
                            </div>
                            <div className="d-flex justify-content-around">
                                <p className="poppins"><BiTimeFive size={"2vw"}/> {item.lama}</p>
                                <p className="poppins"><SiCodechef size={"1.6vw"}/> {item.kesulitan}</p>
                            </div>
                        </Link>
                    </div>
                )
            })
        } else {
            return (
                <div className='my-5' style={{ height: "26vh" }}>
                    <h1 className="poppins text-center">Tidak ditemukan</h1>
                </div>
            )
        }
    }

    const printPaginate = () => {

        let btn = []

        for (let i = 0; i < Math.ceil(hasilCari.length / limitData); i ++) {
            btn.push(<Button outline color="primary" disabled={page == i + 1 ? true : false} onClick={() => setPage(i+1)}>{i+1}</Button>)
        }

        return btn
    }

    return (
        <div>
            <div className="container mb-4">
                <div className="imgSearch">
                    <div className="row">
                        <div className="col-8 offset-2 mt-5 ">
                        <FormGroup>
                        <InputGroup>
                            <button role={"button"} className="btn" style={{ backgroundColor: "transparent", border: "1px solid white" }} onClick={onBtSearch}><BiSearchAlt color='white' size={'2vw'}/> </button>
                        <Input type="select" className='poppins'  color="success" onChange={(text) => setCariResep({...cariResep,kategori: text.target.value})}>
                            <option value="">Pilih Kategori</option>
                            <option value="Dessert">Dessert</option>
                            <option value="Resep Ayam">Resep Ayam</option>
                            <option value="Resep Daging">Resep Daging</option>
                            <option value="Resep Sayuran">Resep Sayuran</option>
                            <option value="Seafood">Seafood</option>
                        </Input>
                        <Input placeholder="Cari resep" style={{ width: "30vw" }} onChange={(text) => setCariResep({...cariResep,resep: text.target.value})}/>
                        </InputGroup>
                        </FormGroup>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="d-flex flex-row">
                    <div className='mx-2'>
                        <h1 className="asap">Hasil untuk</h1>
                    </div>
                    <div>
                        <h1 className="asap" style={{ color: "orange" }}>{keyword}</h1>
                    </div>
                </div>
                <div className="row">
                    <div className='d-flex flex-row flex-wrap justify-content-around'>
                        {printResep()}
                    </div>
                    <div className='d-flex justify-content-center my-3'>
                        {printPaginate()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CariKontenPage
