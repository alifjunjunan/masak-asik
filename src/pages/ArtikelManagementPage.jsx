import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, FormGroup, Input, InputGroup } from 'reactstrap'
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

    const [limitData, setLimitData] = useState(6)
    const [page, setPage] = useState(1)
    const [cariArtikel, setCariArtikel] = useState({kategori: "", artikel: ""})
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
            return dataArtikel.slice(page > 1 ? (page - 1) * limitData : page - 1, page * limitData).map((item,index) => {
                return (
                    <div className="col-12 col-md-3 m-2">
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
        } else {
            return(
                <div style={{ height: "18vh", margin: "18vh 0" }}>
                    <h1 className="poppins text-center">Data tidak ditemukan</h1>
                </div>
            )
        }
    }

    const printPaginate = () => {

        let btn = []

        for (let i = 0; i < Math.ceil(dataArtikel.length / limitData); i ++) {
            btn.push(<Button outline color="primary" disabled={page == i + 1 ? true : false} onClick={() => setPage(i+1)}>{i+1}</Button>)
        }

        return btn
    }

    const onBtSearch = async() => {

        let data = {
            ...cariArtikel
        }

        await dispatch(getArtikelAction(data.kategori,data.artikel))

    }

    return (
        <div className='container-fluid'>
            <h1 className="text-center mb-3 poppins">Artikel Management</h1>
            <div className='row d-flex justify-content-center justify-content-sm-start'>
                <div className="col-12 flex-row d-flex justify-content-between col-md-8 rounded offset-md-2" style={{ backgroundColor: "#ecf0f1", height: "8vh", boxShadow: "1px 1px 4px gray" }}>
                    <div className='mt-2'>
                        <FormGroup>
                            <InputGroup>
                                <Button color='primary' onClick={onBtSearch}>Cari</Button>
                                <Input type='select' className='poppins' style={{ width: "15vw" }} onChange={(text) => setCariArtikel({...cariArtikel, kategori: text.target.value})}>
                                    <option value="">Pilih Kategori</option>
                                    <option value="Inspirasi Dapur">Inspirasi Dapur</option>
                                    <option value="Tips Masak">Tips Masak</option>
                                    <option value="Makanan & Gaya Hidup">Makanan & Gaya Hidup</option>
                                </Input>
                                <Input placeholder='cari artikel' style={{ width: "30vw" }} onChange={(text) => setCariArtikel({...cariArtikel, artikel: text.target.value})}/>
                            </InputGroup>
                        </FormGroup>
                    </div>
                    <div className="mt-2">
                        <Link to={"/artikel-management/add"}>
                        <Button color='primary' size='sm' className=' poppins'><FiPlusSquare size="1.5vw" className='mx-1'/>Artikel</Button>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="row mt-3 mx-3 d-flex flex-md-row justify-content-center">
                <div className="col-12 d-flex flex-row flex-wrap justify-content-around">
                    {printCard()}
                </div>
            </div>
            <div className="row my-3">
                <div className="col-8 offset-2 d-flex justify-content-center">
                    {printPaginate()}
                </div>
            </div>
        </div>
    )
}

export default ArtikelManagementPage