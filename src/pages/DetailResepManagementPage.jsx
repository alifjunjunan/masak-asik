import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_URL } from '../helper'
import { Button, FormGroup, Input, InputGroup, Label } from 'reactstrap'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateResepAction } from '../action'
import { toast } from 'react-toastify'
import {TiArrowBackOutline} from 'react-icons/ti'
import {BsPlusSquare} from 'react-icons/bs'
import {AiOutlineMinusSquare} from 'react-icons/ai'

const DetailResepManagementPage = () => {

    const [detail,setDetailResep] = useState({})
    const {judul,deskripsi,porsi,lama,kategori,kesulitan,photo,content,bahan,instruksi,id} = detail
    const [able,setAble] = useState(true)
    const [btn,setBtn] = useState("Edit")
    const [btnColor,setBtnColor] = useState("primary")

    const dispatch = useDispatch()

    useEffect(() => {
        getData()
    },[])

    const getData = async () => {

        try {
            
            let res = await axios.get(`${API_URL}/resep${window.location.search}`)
            setDetailResep(res.data[0])

        } catch (error) {
            console.log(error.response.data)
        }

    }

    const printBahan = () => {

        if(bahan) {
            return bahan.map((item,index) => {
                return (
                    <Input className='my-2' placeholder='2 siung bawang merah' value={item} disabled={able}
                    onChange={(event) => handleBahan(event,index)}/>
                )
            })
        } else {
            <></>
        }

    }

    const handleBahan = (event,idx) => {

        let temp = [...bahan]
        temp[idx] = event.target.value

        setDetailResep({...detail, bahan: temp})

    }

    const printLangkah = () => {

        if (instruksi) {
            return instruksi.map((item,index) => {
                return (
                    <div className="p-3 my-3" style={{ borderRadius: "20px", backgroundColor: "#ced6e0"  }}>
                    <FormGroup>
                        <Input className='my-2' placeholder='Rajang bawang merah' value={item.langkah} disabled={able}
                        onChange={(event) => handleLangkah(event,index)}/>
                        <Input className='my-2' placeholder='Photo' value={item.photo} disabled={able}
                        onChange={(event) => handleLangkahPhoto(event,index)}/>
                    </FormGroup>
                </div>
                )
            })
        } else {
            <></>
        }   
    }

    const handleLangkah = (event,idx) => {
        let temp = [...instruksi]
        temp[idx].langkah = event.target.value

        setDetailResep({...detail, instruksi: temp})
    }

    const handleLangkahPhoto = (event,idx) => {
        let temp = [...instruksi]
        temp[idx].photo = event.target.value

        setDetailResep({...detail, instruksi: temp})
    }

    const onBtEdit = () => {

        if (!able) {
            setBtn("Edit")
            setBtnColor("primary")
        } else {
            setBtn("Simpan")
            setBtnColor("success")
        }

        setAble(!able)

    }

    const onBtSimpan = async () => {

        let data = {
            ...detail
        }

        try {
            let res = await dispatch(updateResepAction(data,id))

            if (res.success) {
                getData()
                setAble(true)
                setBtn("Edit")
                setBtnColor("primary")
                toast.success('Data Berhasil Diupdate')
            }
        } catch (error) {
            console.log(error)
        }
        
    }

    const onBtAddBahan = () => {
        let temp = [...bahan]
        temp.push("")

        setDetailResep({...detail,bahan: temp})
    }

    const onBtDeleteBahan = (idx) => {
        let temp = [...bahan]
        temp.splice(idx,1)

        setDetailResep({...detail,bahan: temp})
    }

    const onBtAddLangkah = () => {
        let temp = [...instruksi]
        temp.push({no: null, langkah: "", photo: ""})

        setDetailResep({...detail, instruksi: temp})
    }

    const onBtDeleteLangkah = (idx) => {
        let temp = [...instruksi]
        temp.splice(idx,1)

        setDetailResep({...detail,instruksi: temp})
    }

    return (
        <div>
            <h1 className="text-center poppins my-3">Detail Resep</h1>
            <div className="container">
                <div className="row">
                    <div className="col-8 offset-2 mb-3" style={{  borderRadius: "20px", backgroundColor: "#d2dae2"  }}>
                        <div className="col-10 offset-1 p-3 my-3" style={{ borderRadius: "20px", backgroundColor: "#f5f6fa"  }}>
                        <FormGroup>
                                <Label>Judul Resep</Label>
                                <Input placeholder='Judul resep' value={judul} disabled={able}
                                onChange={(text) => setDetailResep({...detail,judul: text.target.value})}  />
                            </FormGroup>
                            <FormGroup>
                                <Label>Deskripsi Resep</Label>
                                <Input placeholder='Deskripsi resep' type='textarea' style={{ height: "20vh" }}
                                value={deskripsi} disabled={able}
                                onChange={(text) => setDetailResep({...detail, deskripsi: text.target.value})} />
                            </FormGroup>
                            <InputGroup className='d-flex justify-content-between'>
                                <FormGroup>
                                    <Label>Porsi Resep</Label>
                                    <Input placeholder='2 orang' value={porsi} disabled={able}
                                    onChange={(text) => setDetailResep({...detail, porsi: text.target.value})} />
                                </FormGroup>
                                <FormGroup>
                                    <Label>Lama Memasak</Label>
                                    <Input placeholder='1 jam 30 menit' value={lama} disabled={able}
                                     onChange={(text) => setDetailResep({...detail, lama: text.target.value})}/>
                                </FormGroup>
                            </InputGroup>
                            <FormGroup>
                                <Label>Kategori Resep</Label>
                                <Input placeholder='Dessert' value={kategori} disabled={able}
                                onChange={(text) => setDetailResep({...detail, kategori: text.target.value})}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Tingkat Kesulitan</Label>
                                <Input placeholder='Mudah' value={kesulitan} disabled={able}
                                 onChange={(text) => setDetailResep({...detail, kesulitan: text.target.value})}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Photo Banner</Label>
                                <Input placeholder='photo' value={photo} disabled={able}
                                onChange={(text) => setDetailResep({...detail, photo: text.target.value})}/>
                            </FormGroup>
                            <FormGroup>
                                <Label>Tipe Konten</Label>
                                <Input type='select' value={content} disabled={able}
                                 onChange={(text) => setDetailResep({...detail, content: text.target.value})}>
                                    <option value="Gratis">Gratis</option>
                                    <option value="Premium">Premium</option>
                                </Input>
                            </FormGroup>
                        </div>
                        <div className="col-10 offset-1 p-3 my-3" style={{ borderRadius: "20px", backgroundColor: "#f5f6fa"  }}>
                            <h3 className='poppsin'>Bahan-Bahan</h3>
                            <div className="p-3 my-3" style={{ borderRadius: "20px", backgroundColor: "#ced6e0"  }}>
                                <FormGroup>      
                                        {printBahan()}
                                </FormGroup>
                                <div className='d-flex justify-content-between'>
                                    <Button size="sm" color="danger" disabled={able} onClick={() => onBtDeleteBahan(bahan.length - 1)}><AiOutlineMinusSquare size="1.8vw"/></Button>
                                    <Button role={"button"} size='sm' color='primary' disabled={able} onClick={onBtAddBahan}><BsPlusSquare size={"1.5vw"}/></Button>
                                </div>
                            </div>
                        </div>
                        <div className="col-10 offset-1 p-3 my-3" style={{ borderRadius: "20px", backgroundColor: "#f5f6fa"  }}>
                            <h3 className='poppsin'>Langkah</h3> 
                                {printLangkah()}
                            <div className='d-flex justify-content-between m-3'>
                                <Button size="sm" color="danger" disabled={able} onClick={() => onBtDeleteLangkah(instruksi.length - 1)}><AiOutlineMinusSquare size="1.8vw"/></Button>
                                <Button role={"button"} size='sm' color='primary' disabled={able} onClick={onBtAddLangkah}><BsPlusSquare size={"1.5vw"}/></Button>
                            </div>
                        </div>
                        <div className='d-flex justify-content-between m-3'>
                            <Link to="/resep-management">
                                <Button color='warning poppins'>Kembali</Button>
                            </Link>
                            {
                                btn == "Edit" 
                                ?
                                <Button className='poppins' color={btnColor} onClick={onBtEdit}>{btn}</Button>
                                :
                                <Button ClassName='poppins' color={btnColor} onClick={onBtSimpan}>{btn}</Button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailResepManagementPage
