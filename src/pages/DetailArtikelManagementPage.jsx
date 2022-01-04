import axios from 'axios'
import { set } from 'draft-js/lib/EditorState'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button, FormGroup, Input, Label } from 'reactstrap'
import { updateArtikelAction } from '../action'
import { API_URL } from '../helper'

const DetailArtikelManagementPage = () => {

    const [detail, setDetail] = useState({})
    const {judul,deskripsi,kategori,photo,id} = detail
    const [able,setAble] = useState(true)
    const [btn,setBtn] = useState("Edit")
    const [btnColor,setBtnColor] = useState("primary")

    const dispatch = useDispatch()

    useEffect(() => {
        getData()
    },[])


    const getData = async () => {

        let res = await axios.get(`${API_URL}/artikel${window.location.search}`)
        
        setDetail(res.data[0])
    }

    const onBtEdit = () => {
   
        setBtn("Simpan")
        setBtnColor("success")

        setAble(!able)
    }

    const onBtSimpan = async () => {
        let data = {
            ...detail
        }

        try {
            let res = await dispatch(updateArtikelAction(data,id))

            if (res.success) {
                getData()
                setBtn("Edit")
                setBtnColor("primary")
                setAble(true)
                toast.success('Data Berhasil Diupdate!')
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            <h1 className="text-center poppins my-3">Detail Artikel</h1>
            <div className="container">
                <div className="row">
                <div className="col-8 offset-2 mb-3" style={{  borderRadius: "20px", backgroundColor: "#d2dae2"  }}>
                        <div className="col-10 offset-1 p-3 my-3" style={{ borderRadius: "20px", backgroundColor: "#f5f6fa"  }}>
                            <FormGroup>
                                <Label>Judul Artikel</Label>
                                <Input placeholder='Judul Artikel' value={judul} disabled={able}
                                onChange={(text) => setDetail({...detail, judul: text.target.value})}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Deskripsi</Label>
                                <Input type='textarea' style={{ height: "80vh" }} value={deskripsi} disabled={able}
                                 onChange={(text) => setDetail({...detail, deskripsi: text.target.value})}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Kategori</Label>
                                <Input placeholder='Kategori' value={kategori} disabled={able}
                                onChange={(text) => setDetail({...detail, kategori: text.target.value})}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Photo Banner</Label>
                                <Input placeholder='Photo' value={photo} disabled={able}
                                onChange={(text) => setDetail({...detail, photo: text.target.value})}/>
                            </FormGroup>
                                <div className="d-flex justify-content-between">
                                    <Link to={"/artikel-management"}>
                                        <Button color='warning' className='poppins'>Kembali</Button>
                                    </Link>
                                    {
                                        btn == "Edit"
                                        ?
                                        <Button color={btnColor} className='poppins' onClick={onBtEdit}>{btn}</Button>
                                        :
                                        <Button color={btnColor} className='poppins' onClick={onBtSimpan}>{btn}</Button>
                                    }
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailArtikelManagementPage
