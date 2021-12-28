import axios from "axios"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { Carousel, CarouselIndicators, UncontrolledCarousel } from "reactstrap"
import { getResepAction } from "../action/resepAction"
import { API_URL } from "../helper"

const HomePage = (props) => {
    const [next, setNext] = useState(false)
    const [prev, setPrev] = useState(false)
    const [dataResep, setDataResep] = useState([])

    useEffect(() => {
        getResep()
    },[])

    const getResep = async () => {

        try {
            let res = await axios.get(`${API_URL}/resep`)
            setDataResep(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const carouselInner = () => {

        return dataResep.map((item,index) => {
            return (
                <div class="carousel-item">
                    <img src={item.photo} style={{ width: "60vw", height: "60vh", alignItems: "center" }} class="d-block w-100" alt="..."/>
                    <div class="carousel-caption d-md-block">
                        <h5>{item.judul}</h5>
                        <p>{item.kategori} | porsi : {item.porsi} | {item.lama} | {item.kesulitan}</p>
                    </div>
                </div>
            )
        })
    }

    return (
        <div className="container">
            <div id="carouselExampleDark" class="carousel  slide" data-bs-ride="carousel">
                <div class="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="3" aria-label="Slide 4"></button>
                </div>
                <div class="carousel-inner">
                    <div class="carousel-item active" data-bs-interval="10000">
                    <img src="https://www.masakapahariini.com/wp-content/uploads/2018/10/shutterstock_272736824-768x512.jpg" style={{ width: "60vw", height: "60vh", alignItems: "center" }} class="d-block w-100" alt="..."/>
                    <div class="carousel-caption d-md-block">
                        <h5></h5>
                        <p>Cara Membuat Daging BBQ Lezat untuk Kumpul Akhir Tahun</p>
                    </div>
                    </div>
                    <div class="carousel-item" data-bs-interval="2000">
                    <img src="https://www.masakapahariini.com/wp-content/uploads/2021/11/alat-panggang-gas-768x512.jpg" style={{ width: "60vw", height: "60vh" }} class="d-block w-100" alt="..."/>
                    <div class="carousel-caption d-md-block">
                        <h5></h5>
                        <p>3 Alat Panggang Wajib Lirik untuk Acara BBQ Akhir Tahun</p>
                    </div>
                    </div>
                    <div class="carousel-item">
                    <img src="https://www.masakapahariini.com/wp-content/uploads/2020/04/Sotong-Bakar-Bumbu-Bali-780x440.jpg" style={{ width: "60vw", height: "60vh" }} class="d-block w-100" alt="..."/>
                    <div class="carousel-caption d-md-block">
                        <h5></h5>
                        <p>Resep Sotong Bakar Bumbu Bali, Pilihan Barbecue Selama di Rumah Aja</p>
                    </div>
                    </div>
                    {carouselInner()}
                </div>
                <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
            </div>
            <div style={{ marginTop: "2vh", marginBottom: "2vh" }}>
                <h2 className="text-center">Telusuri berdasarkan</h2>
            </div>
            <div className="row justify-content-center" >
                <div className="col-12 col-md-4">
                    <img src="https://www.masakapahariini.com/wp-content/uploads/2021/04/shutterstock_536859760-400x240.jpg" alt="es leci yoghurt disajikan bersama buah-buahan" width="100%" />
                    <p style={{ position: "relative",textAlign: "center", top: "-50%"}}>ice cream</p>
                </div>
                <div className="col-12 col-md-4">
                    <img src="https://www.masakapahariini.com/wp-content/uploads/2021/04/shutterstock_536859760-400x240.jpg" alt="es leci yoghurt disajikan bersama buah-buahan" width="100%" />
                    <p style={{ position: "relative",textAlign: "center", top: "-50%"}}>ice cream</p>
                </div>
                <div className="col-12 col-md-4">
                    <img src="https://www.masakapahariini.com/wp-content/uploads/2021/04/shutterstock_536859760-400x240.jpg" alt="es leci yoghurt disajikan bersama buah-buahan" width="100%" />
                    <p style={{ position: "relative",textAlign: "center", top: "-50%"}}>ice cream</p>
                </div>
                <div className="col-12 col-md-4">
                    <img src="https://www.masakapahariini.com/wp-content/uploads/2021/04/shutterstock_536859760-400x240.jpg" alt="es leci yoghurt disajikan bersama buah-buahan" width="100%" />
                    <p style={{ position: "relative",textAlign: "center", top: "-50%"}}>ice cream</p>
                </div>
                <div className="col-12 col-md-4">
                    <img src="https://www.masakapahariini.com/wp-content/uploads/2021/04/shutterstock_536859760-400x240.jpg" alt="es leci yoghurt disajikan bersama buah-buahan" width="100%" />
                    <p style={{ position: "relative",textAlign: "center", top: "-50%"}}>ice cream</p>
                </div>
                
            </div>
        </div>
    )
}

export default HomePage
