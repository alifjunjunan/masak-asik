import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { Badge, Carousel, CarouselIndicators, FormGroup, Input, InputGroup, UncontrolledCarousel } from "reactstrap"
import { getResepAction,sortResepAction } from "../action/resepAction"
import { API_URL } from "../helper"
import {BiTimeFive} from 'react-icons/bi'
import {SiCodechef} from 'react-icons/si'
import { Link, Navigate } from "react-router-dom"
import {BiSearchAlt,BiCrown} from 'react-icons/bi'
import {BsBookmark} from 'react-icons/bs'

const HomePage = (props) => {
    const [next, setNext] = useState(false)
    const [prev, setPrev] = useState(false)
    const [dataResep, setDataResep] = useState([])
    const [dataArtikel, setDataArtikel] = useState([])
    const [cariResep,setCariResep] = useState({kategori: "",resep: ""})
    const [pindah, setPindah] = useState(false)

    const dispatch = useDispatch()

    useEffect(() => {
        getResep()
    },[])

    const {kategoriResep} = useSelector((state) => {
        return {
            kategoriResep: state.kategoriResepReducer.listKategoriResep
        }
    })
    const getResep = async () => {

        try {
            let res = await axios.get(`${API_URL}/resep?_sort=id&_order=desc&_limit=6`)
            let artikel = await axios.get(`${API_URL}/artikel?_sort=id&_order=desc&_limit=3`)

            setDataResep(res.data)
            setDataArtikel(artikel.data)
        } catch (error) {
            console.log(error)
        }
    }

    const printKategoriResep = () => {

        if(kategoriResep.length > 0) {
            
            return kategoriResep.map((item,index) => {
                return (
                    <div className="col-12 col-md-4" style={{ cursor: "pointer" }}>
                    <Link to={`/resep-masakan?q=${item.link}`} className="text-decoration-none" state={kategoriResep[index]}>
                        <img src={item.photo} width="100%" style={{ borderRadius: "20px", boxShadow: "3px 3px 10px grey" }} />
                        <h1 className="Poppins text-center " 
                        style={{ position: "relative", color: "white", top: "-50%", fontWeight: "600", textShadow: '2px 2px 4px #000000'}}>
                        {item.kategori}</h1>
                    </Link>
                </div>
                )
            })
        }
        
    }

    const printResep = () => {
        
        if(dataResep.length > 0) {

            return dataResep.map((item,index) => {
                let textJudul = item.judul
                let tampil =  textJudul.substr(0, 35)
                return(
                    <div className="col-10 col-md-3 mx-3 my-3" style={{ borderRadius: "20px", cursor:"pointer" ,color: "white" ,backgroundColor: "#079992",boxShadow: "1px 1px 10px grey" }}>
                        <Link to={`/resep?id=${item.id}`} className='text-decoration-none' style={{ color: "white" }}>
                            <div>
                                <img src={item.photo} width={"100%"} alt="" style={{ borderTopRightRadius: "20px", borderTopLeftRadius: "20px" }} />
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
        }
    }

    const printArtikel = () => {
        if(dataArtikel.length > 0) {

            return dataArtikel.map((item,index) => {
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
                                <p className="text-center mb-3 mx-4 poppins">{item.judul}</p>
                            </div>
                        </Link>
                    </div>
                )
            })
        }
    }

    const onBtSearch = async () => {

        let data = {
            ...cariResep
        }

        let res = await dispatch(getResepAction(data.kategori, data.resep))

        if (res.success){
            setPindah(true)
        }
        
    }

    
    return (
        <div>
            {
                pindah && <Navigate to={`resep/search`} state={cariResep} />
            }
            <div className="imgBanner">
                <p className="text-center asap pt-5" style={{ color: "white", fontSize: "85px", fontWeight: "bold",}}>Masak Asik</p>
                <p className="text-center asap" style={{ color: "white", fontSize: "20px", fontWeight: "bold", letterSpacing: "3px" }}>Temukan Resep Inspirasi dan Artikel Menarik </p>
                <div className="d-flex justify-content-center">
                    <FormGroup>
                       <InputGroup>
                         <button role={"button"} className="btn btn-primary" onClick={onBtSearch}><BiSearchAlt size={'2vw'}/> </button>
                    
                       <Input type="select" style={{ width: "12vw" }} color="success" className="poppins" onChange={(text) => setCariResep({...cariResep,kategori: text.target.value})}>
                           <option value="">Pilih Kategori</option>
                           <option value="Dessert">Dessert</option>
                           <option value="Resep Ayam">Resep Ayam</option>
                           <option value="Resep Daging">Resep Daging</option>
                           <option value="Resep Sayuran">Resep Sayuran</option>
                           <option value="Seafood">Seafood</option>
                       </Input>
                       <Input placeholder="Cari resep" style={{ width: "40vw" }} onChange={(text) => setCariResep({...cariResep,resep: text.target.value})}/>
                       </InputGroup>
                    </FormGroup>
                </div>
            </div>
            <div className="container">
                <div className="mt-5">
                    <h2 className="text-center poppins">Telusuri berdasarkan</h2>
                    <div className="row justify-content-center" >
                        {printKategoriResep()}
                    </div>
                </div>
                <div>
                    <h2 className="text-center poppins">Resep Terbaru</h2>
                    <div className="row">
                        <div className="col-12 d-flex flex-row flex-wrap justify-content-around">
                            {printResep()}
                        </div>
                    </div>
                </div>
                <div className="my-3">
                     <h2 className="text-center poppins">Artikel Menarik</h2>
                     <div className="row">
                        <div className="col-12 d-flex flex-row flex-wrap justify-content-around">
                            {printArtikel()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HomePage
