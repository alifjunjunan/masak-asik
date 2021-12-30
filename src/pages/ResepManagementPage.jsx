import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import {FiEdit} from "react-icons/fi";
import { BsInfoCircle } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { getResepAction } from '../action';
import axios from 'axios';
import { API_URL } from '../helper';

const ResepManagementPage = () => {

    const dispatch = useDispatch()

    const [listresep,setListResep] = useState([])


    useEffect(() => {
        getData()
    },[])

    const getData = async() => {
        
       let res = await axios.get(`${API_URL}/resep`)

       setListResep(res.data)

    }

    const printCardResep = () => {

        return listresep.map((item,index) => {
            return (
            <div className="col-12 col-md-5 m-2">
                <div class="card">
                    <img src={item.photo} alt="" className='card-img-top' style={{ width: "100%" }} />
                    <div class="card-body">
                        <div className="row my-2">
                            <div className="col-4 text-center poppins">
                                 Porsi {item.porsi}
                            </div>
                            <div className="col-4 text-center poppins">
                                 {item.kesulitan}
                            </div>
                            <div className="col-4 text-center poppins">
                                 {item.lama}
                            </div>
                        </div>
                        <h6 className="card-title poppins">
                            {item.judul}
                        </h6>
                        <div className="d-flex justify-content-end">
                            <Button  size='sm' outline color='info' className='mx-1'><FiEdit size="1.5vw"/></Button>
                            <Button  size='sm' outline color='danger' className='mx-1'><RiDeleteBin6Line size="1.5vw"/></Button>
                        </div>
                    </div>
                </div>
            </div>
            )
        })
    }

    return (
        <div>
            <div className='container'>
                <h1 className="text-center mb-3 poppins">Resep Management</h1>
                <div className="row d-flex justify-content-center justify-content-sm-start">
                    <div className="col-10  col-md-6 rounded offset-md-3" style={{ backgroundColor: "#ecf0f1", height: "6.5vh" }}>
                        <div className="d-flex justify-content-between">
                            <Link to="/resep-management/add">
                                <Button color='primary' size='sm' className='m-3 m-md-1'>Tambah</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-3 mx-3 d-flex flex-md-row justify-content-center">
                <div className="col-10 col-md-3" style={{ backgroundColor: "#c7ecee", height: "20vh", padding: 0,borderRadius: "15px",  }}>
                    <div style={{ backgroundColor: "#95afc0", borderTopLeftRadius: "15px", borderTopRightRadius: "15px" }}>
                        <h3 className='p-2 poppins text-center' style={{ color: "white" }}>Filter</h3>
                    </div>
                    <div className='px-3'>
                        <input type="text" className="form-control" placeholder="cari resep" />
                    </div>
                </div>
                <div className="col-12 col-md-9 d-flex flex-row flex-wrap justify-content-around">
                    {/* <div className="col-12 col-md-5 m-2">
                        <div class="card">
                            <div class="card-body">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. A,  Voluptatem reprehenderit iste rerum.
                            </div>
                        </div>
                    </div> */}
                    {printCardResep()}
                </div>
            </div>
        </div>
    )
}

export default ResepManagementPage
