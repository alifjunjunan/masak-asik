import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'reactstrap'
import {FiPlusSquare, FiEdit} from 'react-icons/fi'
import {RiDeleteBin6Line} from 'react-icons/ri'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { deleteArtikelAction, deleteResepAction, getArtikelAction } from '../action'
import { confirmAlert } from 'react-confirm-alert'
import axios from 'axios'
import { API_URL } from '../helper'
import { toast } from 'react-toastify'

const ArtikelManagementPage = () => {

    const dispatch = useDispatch()
    const {dataArtikel} = useSelector((state) => {
        return {
            dataArtikel: state.artikelReducer.listArtikel
        }
    })

    useEffect(() => {
        dispatch(getArtikelAction())
    },[])

    const confirmDelete = (id) => {

        confirmAlert({
            title: '',
            message: 'Anda Yakin Ingin Menghapus ini?',
            buttons: [
                {
                    label: 'Hapus',
                    onClick: () => onBtDelete(id)
                },
                {
                    label: 'Cancel'
                }
            ]
        })
    }

    const onBtDelete = async (id) => {

        try {
            let res = await dispatch(deleteArtikelAction(id))

            if (res.success) {
                toast.success('Data Berhasil Dihapus!')
                dispatch(getArtikelAction())
            }
        } catch (error) {
            console.log(error)
        }
    }

    const printCard = () => {

        if (dataArtikel.length > 0) {
            return dataArtikel.map((item,index) => {
                return (
                    <div className="col-12 col-md-5 m-2">
                        <div className="card">
                            <img src={item.photo} alt="" className='card-img-top' style={{ width: "100%" }} />
                            <div className="card-body">
                                <p className='poppins'>{item.kategori}</p>
                                <h6 className="card-title poppins">
                                    {item.judul}
                                </h6>
                                <div className='d-flex justify-content-end'>
                                    <Link to={`/artikel-management/detail/edit?id=${item.id}`}>
                                        <Button  size='sm' outline color='info' className='mx-1'><FiEdit size="1.5vw"/></Button>
                                    </Link>
                                    <Button  size='sm' outline color='danger' className='mx-1' onClick={() => confirmDelete(item.id)}><RiDeleteBin6Line size="1.5vw"/></Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })
        }
    }

    return (
        <div className='container-fluid'>
            <h1 className="text-center mb-3 poppins">Artikel Management</h1>
            <div className='row d-flex justify-content-center justify-content-sm-start'>
                <div className="col-10  col-md-6 rounded offset-md-3" style={{ backgroundColor: "#ecf0f1", height: "6.5vh" }}>
                    <div className="d-flex justify-content-between">
                        <Link to={"/artikel-management/add"}>
                        <Button color='primary' size='sm' className='m-3 m-md-1 poppins'><FiPlusSquare size="1.5vw" className='mx-1'/>Artikel</Button>
                        </Link>
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
                    {printCard()}
                </div>
            </div>
        </div>
    )
}

export default ArtikelManagementPage