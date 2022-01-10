import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Button, FormGroup, InputGroup, Input } from 'reactstrap'
import {FiEdit,FiPlus,FiPlusSquare} from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from 'react-redux';
import { deleteResepAction, getResepAction } from '../action';
import { toast } from 'react-toastify';
import { confirmAlert } from 'react-confirm-alert';
import {MdOutlineFoodBank} from 'react-icons/md'
import {BiTimeFive} from 'react-icons/bi'
import {SiCodechef} from 'react-icons/si'

const ResepManagementPage = () => {

    const dispatch = useDispatch()

   
    const [limitData, setLimitData] = useState(6)
    const [page, setPage] = useState(1)
    const [cariResep,setCariResep] = useState({kategori: "",resep: ""})

    const {dataResep} = useSelector((state) => {
        return {
            dataResep: state.resepReducer.listResep
        }
    })


    useEffect(() => {
        dispatch(getResepAction())
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

    const onBtDelete = async(id) => {

        try {
            let res = await dispatch(deleteResepAction(id))

            if (res.success) {
                toast.success(`Data Berhasil Dihapus!`, {
                    position: "top-right",
                    autoClose: 5000
                    });
                dispatch(getResepAction())
            }
        } catch (error) {
            console.log(error)
        }
    }

    const printCardResep = () => {

        if (dataResep.length > 0 ){
            return dataResep.slice(page > 1 ? (page - 1) * limitData : page - 1, page * limitData).map((item,index) => {
                let textJudul = item.judul
                let tampil =  textJudul.substr(0, 35)
                return (
                <div className="col-12 col-md-3 m-2">
                    <div class="card">
                        <img src={item.photo} alt="" className='card-img-top' style={{ width: "100%" }} />
                        <div class="card-body">
                            <div className="row my-2" style={{ fontSize: "15px"}}>
                                <div className="col-6 text-center poppins">
                                    <MdOutlineFoodBank size={"2vw"}/> {item.porsi}
                                </div>
                                <div className="col-6 text-center poppins">
                                    <BiTimeFive size={"1.5vw"}/> {item.lama}
                                </div>
                            </div>
                            <h6 className="card-title poppins">
                                {tampil}. . .
                            </h6>
                            <div className="d-flex justify-content-end">
                                <Link to={`/resep-management/detail/edit?id=${item.id}`}>
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

        for (let i = 0; i < Math.ceil(dataResep.length / limitData); i ++) {
            btn.push(<Button outline color="primary" disabled={page == i + 1 ? true : false} onClick={() => setPage(i+1)}>{i+1}</Button>)
        }

        return btn
    }

    const onBtSearch = async () => {

        let data = {
            ...cariResep
        }

        await dispatch(getResepAction(data.kategori, data.resep))

    }

    return (
        <div>
            <div className='container'>
                <h1 className="text-center mb-3 poppins">Resep Management</h1>
                <div className="row d-flex justify-content-center justify-content-sm-start">
                    <div className="col-12 col-md-8 offset-md-2 rounded d-flex flex-row justify-content-between " style={{ backgroundColor: "#ecf0f1", height: "8vh", boxShadow: "1px 1px 4px gray" }}>
                        <div className='mt-2'>
                            <FormGroup>
                                <InputGroup>
                                    <Button color='primary' onClick={onBtSearch}>Cari</Button>
                                    <Input type='select' style={{ width: "25vh" }} className='poppins' onChange={(text) => setCariResep({...cariResep, kategori: text.target.value})}>
                                    <option value="">Pilih Kategori</option>
                                    <option value="Dessert">Dessert</option>
                                    <option value="Resep Ayam">Resep Ayam</option>
                                    <option value="Resep Daging">Resep Daging</option>
                                    <option value="Resep Sayuran">Resep Sayuran</option>
                                    <option value="Seafood">Seafood</option>
                                    </Input>
                                    <Input placeholder='cari resep' style={{ width: "45vh" }} onChange={(text) => setCariResep({...cariResep, resep: text.target.value})}/>
                                </InputGroup>
                            </FormGroup>
                        </div>
                        <div className="mt-2">
                            <Link to="/resep-management/add">
                                <Button color='primary' size='sm' className='poppins'><FiPlusSquare size="1.5vw" className='mx-1'/>Resep</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mt-3 mx-3 d-flex flex-md-row justify-content-center">
                <div className="col-12 d-flex flex-row flex-wrap justify-content-around">
                    {printCardResep()}
                </div>
                <div className="row my-3">
                    <div className="col-8 offset-2 d-flex justify-content-center">
                        {printPaginate()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResepManagementPage
